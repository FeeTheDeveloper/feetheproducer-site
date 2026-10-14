-- Apply account events monotonically and retain deletion tombstones.
alter table public.profiles add column if not exists clerk_event_timestamp bigint not null default 0;
create or replace function public.process_clerk_profile_event(p_type text, p_timestamp bigint, p_profile jsonb)
returns void language plpgsql security invoker set search_path = '' as $$
declare is_deleted boolean := p_type = 'user.deleted';
begin
  if p_type not in ('user.created','user.updated','user.deleted') or p_type is null
    or p_timestamp is null or p_timestamp < 1 or coalesce(p_profile->>'id','') = '' then
    raise exception 'Invalid Clerk profile event';
  end if;
  insert into public.profiles(clerk_user_id,email,first_name,last_name,image_url,deleted_at,clerk_event_timestamp)
  values (p_profile->>'id',
    case when not is_deleted then p_profile->>'email' end,
    case when not is_deleted then p_profile->>'first_name' end,
    case when not is_deleted then p_profile->>'last_name' end,
    case when not is_deleted then p_profile->>'image_url' end,
    case when is_deleted then now() end, p_timestamp)
  on conflict (clerk_user_id) do update set
    email=excluded.email, first_name=excluded.first_name, last_name=excluded.last_name,
    image_url=excluded.image_url, deleted_at=coalesce(public.profiles.deleted_at,excluded.deleted_at),
    clerk_event_timestamp=greatest(public.profiles.clerk_event_timestamp,excluded.clerk_event_timestamp)
  where (public.profiles.deleted_at is null and excluded.deleted_at is not null)
    or (public.profiles.deleted_at is null and excluded.clerk_event_timestamp > public.profiles.clerk_event_timestamp);
end;
$$;
revoke all on function public.process_clerk_profile_event(text,bigint,jsonb) from public,anon,authenticated;
grant execute on function public.process_clerk_profile_event(text,bigint,jsonb) to service_role;
