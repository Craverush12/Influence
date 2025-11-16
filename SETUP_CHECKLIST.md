# ✅ Local Development Setup Checklist

## Prerequisites Check
- [ ] **Node.js installed** (v18+) - Check with: `node --version`
- [ ] **pnpm installed** - Check with: `pnpm --version`
- [ ] **Supabase account created** at https://supabase.com
- [ ] **Supabase project created**

## Environment Variables Configuration
- [x] **✅ `.env.local` file created** in project root
- [x] **✅ NEXT_PUBLIC_SUPABASE_URL** - Added ✓
- [x] **✅ NEXT_PUBLIC_SUPABASE_ANON_KEY** - Added ✓
- [x] **✅ SUPABASE_SERVICE_ROLE_KEY** - Added ✓
- [x] **✅ SUPABASE_JWT_SECRET** - Added ✓
- [x] **✅ PostgreSQL credentials** - Added ✓

## Database Setup
- [ ] **Install pnpm dependencies** - Run: `pnpm install`
- [ ] **Initialize database schema** - Run SQL from `scripts/01_init_schema.sql` in Supabase
- [ ] **Initialize storage** - Run SQL from `scripts/02_init_storage.sql` in Supabase

## Run Development Server
- [ ] **Start dev server** - Run: `pnpm dev`
- [ ] **Open browser** - Go to http://localhost:3000
- [ ] **Test authentication** - Try signup/login

## Common Issues & Solutions

### Issue: Dependencies not found
**Solution:**
```bash
pnpm install
```

### Issue: Port 3000 already in use
**Solution:**
```bash
pnpm dev -- -p 3001
```

### Issue: Database connection error
**Solution:**
1. Verify `.env.local` has correct Supabase credentials
2. Confirm database schema was initialized (check SQL scripts)
3. Restart the dev server

### Issue: Supabase connection fails
**Solution:**
1. Check `.env.local` file exists in project root
2. Verify NEXT_PUBLIC_SUPABASE_URL is correct format (https://...)
3. Verify NEXT_PUBLIC_SUPABASE_ANON_KEY is not empty
4. Make sure Supabase project is active

## Next Steps After Setup

1. **Create test accounts** - Sign up with test email addresses
2. **Explore the app**:
   - `/auth/login` - Login page
   - `/auth/signup` - Signup page
   - `/dashboard` - User dashboard
   - `/explore` - Explore marketplace
   - `/creators` - Creator listings
   - `/professionals` - Professional profiles

3. **Start development**:
   - Edit components in `components/`
   - Add new pages in `app/`
   - Modify database in Supabase console
   - Changes auto-reload thanks to Next.js hot reload

## Useful Development Commands

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production build locally
pnpm start

# Run linter
pnpm lint

# List all available commands
cat package.json
```

## File Structure Reference

```
📦 project-root
├── 📂 app/                     # Next.js app (routes & pages)
│   ├── auth/                   # Authentication pages
│   ├── creators/               # Creator marketplace
│   ├── professionals/          # Professional profiles
│   ├── dashboard/              # User dashboard
│   ├── messages/               # Messaging system
│   └── layout.tsx              # Root layout
├── 📂 components/              # React components
│   ├── ui/                     # Reusable UI components
│   └── ...                     # Feature components
├── 📂 lib/                     # Utilities & helpers
│   ├── supabase/              # Supabase clients
│   ├── auth.ts                # Auth logic
│   └── utils.ts               # Helpers
├── 📂 scripts/                # Database initialization
│   ├── 01_init_schema.sql     # Tables & indexes
│   └── 02_init_storage.sql    # Storage buckets
├── 📂 public/                 # Static files
├── .env.local                 # Environment variables (CREATED ✅)
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
├── tailwind.config.mjs        # Tailwind config
└── next.config.mjs            # Next.js config
```

## Database Tables

The app uses these PostgreSQL tables:

- **users** - User accounts
- **user_socials** - Social media profiles
- **user_roles** - User roles (creator/professional/admin)
- **creator_jobs** - Job postings
- **professional_profiles** - Professional info
- **portfolio_items** - Portfolio pieces
- **messages** - Direct messages
- **reviews** - Ratings & reviews

## Support & Resources

- 📖 [Next.js Documentation](https://nextjs.org/docs)
- 📚 [Supabase Documentation](https://supabase.com/docs)
- 🎨 [Tailwind CSS](https://tailwindcss.com/docs)
- 🧩 [Radix UI](https://www.radix-ui.com/)
- 📋 [React Hook Form](https://react-hook-form.com/)

---

**You're all set! 🎉 Now run `pnpm dev` and start building!**

