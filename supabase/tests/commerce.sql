-- Run after the migrations. Every fixture is rolled back; no customer data is used.
begin;
insert into public.products(slug,name,kind,stripe_price_id,active) values
  ('__fp_test_product','Synthetic transaction test','download','price_test_only',true),
  ('__fp_test_inactive','Synthetic inactive test','download','price_test_inactive',false);
insert into public.profiles(clerk_user_id) values ('__fp_test_a'),('__fp_test_b');
do $$
declare snapshot jsonb; result jsonb;
begin
  snapshot := jsonb_build_object('session_id','cs_fp_test_1','user_id','__fp_test_a',
    'product_slug','__fp_test_product','quantity',1,'status','pending','amount_total',100,
    'currency','usd','payment_intent_id','pi_fp_test_1');
  perform public.process_stripe_event('evt_fp_test_1','checkout.session.completed',snapshot);
  if exists(select 1 from public.entitlements where clerk_user_id='__fp_test_a') then
    raise exception 'Unpaid checkout granted access'; end if;
  snapshot := snapshot || '{"status":"paid"}';
  perform public.process_stripe_event('evt_fp_test_2','checkout.session.async_payment_succeeded',snapshot);
  result := public.process_stripe_event('evt_fp_test_2','checkout.session.async_payment_succeeded',snapshot);
  if result->>'duplicate' <> 'true' then raise exception 'Dedupe failed'; end if;
  if (select count(*) from public.entitlements where clerk_user_id='__fp_test_a' and revoked_at is null) <> 1 then
    raise exception 'Paid checkout missing entitlement'; end if;
  perform public.process_stripe_event('evt_fp_test_3','checkout.session.expired',snapshot || '{"status":"expired"}');
  if (select status from public.orders where stripe_checkout_session_id='cs_fp_test_1') <> 'paid' then
    raise exception 'Stale event downgraded paid order'; end if;
  -- A failed transaction must not poison the event receipt or block retries.
  begin
    perform public.process_stripe_event('evt_fp_test_retry','checkout.session.completed',snapshot || '{"session_id":"cs_fp_bad","product_slug":"__missing"}');
    raise exception 'Expected foreign key failure';
  exception when foreign_key_violation then null; end;
  if exists(select 1 from public.stripe_webhook_events where id='evt_fp_test_retry') then
    raise exception 'Failed event retained its receipt'; end if;
  perform public.process_stripe_event('evt_fp_test_retry','checkout.session.completed',snapshot || '{"session_id":"cs_fp_test_2","payment_intent_id":"pi_fp_test_2"}');
  perform public.process_stripe_event('evt_fp_refund_1','charge.refunded',null,'pi_fp_test_1');
  if not exists(select 1 from public.entitlements where clerk_user_id='__fp_test_a' and revoked_at is null) then
    raise exception 'Refund revoked a different paid purchase'; end if;
  perform public.process_stripe_event('evt_fp_refund_2','charge.refunded',null,'pi_fp_test_2');
  if exists(select 1 from public.entitlements where clerk_user_id='__fp_test_a' and revoked_at is null) then
    raise exception 'Full refund left access active'; end if;
  perform public.process_stripe_event('evt_fp_late_paid','checkout.session.completed',snapshot);
  if exists(select 1 from public.entitlements where clerk_user_id='__fp_test_a' and revoked_at is null) then
    raise exception 'Late event resurrected refunded purchase'; end if;
  if has_function_privilege('anon','public.process_stripe_event(text,text,jsonb,text)','execute')
    or has_function_privilege('authenticated','public.process_stripe_event(text,text,jsonb,text)','execute') then
    raise exception 'Public role can fulfill orders'; end if;
  if has_table_privilege('authenticated','public.orders','insert')
    or has_table_privilege('anon','public.profiles','select') then
    raise exception 'Unexpected public table permissions'; end if;
end;
$$;
set local role authenticated;
select set_config('request.jwt.claims','{"sub":"__fp_test_b","role":"authenticated"}',true);
do $$ begin
  if exists(select 1 from public.orders) or exists(select 1 from public.entitlements) then
    raise exception 'RLS leaked another user purchase'; end if;
  if (select count(*) from public.profiles) <> 1 then raise exception 'Profile isolation failed'; end if;
  if exists(select 1 from public.products where slug='__fp_test_inactive') then raise exception 'Inactive product exposed'; end if;
end $$;
reset role;
rollback;
select 'PASS: atomic fulfillment, retries, refunds, and RLS; fixtures rolled back' as result;
