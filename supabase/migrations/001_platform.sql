create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  role text not null default 'student' check (role in ('student', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  storage_key text not null,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, storage_key)
);

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title jsonb not null,
  excerpt jsonb not null,
  content jsonb not null,
  category jsonb not null,
  author jsonb not null,
  published_at date not null default current_date,
  read_time text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.progress enable row level security;
alter table public.articles enable row level security;

create policy "profiles_read_own" on public.profiles for select using (auth.uid() = id);
create policy "progress_own_all" on public.progress for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "articles_public_read" on public.articles for select using (true);
create policy "articles_admin_insert" on public.articles for insert with check (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "articles_admin_update" on public.articles for update using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "articles_admin_delete" on public.articles for delete using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', ''));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();
