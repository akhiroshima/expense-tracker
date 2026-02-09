# Cursor Workshop — Starter Repo

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/akhiroshima/cursor-workshop&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY&envDescription=Supabase%20project%20credentials&envLink=https://supabase.com/dashboard/project/_/settings/api)

Everything you need to start building with Cursor. Clone, install, set two env vars, run.

## Prerequisites

- **Node.js 18+** — check with `node -v`
- **npm** (comes with Node) — or pnpm/yarn if you prefer
- **A free Supabase account** — sign up at [supabase.com](https://supabase.com)
- **A free Vercel account** — sign up at [vercel.com](https://vercel.com)

## Quick Start

```bash
# 1. Clone the repo
git clone <repo-url>
cd cursor-workshop

# 2. Install dependencies
npm install

# 3. Set up environment variables (see below)
cp .env.example .env.local

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you should see a card with an input and a button. If you see it, you're good to go!

## Environment Variables

You need **two** values from Supabase. Here's how to get them:

### Step 1 — Open your `.env.local` file

It's in the **project root** (same folder as `package.json`). If you ran `cp .env.example .env.local` above, the file already exists with empty values.

### Step 2 — Get your Supabase keys

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project (or click **New Project** to create one — the free tier works fine)
3. In the sidebar, click **Project Settings** (the gear icon)
4. Click **API** in the left menu
5. You'll see two values you need:

| Variable                          | Where to find it                  |
| --------------------------------- | --------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`        | **Project URL** at the top        |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`   | **anon public** key under Project API keys |

### Step 3 — Paste them into `.env.local`

Your `.env.local` should look like this (with your actual values):

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Save the file. If `npm run dev` is already running, restart it.

## Tech Stack

| Technology    | What it does                             |
| ------------- | ---------------------------------------- |
| Next.js 16    | React framework (App Router, TypeScript) |
| Supabase      | Backend-as-a-service (database, auth)    |
| Tailwind CSS  | Utility-first CSS framework              |
| shadcn/ui     | Pre-built UI components (see below)      |

### Pre-installed shadcn/ui Components

These components are ready to import from `@/components/ui/`:

- `button` · `input` · `label` · `textarea`
- `card` · `badge` · `tabs`
- `dialog` · `alert-dialog` · `popover` · `dropdown-menu`
- `table` · `select` · `switch`
- `calendar` + `popover` (use together as a date picker)
- `sonner` (toast notifications)

## Project Structure

```
src/
  app/
    layout.tsx        ← Root layout (includes toast provider)
    page.tsx          ← Demo page
    globals.css       ← Tailwind + shadcn theme
  components/
    ui/               ← All shadcn/ui components
  lib/
    supabase/
      client.ts       ← Supabase browser client
    utils.ts          ← Utility functions (cn helper)
```

## Deploy to Vercel

You can deploy this repo to Vercel in a few minutes. Two options:

### Option A — One-click deploy (recommended)

1. Click the **Deploy with Vercel** button at the top of this README.
2. Sign in with GitHub and select the repo.
3. When prompted, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click **Deploy**.

### Option B — Manual deploy from Vercel dashboard

1. Go to [vercel.com/new](https://vercel.com/new).
2. Import the `cursor-workshop` GitHub repo.
3. Add the two environment variables under **Project Settings → Environment Variables**.
4. Deploy.

Once deployed, you'll get a URL like `https://your-project.vercel.app`. If you update env vars later, redeploy to apply changes.

## Scripts

| Command         | What it does            |
| --------------- | ----------------------- |
| `npm run dev`   | Start dev server        |
| `npm run build` | Production build        |
| `npm run start` | Start production server |
| `npm run lint`  | Run ESLint              |
