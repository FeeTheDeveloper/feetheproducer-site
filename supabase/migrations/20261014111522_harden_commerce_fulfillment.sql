-- Keep the existing five-table model. Receipts and fulfillment are atomic.
revoke all on public.profiles, public.products, public.orders,
  public.entitlements, public.stripe_webhook_events from anon, authenticated;
grant select on public.products to anon, authenticated;
grant select on public.profiles, public.orders, public.entitlements to authenticated;
grant all on public.profiles, public.products, public.orders,
  public.entitlements, public.stripe_webhook_events to service_role;

-- Recompute access from all paid purchases, so refunding one purchase cannot
-- revoke another purchase of the same product. Call while holding its user/product lock.
create or replace function public.refresh_purchase_entitlement(p_user text, p_product text)
returns void language plpgsql security invoker set search_path = '' as $$
declare paid_order uuid;
begin
  select id into paid_order from public.orders
    where clerk_user_id = p_user and product_slug = p_product and status = 'paid'
    order by created_at desc, id desc limit 1;
  if paid_order is not null then
    insert into public.entitlements (clerk_user_id, product_slug, order_id, revoked_at)
      values (p_user, p_product, paid_order, null)
    on conflict (clerk_user_id, product_slug) do update set
      order_id = excluded.order_id, revoked_at = null;
  else
    update public.entitlements set revoked_at = coalesce(revoked_at, now())
      where clerk_user_id = p_user and product_slug = p_product;
  end if;
end;
$$;
revoke all on function public.refresh_purchase_entitlement(text, text) from public, anon, authenticated;
grant execute on function public.refresh_purchase_entitlement(text, text) to service_role;

create or replace function public.process_stripe_event(
  p_event_id text, p_event_type text, p_order jsonb default null,
  p_refund_payment_intent text default null
) returns jsonb language plpgsql security invoker set search_path = '' as $$
declare
  receipt text;
  saved_order public.orders%rowtype;
  refund_order public.orders%rowtype;
  next_status text;
begin
  if p_event_id is null or p_event_id = '' or p_event_type is null or p_event_type not in (
    'checkout.session.completed', 'checkout.session.async_payment_succeeded',
    'checkout.session.async_payment_failed', 'checkout.session.expired', 'charge.refunded'
  ) then raise exception 'Invalid Stripe event'; end if;
  insert into public.stripe_webhook_events (id, type)
    values (p_event_id, p_event_type) on conflict (id) do nothing returning id into receipt;
  if receipt is null then return jsonb_build_object('duplicate', true); end if;

  if p_event_type = 'charge.refunded' then
    if p_refund_payment_intent is null then raise exception 'Missing payment intent'; end if;
    for refund_order in select * from public.orders
      where stripe_payment_intent_id = p_refund_payment_intent order by clerk_user_id, product_slug
    loop
      perform pg_advisory_xact_lock(hashtextextended(jsonb_build_array(refund_order.clerk_user_id, refund_order.product_slug)::text, 0));
      update public.orders set status = 'refunded' where id = refund_order.id;
      perform public.refresh_purchase_entitlement(refund_order.clerk_user_id, refund_order.product_slug);
    end loop;
  else
    next_status := p_order ->> 'status';
    if p_order is null or coalesce(p_order ->> 'session_id', '') = ''
      or coalesce(p_order ->> 'user_id', '') = '' or coalesce(p_order ->> 'product_slug', '') = ''
      or next_status is null or next_status not in ('pending', 'paid', 'refunded', 'expired', 'failed')
      or (p_order ->> 'quantity') is null then raise exception 'Invalid order snapshot'; end if;
    perform pg_advisory_xact_lock(hashtextextended(jsonb_build_array(p_order ->> 'user_id', p_order ->> 'product_slug')::text, 0));
    insert into public.orders (clerk_user_id, product_slug, quantity, status,
      amount_total, currency, stripe_checkout_session_id, stripe_payment_intent_id)
    values (p_order ->> 'user_id', p_order ->> 'product_slug', (p_order ->> 'quantity')::integer,
      next_status, (p_order ->> 'amount_total')::integer, p_order ->> 'currency',
      p_order ->> 'session_id', p_order ->> 'payment_intent_id')
    on conflict (stripe_checkout_session_id) do update set
      status = case when public.orders.status = 'refunded' or excluded.status = 'refunded' then 'refunded'
        when public.orders.status = 'paid' then 'paid' else excluded.status end,
      amount_total = excluded.amount_total, currency = excluded.currency,
      stripe_payment_intent_id = coalesce(excluded.stripe_payment_intent_id, public.orders.stripe_payment_intent_id)
    where public.orders.clerk_user_id = excluded.clerk_user_id and public.orders.product_slug = excluded.product_slug
      and public.orders.quantity = excluded.quantity
      and (public.orders.stripe_payment_intent_id is null or excluded.stripe_payment_intent_id is null
        or public.orders.stripe_payment_intent_id = excluded.stripe_payment_intent_id)
    returning * into saved_order;
    if saved_order.id is null then raise exception 'Order identity mismatch'; end if;
    perform public.refresh_purchase_entitlement(saved_order.clerk_user_id, saved_order.product_slug);
  end if;
  return jsonb_build_object('duplicate', false);
end;
$$;
revoke all on function public.process_stripe_event(text, text, jsonb, text) from public, anon, authenticated;
grant execute on function public.process_stripe_event(text, text, jsonb, text) to service_role;
