alter table public.profiles drop constraint if exists profiles_role_check;
alter table public.profiles add constraint profiles_role_check
  check (role in ('student', 'coach', 'admin'));

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  assigned_coach_id uuid references auth.users(id) on delete set null,
  track text not null default 'professional' check (track in ('developer', 'business', 'professional')),
  plan text not null default 'test',
  status text not null default 'active' check (status in ('active', 'paused', 'expired')),
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  created_at timestamptz not null default now(),
  unique (user_id)
);

create table if not exists public.premium_lessons (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title jsonb not null,
  summary jsonb not null,
  content jsonb not null,
  video_url text,
  track text not null default 'professional',
  level text not null default 'beginner',
  position integer not null default 0,
  published boolean not null default false,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.premium_exercises (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid references public.premium_lessons(id) on delete cascade,
  type text not null check (type in ('written_answer', 'spoken_answer', 'shadowing')),
  prompt jsonb not null,
  reference_answer text,
  accepted_answers jsonb not null default '[]'::jsonb,
  audio_url text,
  transcript text,
  position integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.exercise_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  exercise_id uuid references public.premium_exercises(id) on delete set null,
  exercise_type text not null,
  answer_text text,
  transcript text,
  score numeric(5,2),
  feedback jsonb not null default '{}'::jsonb,
  provider text not null default 'local',
  created_at timestamptz not null default now()
);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null unique references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.conversation_participants (
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  added_by uuid references auth.users(id) on delete set null,
  joined_at timestamptz not null default now(),
  primary key (conversation_id, user_id)
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 2000),
  lesson_id uuid references public.premium_lessons(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null,
  title text not null,
  body text not null,
  href text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create or replace function public.is_staff(check_user uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from public.profiles where id = check_user and role in ('coach', 'admin'));
$$;

create or replace function public.is_conversation_member(check_conversation uuid, check_user uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists(
    select 1 from public.conversation_participants
    where conversation_id = check_conversation and user_id = check_user
  );
$$;

alter table public.enrollments enable row level security;
alter table public.premium_lessons enable row level security;
alter table public.premium_exercises enable row level security;
alter table public.exercise_attempts enable row level security;
alter table public.conversations enable row level security;
alter table public.conversation_participants enable row level security;
alter table public.messages enable row level security;
alter table public.notifications enable row level security;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('premium-audio', 'premium-audio', true, 10485760, array['audio/mpeg', 'audio/wav', 'audio/webm', 'audio/ogg'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create policy "premium_audio_public_read" on storage.objects for select to public using (bucket_id = 'premium-audio');
create policy "premium_audio_staff_insert" on storage.objects for insert to authenticated with check (bucket_id = 'premium-audio' and public.is_staff((select auth.uid())));
create policy "premium_audio_staff_delete" on storage.objects for delete to authenticated using (bucket_id = 'premium-audio' and public.is_staff((select auth.uid())));

create policy "enrollment_read_own_or_staff" on public.enrollments for select to authenticated
  using ((select auth.uid()) = user_id or public.is_staff((select auth.uid())));
create policy "enrollment_admin_write" on public.enrollments for all to authenticated
  using (public.is_staff((select auth.uid()))) with check (public.is_staff((select auth.uid())));

create policy "premium_lessons_active_students_read" on public.premium_lessons for select to authenticated
  using (published and exists(select 1 from public.enrollments e where e.user_id = (select auth.uid()) and e.status = 'active' and (e.ends_at is null or e.ends_at > now())) or public.is_staff((select auth.uid())));
create policy "premium_lessons_staff_write" on public.premium_lessons for all to authenticated
  using (public.is_staff((select auth.uid()))) with check (public.is_staff((select auth.uid())));
create policy "premium_exercises_active_students_read" on public.premium_exercises for select to authenticated
  using (published and exists(select 1 from public.enrollments e where e.user_id = (select auth.uid()) and e.status = 'active' and (e.ends_at is null or e.ends_at > now())) or public.is_staff((select auth.uid())));
create policy "premium_exercises_staff_write" on public.premium_exercises for all to authenticated
  using (public.is_staff((select auth.uid()))) with check (public.is_staff((select auth.uid())));

create policy "attempts_read_own_or_staff" on public.exercise_attempts for select to authenticated
  using ((select auth.uid()) = user_id or public.is_staff((select auth.uid())));
create policy "attempts_insert_own" on public.exercise_attempts for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "conversations_members_read" on public.conversations for select to authenticated
  using (student_id = (select auth.uid()) or public.is_conversation_member(id, (select auth.uid())) or public.is_staff((select auth.uid())));
create policy "conversations_student_create" on public.conversations for insert to authenticated
  with check (student_id = (select auth.uid()));
create policy "participants_members_read" on public.conversation_participants for select to authenticated
  using (public.is_conversation_member(conversation_id, (select auth.uid())) or public.is_staff((select auth.uid())));
create policy "participants_staff_write" on public.conversation_participants for all to authenticated
  using (public.is_staff((select auth.uid()))) with check (public.is_staff((select auth.uid())));
create policy "messages_members_read" on public.messages for select to authenticated
  using (public.is_conversation_member(conversation_id, (select auth.uid())));
create policy "messages_members_create" on public.messages for insert to authenticated
  with check (sender_id = (select auth.uid()) and public.is_conversation_member(conversation_id, (select auth.uid())));
create policy "notifications_read_own" on public.notifications for select to authenticated
  using (user_id = (select auth.uid()));
create policy "notifications_update_own" on public.notifications for update to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

create index if not exists exercise_attempts_user_created_idx on public.exercise_attempts(user_id, created_at desc);
create index if not exists messages_conversation_created_idx on public.messages(conversation_id, created_at);
create index if not exists notifications_user_read_idx on public.notifications(user_id, read_at, created_at desc);

create or replace function public.initialize_conversation()
returns trigger language plpgsql security definer set search_path = public as $$
declare coach_id uuid;
begin
  insert into public.conversation_participants(conversation_id, user_id, added_by)
  values (new.id, new.student_id, new.student_id) on conflict do nothing;
  select assigned_coach_id into coach_id from public.enrollments where user_id = new.student_id;
  if coach_id is not null then
    insert into public.conversation_participants(conversation_id, user_id, added_by)
    values (new.id, coach_id, new.student_id) on conflict do nothing;
  end if;
  return new;
end;
$$;

drop trigger if exists on_conversation_created on public.conversations;
create trigger on_conversation_created after insert on public.conversations
for each row execute procedure public.initialize_conversation();

create or replace function public.notify_new_message()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  update public.conversations set updated_at = now() where id = new.conversation_id;
  insert into public.notifications(user_id, type, title, body, href)
  select cp.user_id, 'new_message', 'Nouveau message', left(new.body, 160), '/chat'
  from public.conversation_participants cp
  where cp.conversation_id = new.conversation_id and cp.user_id <> new.sender_id;
  return new;
end;
$$;

drop trigger if exists on_message_created on public.messages;
create trigger on_message_created after insert on public.messages
for each row execute procedure public.notify_new_message();

create or replace function public.limit_conversation_participants()
returns trigger language plpgsql as $$
begin
  if (select count(*) from public.conversation_participants where conversation_id = new.conversation_id) >= 3 then
    raise exception 'A conversation cannot have more than three participants';
  end if;
  return new;
end;
$$;

drop trigger if exists before_conversation_participant_insert on public.conversation_participants;
create trigger before_conversation_participant_insert before insert on public.conversation_participants
for each row execute procedure public.limit_conversation_participants();

do $$ begin
  if not exists(select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'messages') then
    alter publication supabase_realtime add table public.messages;
  end if;
  if not exists(select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'notifications') then
    alter publication supabase_realtime add table public.notifications;
  end if;
end $$;
