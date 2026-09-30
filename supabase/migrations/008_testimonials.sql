create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(trim(name)) between 1 and 100),
  role text not null default '' check (char_length(role) <= 150),
  role_en text not null default '' check (char_length(role_en) <= 150),
  message text not null check (char_length(trim(message)) between 10 and 2000),
  message_en text not null default '' check (char_length(message_en) <= 2000),
  photo_path text not null check (photo_path ~ '^[0-9a-f-]{36}/[0-9a-f-]{36}\.(jpg|png|webp)$'),
  certificate_path text check (certificate_path ~ '^[0-9a-f-]{36}/[0-9a-f-]{36}\.(jpg|png|webp)$'),
  published boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.testimonials enable row level security;
revoke all on public.testimonials from anon, authenticated;
grant select on public.testimonials to anon, authenticated;
grant insert, update, delete on public.testimonials to authenticated;

create policy "Published testimonials" on public.testimonials for select to anon, authenticated using (published);
create policy "Admins manage testimonials" on public.testimonials for all to authenticated
  using (exists (select 1 from public.profiles where id = (select auth.uid()) and role = 'admin'))
  with check (exists (select 1 from public.profiles where id = (select auth.uid()) and role = 'admin'));

-- Public media, including draft images if their URL is known. Only admins can upload/delete.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('testimonials', 'testimonials', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = true, file_size_limit = 5242880,
  allowed_mime_types = array['image/jpeg','image/png','image/webp'];

create policy "Admins manage testimonial media" on storage.objects for all to authenticated
  using (bucket_id = 'testimonials' and exists (select 1 from public.profiles where id = (select auth.uid()) and role = 'admin'))
  with check (bucket_id = 'testimonials' and exists (select 1 from public.profiles where id = (select auth.uid()) and role = 'admin'));

create index if not exists testimonials_published_created_idx on public.testimonials(published, created_at desc);
