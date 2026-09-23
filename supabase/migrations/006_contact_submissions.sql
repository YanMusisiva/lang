create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  email text not null,
  phone text,
  level text,
  message text not null check (char_length(message) between 10 and 1000),
  status text not null default 'new' check (status in ('new', 'read', 'processed', 'archived')),
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

create policy "contact_submissions_public_create" on public.contact_submissions
for insert to anon, authenticated with check (status = 'new');

create policy "contact_submissions_admin_read" on public.contact_submissions
for select to authenticated using (exists (
  select 1 from public.profiles where profiles.id = (select auth.uid()) and profiles.role = 'admin'
));

create policy "contact_submissions_admin_update" on public.contact_submissions
for update to authenticated using (exists (
  select 1 from public.profiles where profiles.id = (select auth.uid()) and profiles.role = 'admin'
));

create index if not exists contact_submissions_status_created_idx on public.contact_submissions(status, created_at desc);
create index if not exists programme_registrations_status_created_idx on public.programme_registrations(status, created_at desc);

alter table public.messages add column if not exists context text;
