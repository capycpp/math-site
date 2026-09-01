-- Create problems table
create table if not exists problems (
  id uuid primary key default uuid_generate_v4(),
  title text,
  question text,
  difficulty text,
  answer text,
  created_at timestamptz default now()
);

-- Create formulas table
create table if not exists formulas (
  id uuid primary key default uuid_generate_v4(),
  title text,
  latex text,
  explanation text,
  category text,
  created_at timestamptz default now()
);

-- NOTE: enable the uuid-ossp or pgcrypto extension in Supabase SQL if needed
-- For Supabase: `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";` or use gen_random_uuid()
