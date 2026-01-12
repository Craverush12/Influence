# 🚀 QUICK START GUIDE
## Creator Hub World-Class Design System

**Get up and running in 5 minutes!**

---

## 📋 TABLE OF CONTENTS

1. [Installation](#installation)
2. [Basic Setup](#basic-setup)
3. [Core Components](#core-components)
4. [Navigation Setup](#navigation-setup)
5. [Common Patterns](#common-patterns)
6. [Troubleshooting](#troubleshooting)

---

## 🔧 INSTALLATION

### Prerequisites
The design system is already installed! It uses:
- **Tailwind CSS 4** - Already configured
- **Radix UI** - Already installed
- **CVA** (Class Variance Authority) - Already installed
- **Lucide Icons** - Already installed

### Verify Installation

Check that `globals.css` has the design tokens:

```bash
# Should see 500+ lines with design tokens
cat app/globals.css | wc -l
```

---

## 🎨 BASIC SETUP

### 1. Wrap Your App with Layout

**For authenticated pages:**

```tsx
// app/dashboard/page.tsx
import { AppLayout } from '@/components/layouts/app-layout'

export default function DashboardPage() {
  return (
    <AppLayout 
      user={{ 
        name: 'Sarah Chen',
        avatar: '/avatar.jpg',
        notifications: 3 
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
        {/* Your content */}
      </div>
    </AppLayout>
  )
}
```

**For public pages:**

```tsx
// app/page.tsx
import { MinimalLayout } from '@/components/layouts/app-layout'

export default function HomePage() {
  return (
    <MinimalLayout>
      {/* Your landing page */}
    </MinimalLayout>
  )
}
```

### 2. Add Toast Provider

```tsx
// app/layout.tsx
import { Toaster } from '@/components/ui/sonner'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster /> {/* Add this */}
      </body>
    </html>
  )
}
```

---

## 🧩 CORE COMPONENTS

### Buttons

```tsx
import { Button } from '@/components/ui/button'

// Primary CTA (gradient)
<Button variant="gradient" size="lg">
  Get Started
</Button>

// Secondary action
<Button variant="outline">
  Learn More
</Button>

// Ghost button
<Button variant="ghost">
  Cancel
</Button>

// Icon button
<Button variant="default" size="icon">
  <Plus className="w-5 h-5" />
</Button>
```

### Cards

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

// Interactive card (hover lift + glow)
<Card variant="interactive">
  <CardHeader>
    <CardTitle>Premium Feature</CardTitle>
    <CardDescription>Unlock unlimited access</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Content here...</p>
  </CardContent>
</Card>

// Glass card
<Card variant="glass">
  <CardContent>
    Glassmorphic design
  </CardContent>
</Card>
```

### Badges

```tsx
import { Badge } from '@/components/ui/badge'

<Badge variant="aurora">Featured</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Failed</Badge>
```

### Inputs

```tsx
import { Input } from '@/components/ui/input'

<Input 
  variant="premium" 
  placeholder="Enter your email"
  type="email"
/>
```

---

## 🧭 NAVIGATION SETUP

### Enable All Navigation Features

```tsx
// app/dashboard/page.tsx
import { AppLayout } from '@/components/layouts/app-layout'

export default function Page() {
  return (
    <AppLayout
      user={{ name: 'Sarah', notifications: 3 }}
      showSidebar={true}           // Desktop sidebar
      showTopBar={true}             // Top bar with search
      showBottomNav={true}          // Mobile bottom nav
      showBreadcrumbs={true}        // Breadcrumb navigation
    >
      <YourContent />
    </AppLayout>
  )
}
```

### Command Palette (⌘K)

Already enabled! Press `⌘K` (Mac) or `Ctrl+K` (Windows) anywhere to open.

---

## 🎯 COMMON PATTERNS

### 1. Success Toast

```tsx
'use client'

import { toast } from '@/components/ui/premium-toast'

function MyComponent() {
  const handleSave = () => {
    // ... save logic
    toast.success('Saved successfully!')
  }
}
```

### 2. Error Toast with Retry

```tsx
toast.error('Failed to upload', {
  description: 'Check your connection and try again.',
  action: {
    label: 'Retry',
    onClick: () => handleRetry(),
  },
})
```

### 3. Confirmation Modal

```tsx
'use client'

import { useState } from 'react'
import { ConfirmationModal } from '@/components/ui/premium-modal'

function DeleteButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        Delete
      </Button>

      <ConfirmationModal
        open={open}
        onOpenChange={setOpen}
        title="Delete project?"
        description="This action cannot be undone."
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={async () => {
          await deleteProject()
          toast.success('Project deleted')
        }}
      />
    </>
  )
}
```

### 4. Form Modal

```tsx
'use client'

import { useState } from 'react'
import { FormModal } from '@/components/ui/premium-modal'
import { Input } from '@/components/ui/input'

function CreateButton() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')

  return (
    <>
      <Button onClick={() => setOpen(true)}>Create Project</Button>

      <FormModal
        open={open}
        onOpenChange={setOpen}
        title="New Project"
        description="Enter project details"
        submitLabel="Create"
        onSubmit={async () => {
          await createProject(name)
          toast.success('Project created!')
          setOpen(false)
        }}
      >
        <div className="space-y-4">
          <label className="text-sm font-medium">Project Name</label>
          <Input
            variant="premium"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="My Awesome Project"
          />
        </div>
      </FormModal>
    </>
  )
}
```

### 5. Empty State

```tsx
import { PremiumEmptyState } from '@/components/ui/premium-empty-state'
import { Inbox } from 'lucide-react'

function EmptyList() {
  const items = [] // Your data

  if (items.length === 0) {
    return (
      <PremiumEmptyState
        icon={Inbox}
        title="No messages yet"
        description="When you receive messages, they'll appear here."
        action={{
          label: 'Start Conversation',
          onClick: () => router.push('/messages/new'),
          variant: 'gradient',
        }}
      />
    )
  }

  return <div>{/* Render items */}</div>
}
```

### 6. Loading State

```tsx
// Simple skeleton
<div className="skeleton-shimmer h-12 w-full rounded-lg" />

// Gradient skeleton
<div className="skeleton-gradient h-24 w-full rounded-xl" />

// Pulse skeleton
<div className="skeleton h-32 w-full rounded-2xl" />
```

### 7. Hero Section with Gradient

```tsx
<section className="py-24 relative overflow-hidden">
  {/* Ambient background glow */}
  <div className="gradient-mesh-ambient absolute inset-0 opacity-30" />
  
  <div className="relative max-w-3xl mx-auto px-6 text-center">
    <h1 className="text-6xl font-bold mb-6">
      Build <span className="text-gradient-aurora">Amazing</span> Things
    </h1>
    <p className="text-xl text-muted-foreground mb-10">
      The platform for modern creators
    </p>
    <Button variant="gradient" size="xl">
      Get Started Free
    </Button>
  </div>
</section>
```

### 8. Feature Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {features.map((feature) => (
    <Card key={feature.id} variant="hoverLift">
      <CardContent className="pt-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-aurora-1 flex items-center justify-center mb-4">
          <feature.icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
        <p className="text-muted-foreground">{feature.description}</p>
      </CardContent>
    </Card>
  ))}
</div>
```

### 9. Stats Section

```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
  <Card variant="elevated" className="text-center">
    <CardContent className="pt-6">
      <div className="text-4xl font-bold text-gradient-aurora mb-2">
        50K+
      </div>
      <div className="text-sm text-muted-foreground uppercase tracking-wider">
        Active Users
      </div>
    </CardContent>
  </Card>
  {/* More stats... */}
</div>
```

---

## 🎨 UTILITY CLASSES

### Gradients

```tsx
// Background gradients
<div className="gradient-hero-aurora p-12">...</div>
<div className="gradient-aurora-1 p-8">...</div>
<div className="gradient-mesh-ambient p-12">...</div>

// Text gradients
<h1 className="text-gradient-aurora">Premium Title</h1>
<h2 className="text-gradient-emerald-cyan">Accent</h2>
```

### Glass Effects

```tsx
// Premium glass
<div className="glass-premium p-8 rounded-2xl">...</div>

// Aurora glass
<div className="glass-aurora p-8 rounded-2xl">...</div>

// Card variants (easier)
<Card variant="glass">...</Card>
<Card variant="glassAurora">...</Card>
```

### Animations

```tsx
// Fade in on mount
<div className="animate-fade-in-up">...</div>

// Scale in
<Badge className="animate-scale-in">New!</Badge>

// Scroll reveal (auto-triggers on scroll)
<div className="scroll-reveal">
  Appears when scrolled into view
</div>

// Staggered animations
<div className="scroll-reveal stagger-1">First</div>
<div className="scroll-reveal stagger-2">Second</div>
<div className="scroll-reveal stagger-3">Third</div>
```

---

## 🐛 TROUBLESHOOTING

### Issue: Gradients not showing

**Solution:** Check that `globals.css` is imported in your layout:

```tsx
// app/layout.tsx
import './globals.css'  // Must be imported!
```

### Issue: Fonts look different

**Solution:** Check font imports in `layout.tsx`:

```tsx
import { Manrope, Inter, JetBrains_Mono } from 'next/font/google'
```

### Issue: Command Palette (⌘K) not working

**Solution:** Make sure `CommandPalette` is included in layout:

```tsx
// Use AppLayout, it includes CommandPalette
<AppLayout>...</AppLayout>

// Or add manually:
import { CommandPalette } from '@/components/navigation/command-palette'
<CommandPalette />
```

### Issue: Mobile nav not showing

**Solution:** Check breakpoints:

```tsx
// Mobile nav shows on screens < 1024px (lg breakpoint)
// Test by resizing browser or using mobile device
```

### Issue: Toasts not appearing

**Solution:** Add Toaster component to root layout:

```tsx
import { Toaster } from '@/components/ui/sonner'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />  {/* Required! */}
      </body>
    </html>
  )
}
```

---

## 📚 NEXT STEPS

1. **Read Examples:** Check `DESIGN_SYSTEM_EXAMPLES.md` for more patterns
2. **Review Components:** Browse `components/ui/` for all available components
3. **Check Navigation:** Look at `components/navigation/` for nav options
4. **Build Pages:** Start creating with the system!

---

## 🆘 NEED HELP?

- **Examples:** `DESIGN_SYSTEM_EXAMPLES.md`
- **Full Documentation:** `IMPLEMENTATION_COMPLETE_SUMMARY.md`
- **Design Plan:** `CREATOR_HUB_WORLD_CLASS_DESIGN_PLAN.md`

---

**Happy building! ✨**
