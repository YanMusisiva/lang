-- Allow coaches and administrators to inspect and answer student conversations,
-- even when no coach was assigned when the conversation was created.
drop policy if exists "messages_members_read" on public.messages;
create policy "messages_members_read" on public.messages for select to authenticated
  using (
    public.is_conversation_member(conversation_id, (select auth.uid()))
    or public.is_staff((select auth.uid()))
  );

drop policy if exists "messages_members_create" on public.messages;
create policy "messages_members_create" on public.messages for insert to authenticated
  with check (
    sender_id = (select auth.uid())
    and (
      public.is_conversation_member(conversation_id, (select auth.uid()))
      or public.is_staff((select auth.uid()))
    )
  );

create or replace function public.notify_new_message()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  update public.conversations
  set updated_at = now()
  where id = new.conversation_id;

  insert into public.notifications(user_id, type, title, body, href)
  select recipient_id,
         'new_message',
         'Nouveau message',
         left(new.body, 160),
         '/chat?conversation=' || new.conversation_id::text
  from (
    select cp.user_id as recipient_id
    from public.conversation_participants cp
    where cp.conversation_id = new.conversation_id
      and cp.user_id <> new.sender_id

    union

    select p.id as recipient_id
    from public.profiles p
    join public.conversations c on c.id = new.conversation_id
    where p.role in ('coach', 'admin')
      and c.student_id = new.sender_id
      and p.id <> new.sender_id
  ) recipients;

  return new;
end;
$$;
