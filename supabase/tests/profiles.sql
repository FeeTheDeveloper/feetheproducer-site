begin;
select public.process_clerk_profile_event('user.updated',200,'{"id":"__fp_profile_test","first_name":"Latest"}');
select public.process_clerk_profile_event('user.created',100,'{"id":"__fp_profile_test","first_name":"Stale"}');
do $$ begin
  if (select first_name from public.profiles where clerk_user_id='__fp_profile_test') <> 'Latest' then
    raise exception 'Stale profile event overwrote new data'; end if;
end $$;
select public.process_clerk_profile_event('user.deleted',300,'{"id":"__fp_profile_test"}');
select public.process_clerk_profile_event('user.updated',400,'{"id":"__fp_profile_test","first_name":"Resurrection"}');
select public.process_clerk_profile_event('user.deleted',500,'{"id":"__fp_deleted_first"}');
select public.process_clerk_profile_event('user.created',100,'{"id":"__fp_deleted_first","first_name":"Late"}');
do $$ begin
  if (select count(*) from public.profiles where clerk_user_id in ('__fp_profile_test','__fp_deleted_first')
    and deleted_at is not null and first_name is null and email is null) <> 2 then
    raise exception 'Deletion tombstone failed'; end if;
  if has_function_privilege('authenticated','public.process_clerk_profile_event(text,bigint,jsonb)','execute') then
    raise exception 'User can modify profile mirror'; end if;
end $$;
rollback;
select 'PASS: stale profile events ignored; deletion tombstones retained; fixtures rolled back' as result;
