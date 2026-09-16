-- Anonymous, completed placement tests only. No name, email, user ID or IP stored.
create table if not exists public.level_test_results (
  attempt_id uuid primary key,
  test_version text not null check (test_version = 'placement-v1'),
  score smallint not null check (score between 0 and 100),
  level smallint generated always as (
    case when score <= 25 then 1 when score <= 50 then 2 when score <= 75 then 3 else 4 end
  ) stored,
  completed_at timestamptz not null default now()
);
alter table public.level_test_results enable row level security;
revoke all on public.level_test_results from anon, authenticated;
grant select on public.level_test_results to authenticated;
create policy "Admins read test results" on public.level_test_results
  for select to authenticated using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Grade on the database, not from a visitor-supplied score.
-- Keep this version's rules aligned with data/level-test.ts (zero-based answers).
create or replace function public.submit_level_test(
  p_attempt_id uuid, p_version text, p_answers integer[]
) returns void
language plpgsql security definer set search_path = '' as $$
declare
  correct integer[] := array[1,0,2,0,2,1,2,3,3,0,2,3,2,3,0,1,0,2,3,0];
  partial integer[] := array[2,2,1,2,1,2,1,1,0,1,1,2,0,2,1,0,1,3,2,2];
  total integer := 0;
  i integer;
begin
  if p_attempt_id is null or p_version is distinct from 'placement-v1'
    or p_answers is null or array_ndims(p_answers) is distinct from 1
    or array_length(p_answers, 1) is distinct from 20 or array_lower(p_answers, 1) is distinct from 1 then
    raise exception 'Invalid test submission' using errcode = '22023';
  end if;
  for i in 1..20 loop
    if p_answers[i] is null or p_answers[i] < 0 or p_answers[i] > (case when i <= 5 then 2 else 3 end) then
      raise exception 'Invalid answer' using errcode = '22023';
    end if;
    total := total + case
      when p_answers[i] = correct[i] then 5
      when p_answers[i] = partial[i] or (i = 19 and p_answers[i] = 0) then 1
      else 0 end;
  end loop;
  insert into public.level_test_results(attempt_id, test_version, score)
    values (p_attempt_id, p_version, total)
    on conflict (attempt_id) do nothing;
end;
$$;
revoke all on function public.submit_level_test(uuid, text, integer[]) from public;
grant execute on function public.submit_level_test(uuid, text, integer[]) to anon, authenticated;

-- Aggregate the entire table (no client pagination / 1,000-row limit).
create or replace function public.level_test_stats()
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare result jsonb;
begin
  if not exists (select 1 from public.profiles where id = auth.uid() and role = 'admin') then
    raise exception 'Admin access required' using errcode = '42501';
  end if;
  select jsonb_build_object(
    'total', count(*), 'average', round(avg(score), 1),
    'last30', count(*) filter (where completed_at >= now() - interval '30 days'),
    'level1', count(*) filter (where level = 1),
    'level2', count(*) filter (where level = 2),
    'level3', count(*) filter (where level = 3),
    'level4', count(*) filter (where level = 4)
  ) into result from public.level_test_results;
  return result;
end;
$$;
revoke all on function public.level_test_stats() from public, anon;
grant execute on function public.level_test_stats() to authenticated;
