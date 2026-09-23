alter table public.programme_registrations
add column if not exists selected_offer text
check (selected_offer is null or selected_offer in ('group', 'coaching'));
