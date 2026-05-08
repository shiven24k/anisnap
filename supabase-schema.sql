create table if not exists public.profiles (
	uid uuid primary key references auth.users(id) on delete cascade,
	email text not null,
	username text not null unique,
	fullname text not null,
	bio text not null default '',
	profile_pic_url text not null default '',
	followers text[] not null default '{}',
	following text[] not null default '{}',
	posts text[] not null default '{}',
	created_at bigint not null
);

create table if not exists public.posts (
	id uuid primary key default gen_random_uuid(),
	caption text not null default '',
	image_url text not null default '',
	likes text[] not null default '{}',
	comments jsonb not null default '[]'::jsonb,
	created_at bigint not null,
	created_by uuid not null references public.profiles(uid) on delete cascade
);

create index if not exists profiles_username_idx on public.profiles (username);
create index if not exists posts_created_by_idx on public.posts (created_by);
create index if not exists posts_created_at_idx on public.posts (created_at desc);

alter table public.profiles enable row level security;
alter table public.posts enable row level security;

create policy "Profiles are readable by everyone"
	on public.profiles for select
	using (true);

create policy "Users can insert their own profile"
	on public.profiles for insert
	with check (auth.uid() = uid);

create policy "Users can update their own profile"
	on public.profiles for update
	using (auth.uid() = uid)
	with check (auth.uid() = uid);

create policy "Authenticated users can update social profile arrays"
	on public.profiles for update
	using (auth.role() = 'authenticated')
	with check (auth.role() = 'authenticated');

create policy "Posts are readable by everyone"
	on public.posts for select
	using (true);

create policy "Users can insert their own posts"
	on public.posts for insert
	with check (auth.uid() = created_by);

create policy "Post owners can update posts"
	on public.posts for update
	using (auth.uid() = created_by)
	with check (auth.uid() = created_by);

create policy "Authenticated users can update post interactions"
	on public.posts for update
	using (auth.role() = 'authenticated')
	with check (auth.role() = 'authenticated');

create policy "Post owners can delete posts"
	on public.posts for delete
	using (auth.uid() = created_by);

-- Create public storage buckets named: post-image and profile-pictures.
-- Add storage policies in Supabase so authenticated users can upload/update/delete
-- their own files, and public users can read files.
