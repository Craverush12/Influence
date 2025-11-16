# 🚀 Local Development Setup Guide

This is a **Next.js + Supabase Marketplace Platform** for connecting creators and professionals. Follow these steps to run it locally.

## Prerequisites

Make sure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **pnpm** (Package manager) - Install with: `npm install -g pnpm`
- **Supabase Account** - [Sign up at supabase.com](https://supabase.com)
- **Git** (optional, for version control)

## Step 1: Install Dependencies

```bash
cd C:\Users\Arjun\Downloads\code
pnpm install
```

This installs all required packages listed in `package.json`.

## Step 2: Set Up Supabase Project

1. **Create a new Supabase project** at [supabase.com](https://supabase.com)
2. **Navigate to Project Settings** → **API** to find:
   - `NEXT_PUBLIC_SUPABASE_URL` (your project URL)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (your anonymous key)
   - `SUPABASE_SERVICE_ROLE_KEY` (server-side key)

3. **In Project Settings** → **Auth** → **JWT Secret**:
   - Copy the `SUPABASE_JWT_SECRET`

## Step 3: Initialize Database Schema

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Create a new SQL query and copy the contents from: `scripts/01_init_schema.sql`
3. Run the SQL to create all tables and indexes
4. Do the same for: `scripts/02_init_storage.sql` (for file storage)

## Step 4: Configure Environment Variables

The `.env.local` file has been created in your project root. Update it with your actual values:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
SUPABASE_JWT_SECRET=your_jwt_secret_here
SUPABASE_ANON_KEY=your_anon_key_here

# PostgreSQL Configuration (if using direct DB connection)
POSTGRES_URL=postgresql://user:password@host:5432/database
POSTGRES_URL_NON_POOLING=postgresql://user:password@host:5432/database
POSTGRES_PRISMA_URL=postgresql://user:password@host:5432/database
POSTGRES_HOST=your_postgres_host
POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DATABASE=your_postgres_database
```

**To get PostgreSQL credentials:**
- In Supabase Dashboard → **Project Settings** → **Database**
- Look for **Connection String** section
- Extract the credentials and format them into the URLs above

## Step 5: Run the Development Server

```bash
pnpm dev
```

The app will start at **http://localhost:3000**

### Available Commands

```bash
# Development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages (login, signup)
│   ├── creators/          # Creator marketplace
│   ├── professionals/     # Professional profiles
│   ├── dashboard/         # User dashboard
│   ├── messages/          # Messaging system
│   └── explore/           # Explore page
├── components/            # Reusable React components
│   ├── ui/               # UI components (Button, Card, Form, etc.)
│   └── ...               # Custom components
├── lib/                   # Utility functions
│   ├── supabase/         # Supabase client configuration
│   ├── auth.ts           # Authentication logic
│   └── utils.ts          # Helper functions
├── scripts/              # Database initialization SQL files
└── .env.local           # Environment variables (CREATE THIS)
```

## Database Schema

The project includes the following main tables:

- **users** - User accounts and profiles
- **user_socials** - Social media links
- **user_roles** - User roles (creator, professional, admin)
- **creator_jobs** - Job postings by creators
- **professional_profiles** - Professional information
- **portfolio_items** - Portfolio pieces
- **messages** - Direct messaging
- **reviews** - User reviews and ratings

See `scripts/01_init_schema.sql` for complete schema details.

## Troubleshooting

### Port 3000 Already in Use
```bash
# Use a different port
pnpm dev -- -p 3001
```

### Supabase Connection Issues
1. Verify your `.env.local` variables are correct
2. Check if your Supabase project is active
3. Ensure the database URL is valid

### Missing Dependencies
```bash
pnpm install
```

### Clear Next.js Cache
```bash
rm -r .next
pnpm dev
```

## Features

✅ User authentication (signup/login)
✅ Creator job marketplace
✅ Professional profiles with portfolios
✅ Direct messaging system
✅ Reviews and ratings
✅ Profile management with social links
✅ Real-time updates via Supabase
✅ Responsive UI with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **Database**: PostgreSQL via Supabase
- **UI Library**: Radix UI components
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts
- **Styling**: Tailwind CSS + shadcn/ui

## Need Help?

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

---

**Happy coding! 🎉**

