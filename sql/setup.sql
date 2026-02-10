-- Expense Tracker — Supabase Setup
-- Paste this entire script into the Supabase SQL Editor and click "Run".

-- 1. Categories table
create table if not exists categories (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  color      text not null default '#6b7280',
  icon       text not null default 'tag',
  created_at timestamptz not null default now()
);

-- 2. Expenses table
create table if not exists expenses (
  id          uuid primary key default gen_random_uuid(),
  amount      numeric not null,
  description text not null default '',
  category_id uuid references categories(id) on delete set null,
  date        date not null default current_date,
  created_at  timestamptz not null default now()
);

-- 3. Indexes for common queries
create index if not exists idx_expenses_date on expenses(date desc);
create index if not exists idx_expenses_category on expenses(category_id);

-- 4. Seed default categories
insert into categories (name, color, icon) values
  ('Food',          '#ef4444', 'utensils'),
  ('Transport',     '#3b82f6', 'car'),
  ('Shopping',      '#8b5cf6', 'shopping-bag'),
  ('Bills',         '#f59e0b', 'receipt'),
  ('Entertainment', '#ec4899', 'music'),
  ('Health',        '#10b981', 'heart-pulse'),
  ('Other',         '#6b7280', 'ellipsis');

-- 5. Enable Row Level Security (open access — no auth for workshop)
alter table categories enable row level security;
alter table expenses enable row level security;

create policy "Allow all access to categories" on categories for all using (true) with check (true);
create policy "Allow all access to expenses"   on expenses   for all using (true) with check (true);
