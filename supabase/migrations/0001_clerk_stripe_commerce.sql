-- Clerk / Stripe / Supabase integration schema.
--
-- Identity lives in Clerk, money lives in Stripe, and this schema holds only
-- the join between them. Row level security is keyed to the Clerk subject
-- claim, which Supabase reads from the session token via the Clerk third-party
-- auth integration.
--
-- Not applied by this repository. Run it with the Supabase CLI
-- (`supabase db push`) or the dashboard SQL editor against the project named in
-- NEXT_PUBLIC_SUPABASE_URL.

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.profiles (
  clerk_user_id text primary key,
  email         text,
  first_name    text,
  last_name     text,
  image_url     text,
  deleted_at    timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table if not exists public.products (
  slug            text primary key,
  name            text not null,
  kind            text not null check (kind in ('license', 'download', 'membership')),
  mode            text not null default 'payment' check (mode in ('payment', 'subscription')),
  stripe_price_id text not null,
  active          boolean not null default true,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create table if not exists public.orders (
  id                         uuid primary key default gen_random_uuid(),
  clerk_user_id              text not null,
  product_slug               text not null references public.products (slug),
  quantity                   integer not null default 1 check (quantity between 1 and 99),
  status                     text not null default 'pending'
                               check (status in ('pending', 'paid', 'refunded', 'expired', 'failed')),
  amount_total               integer,
  currency                   text,
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id   text,
  created_at                 timestamptz not null default now(),
  updated_at                 timestamptz not null default now()
);

create table if not exists public.entitlements (
  id            uuid primary key default gen_random_uuid(),
  clerk_user_id text not null,
  product_slug  text not null references public.products (slug),
  order_id      uuid references public.orders (id) on delete set null,
  granted_at    timestamptz not null default now(),
  revoked_at    timestamptz,
  unique (clerk_user_id, product_slug)
);

-- Idempotency ledger for the Stripe webhook.
create table if not exists public.stripe_webhook_events (
  id          text primary key,
  type        text not null,
  received_at timestamptz not null default now()
);

create index if not exists orders_clerk_user_id_idx on public.orders (clerk_user_id);
create index if not exists orders_payment_intent_idx on public.orders (stripe_payment_intent_id);
create index if not exists entitlements_clerk_user_id_idx on public.entitlements (clerk_user_id);

-- ---------------------------------------------------------------------------
-- Row level security
--
-- Visitors read their own rows and the active catalog. There are no write
-- policies: every insert and update comes from a webhook or checkout handler
-- using the service role, which bypasses RLS.
-- ---------------------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.entitlements enable row level security;
alter table public.stripe_webhook_events enable row level security;

drop policy if exists profiles_select_self on public.profiles;
create policy profiles_select_self on public.profiles
  for select to authenticated
  using (clerk_user_id = auth.jwt() ->> 'sub');

drop policy if exists products_select_active on public.products;
create policy products_select_active on public.products
  for select to anon, authenticated
  using (active);

drop policy if exists orders_select_self on public.orders;
create policy orders_select_self on public.orders
  for select to authenticated
  using (clerk_user_id = auth.jwt() ->> 'sub');

drop policy if exists entitlements_select_self on public.entitlements;
create policy entitlements_select_self on public.entitlements
  for select to authenticated
  using (clerk_user_id = auth.jwt() ->> 'sub');

-- stripe_webhook_events stays service-role only: no policies are defined.

-- ---------------------------------------------------------------------------
-- Timestamps
-- ---------------------------------------------------------------------------

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at before update on public.profiles
  for each row execute function public.touch_updated_at();

drop trigger if exists products_touch_updated_at on public.products;
create trigger products_touch_updated_at before update on public.products
  for each row execute function public.touch_updated_at();

drop trigger if exists orders_touch_updated_at on public.orders;
create trigger orders_touch_updated_at before update on public.orders
  for each row execute function public.touch_updated_at();
