create table if not exists public.programme_registrations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  email text not null,
  phone text not null,
  level text check (level is null or level in ('beginner', 'intermediate', 'advanced', 'test')),
  programme text not null check (programme in ('general', 'professional', 'entrepreneur', 'developer')),
  motivation text not null check (char_length(motivation) between 10 and 600),
  status text not null default 'new' check (status in ('new', 'read', 'processed', 'archived')),
  created_at timestamptz not null default now()
);

alter table public.programme_registrations enable row level security;

create policy "programme_registrations_public_create"
on public.programme_registrations for insert to anon, authenticated
with check (status = 'new');

create policy "programme_registrations_admin_read"
on public.programme_registrations for select to authenticated
using (exists (
  select 1 from public.profiles
  where profiles.id = (select auth.uid()) and profiles.role = 'admin'
));

create policy "programme_registrations_admin_update"
on public.programme_registrations for update to authenticated
using (exists (
  select 1 from public.profiles
  where profiles.id = (select auth.uid()) and profiles.role = 'admin'
));
