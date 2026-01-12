# 🎨 COMPONENT SHOWCASE
## Visual Guide to All Premium Components

This document showcases all available components with live examples and code snippets.

---

## 🎨 COLOR PALETTE

### Foundation Colors

<table>
<tr>
<td>

**OLED Blacks**
```
Void      #000000  (True OLED)
Obsidian  #06070a  (Elevated)
Charcoal  #0e0f12  (Cards)
Graphite  #15161a  (Raised cards)
```

</td>
<td>

**Premium Grays**
```
Ash       #242529  (Borders)
Slate     #3e3f42  (Muted)
Fog       #7f8084  (Secondary text)
Pearl     #f5f5f7  (Primary text)
```

</td>
</tr>
</table>

### Aurora Spectrum

<table>
<tr>
<td bgcolor="#17d99d">
<b>Emerald</b><br/>
#17d99d<br/>
Primary, Success
</td>
<td bgcolor="#ffb341">
<b>Amber</b><br/>
#ffb341<br/>
Warmth, Creativity
</td>
<td bgcolor="#1adbff">
<b>Cyan</b><br/>
#1adbff<br/>
Technology
</td>
<td bgcolor="#9d5fff">
<b>Violet</b><br/>
#9d5fff<br/>
Imagination
</td>
<td bgcolor="#f24b8b">
<b>Rose</b><br/>
#f24b8b<br/>
Passion
</td>
</tr>
</table>

---

## 🔘 BUTTONS

### Variants

#### Primary (Default)
```tsx
<Button variant="default" size="lg">
  Primary Action
</Button>
```
**Visual:** Emerald background, white text, shadow with emerald glow, lifts on hover

---

#### Gradient
```tsx
<Button variant="gradient" size="lg">
  Get Started
</Button>
```
**Visual:** Emerald→cyan gradient overlay on hover, lifts higher, stronger glow

---

#### Outline
```tsx
<Button variant="outline" size="lg">
  Learn More
</Button>
```
**Visual:** Transparent with 2px border, glass effect on hover

---

#### Ghost
```tsx
<Button variant="ghost" size="lg">
  Cancel
</Button>
```
**Visual:** Transparent, subtle gray background on hover

---

#### Glass
```tsx
<Button variant="glass" size="lg">
  Premium
</Button>
```
**Visual:** Glassmorphic with backdrop blur, lifts on hover

---

#### Destructive
```tsx
<Button variant="destructive" size="lg">
  Delete
</Button>
```
**Visual:** Red background, white text, red glow shadow

---

### Sizes

```tsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>

<Button size="icon"><Plus /></Button>
<Button size="icon-sm"><Plus /></Button>
<Button size="icon-lg"><Plus /></Button>
```

---

## 🎴 CARDS

### Interactive Card
```tsx
<Card variant="interactive">
  <CardHeader>
    <Badge variant="aurora">Featured</Badge>
    <CardTitle>Video Editor Needed</CardTitle>
    <CardDescription>Posted by @creativepro</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Looking for fast cuts and smooth transitions...</p>
  </CardContent>
  <CardFooter>
    <Button variant="gradient" className="w-full">
      Apply Now
    </Button>
  </CardFooter>
</Card>
```
**Visual:** Charcoal background, lifts -8px on hover, slight rotation (2deg), aurora glow

---

### Glass Card
```tsx
<Card variant="glass">
  <CardContent className="pt-6">
    <h3 className="text-2xl font-bold mb-4">Premium Glass</h3>
    <p className="text-muted-foreground">
      Frosted glass effect with backdrop blur.
    </p>
  </CardContent>
</Card>
```
**Visual:** Semi-transparent, blur(20px), saturate(180%), inset highlight

---

### Gradient Border Card
```tsx
<Card variant="gradientBorder">
  <CardContent className="pt-6">
    <h3>Aurora Outline</h3>
    <p>Emerald→cyan→violet gradient border</p>
  </CardContent>
</Card>
```
**Visual:** Charcoal with 2px aurora gradient border

---

### Bento Card (for Bento Grid)
```tsx
<div className="bento-container">
  <Card variant="bento">Regular</Card>
  <Card variant="bento" className="bento-wide">Wide (2 cols)</Card>
  <Card variant="bento" className="bento-tall">Tall (2 rows)</Card>
  <Card variant="bento" className="bento-large">Large (2x2)</Card>
</div>
```
**Visual:** Grid layout with auto-fit 280px columns, hover lift animation

---

## 🏷️ BADGES

### All Variants

```tsx
<Badge variant="default">Default</Badge>
<Badge variant="aurora">Featured</Badge>
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Failed</Badge>
<Badge variant="info">Beta</Badge>
<Badge variant="glass">Premium</Badge>
<Badge variant="outline">Draft</Badge>
```

**Visuals:**
- **default:** Emerald fill
- **aurora:** Emerald→cyan→violet gradient
- **success:** Emerald/10 bg, emerald text
- **warning:** Amber/10 bg, amber text
- **error:** Red/10 bg, red text
- **info:** Cyan/10 bg, cyan text
- **glass:** Glassmorphic
- **outline:** Transparent with border

### Sizes
```tsx
<Badge size="sm">Small</Badge>
<Badge size="default">Default</Badge>
<Badge size="lg">Large</Badge>
```

---

## ✍️ INPUTS

### All Variants

```tsx
<Input variant="default" placeholder="Default input" />
<Input variant="modern" placeholder="Modern input" />
<Input variant="premium" placeholder="Premium input" />
<Input variant="glass" placeholder="Glass input" />
```

**Visuals:**
- **default:** Clean minimal, border on focus
- **modern:** Input-modern class, premium styling
- **premium:** Obsidian bg, 2px border, aurora ring on focus
- **glass:** Glassmorphic with blur

### Focus States
All inputs show:
- 2px emerald border
- 4px emerald/10 ring (shadow)
- Smooth 200ms transition

---

## 🍞 TOASTS

### Success
```tsx
toast.success('Profile updated!')
```
**Visual:** Glass with emerald left border, emerald/10 gradient background, check icon

---

### Error
```tsx
toast.error('Failed to save', {
  description: 'Please try again',
  action: { label: 'Retry', onClick: retry },
})
```
**Visual:** Glass with red left border, red/10 gradient background, error icon, action button

---

### Warning
```tsx
toast.warning('Session expiring soon')
```
**Visual:** Glass with amber left border, amber/10 gradient, warning icon

---

### Info
```tsx
toast.info('New feature available')
```
**Visual:** Glass with cyan left border, cyan/10 gradient, info icon

---

### Aurora (Special)
```tsx
toast.aurora('✨ You earned a badge!', {
  description: 'Collaboration Master',
})
```
**Visual:** Aurora glass, emerald left border, emerald→violet gradient bg, sparkles icon

---

### Promise Toast
```tsx
toast.promise(uploadFile(), {
  loading: 'Uploading...',
  success: 'Upload complete!',
  error: 'Upload failed',
})
```
**Visual:** Auto-updates from loading (spinner) → success/error state

---

## 🪟 MODALS

### Premium Modal
```tsx
<PremiumModal
  open={open}
  onOpenChange={setOpen}
  title="Create New Project"
  description="Enter project details"
  variant="glass"
  size="lg"
  badge={{ label: 'Pro', variant: 'aurora' }}
  primaryAction={{
    label: 'Create',
    onClick: handleCreate,
    variant: 'gradient',
  }}
  secondaryAction={{
    label: 'Cancel',
    onClick: () => setOpen(false),
  }}
>
  <ProjectForm />
</PremiumModal>
```

**Visual:**
- Rounded 2xl (32px)
- Glass or aurora background
- 2px border with subtle glow
- Smooth scale-in animation
- Header with optional badge
- Footer with actions

---

### Confirmation Modal
```tsx
<ConfirmationModal
  open={open}
  onOpenChange={setOpen}
  title="Delete project?"
  description="This action cannot be undone."
  confirmLabel="Delete"
  cancelLabel="Cancel"
  variant="destructive"
  onConfirm={handleDelete}
/>
```

**Visual:**
- Small size (max-w-sm)
- Red primary button for destructive
- Simple yes/no layout

---

### Form Modal
```tsx
<FormModal
  open={open}
  onOpenChange={setOpen}
  title="Edit Profile"
  submitLabel="Save Changes"
  onSubmit={handleSubmit}
  loading={isLoading}
>
  <Input label="Name" />
  <Input label="Email" type="email" />
  <Textarea label="Bio" />
</FormModal>
```

**Visual:**
- Glass variant
- Form auto-submit on Enter
- Loading state with spinner
- Default + lg sizes available

---

### Feature Modal
```tsx
<FeatureModal
  open={open}
  onOpenChange={setOpen}
  title="New: AI Vibe Match"
  description="Find your perfect collaborators with AI"
  actionLabel="Try It Now"
>
  <FeaturePreview />
</FeatureModal>
```

**Visual:**
- Aurora variant (gradient tint)
- "New Feature" badge
- Large size
- Single action button

---

## 🎭 EMPTY STATES

### Basic Empty State
```tsx
<PremiumEmptyState
  icon={Inbox}
  title="No messages yet"
  description="When you receive messages, they'll appear here."
  action={{
    label: 'Start Conversation',
    onClick: () => router.push('/new'),
    variant: 'gradient',
  }}
/>
```

**Visual:**
- Large icon in gradient mesh background
- Centered text
- Primary + secondary action buttons
- Sizes: sm, default, lg

---

### No Results (Preset)
```tsx
<NoResultsEmptyState
  searchTerm="video editor"
  onClear={clearFilters}
  icon={Search}
/>
```
**Visual:** Auto-generated message with search term, clear filters button

---

### No Data (Preset)
```tsx
<NoDataEmptyState
  entityName="projects"
  onCreate={createProject}
  icon={Folder}
/>
```
**Visual:** "No {entity} yet" message, create CTA

---

### Error (Preset)
```tsx
<ErrorEmptyState
  onRetry={retry}
  icon={AlertCircle}
/>
```
**Visual:** Error message, retry button

---

### Coming Soon (Preset)
```tsx
<ComingSoonEmptyState
  icon={Sparkles}
/>
```
**Visual:** "In Development" badge, coming soon message

---

## 🧭 NAVIGATION

### Premium Sidebar (Desktop)
**Features:**
- Floating glass design with rounded corners
- Aurora gradient logo (rotates on hover)
- User profile card with glass aurora
- Sectioned navigation: Discover, Work, Connect
- Badge notifications
- Gradient CTA card for upgrades
- Active state with left accent bar
- Magnetic hover effects

**Visual Highlights:**
- Width: 288px (18rem)
- Glass premium background
- Rounded 2xl corners
- Shadow 2xl
- Smooth slide animation

---

### Mobile Bottom Nav
**Features:**
- Glass background with top gradient glow
- 5 icons with center action button
- Active state with top indicator bar
- Notification badges
- Safe area support (iOS)

**Visual Highlights:**
- Height: 64px (4rem)
- Center button: 56px circle with gradient
- Active: 32px emerald bar on top
- Badge: Red circle with white text

---

### Command Palette (⌘K)
**Features:**
- Keyboard shortcut (⌘K / Ctrl+K)
- Fuzzy search
- Grouped actions
- Icon + badge indicators
- Keyboard hints in footer

**Visual Highlights:**
- Max height: 500px
- Charcoal background
- 2px border
- Rounded 2xl
- Selected items: primary/10 background
- Footer with navigation hints

---

### Breadcrumbs
**Features:**
- Auto-generated from pathname
- Gradient underline on hover
- Icon support
- Compact variant with ellipsis

**Visual Highlights:**
- Small text (14px)
- Muted foreground for links
- Foreground for current page
- ChevronRight separator
- Hover: gradient underline scale animation

---

## 🎨 UTILITY CLASSES

### Background Gradients
```tsx
<div className="gradient-hero-aurora">5-color aurora</div>
<div className="gradient-aurora-1">Emerald→cyan→violet</div>
<div className="gradient-aurora-2">Amber→red→rose</div>
<div className="gradient-mesh-ambient">Radial glow</div>
```

### Text Gradients
```tsx
<h1 className="text-gradient-aurora">Rainbow text</h1>
<h2 className="text-gradient-emerald-cyan">Emerald→cyan</h2>
```

### Glass Effects
```tsx
<div className="glass-premium">Premium glass</div>
<div className="glass-aurora">Aurora glass</div>
<div className="glass-card">Card glass</div>
```

### Animations
```tsx
<div className="animate-fade-in-up">Fade in up</div>
<div className="animate-scale-in">Scale in</div>
<div className="scroll-reveal">Scroll reveal</div>
<div className="scroll-reveal stagger-2">Staggered</div>
```

### Skeleton Loading
```tsx
<div className="skeleton-shimmer h-12 w-full rounded-lg" />
<div className="skeleton-gradient h-24 w-full rounded-xl" />
<div className="skeleton h-32 w-full rounded-2xl" />
```

---

## 📐 LAYOUT PATTERNS

### Hero Section
```tsx
<section className="py-24 relative overflow-hidden">
  <div className="gradient-mesh-ambient absolute inset-0 opacity-30" />
  <div className="relative max-w-3xl mx-auto text-center">
    <h1 className="text-hero">
      Build <span className="text-gradient-aurora">Amazing</span> Things
    </h1>
    <p className="text-xl text-muted-foreground mb-10">
      Your tagline here
    </p>
    <Button variant="gradient" size="xl">Get Started</Button>
  </div>
</section>
```

---

### Feature Grid
```tsx
<div className="grid md:grid-cols-3 gap-6">
  {features.map(f => (
    <Card variant="hoverLift">
      <CardContent className="pt-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-aurora-1 
                        flex items-center justify-center mb-4">
          <f.icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold mb-2">{f.title}</h3>
        <p className="text-muted-foreground">{f.description}</p>
      </CardContent>
    </Card>
  ))}
</div>
```

---

### Stats Section
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
</div>
```

---

### Pricing Cards
```tsx
<div className="grid md:grid-cols-3 gap-8">
  <Card variant="gradientBorder" className="relative">
    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
      <Badge variant="aurora" size="lg">Most Popular</Badge>
    </div>
    <CardHeader className="text-center pt-8">
      <CardTitle className="text-3xl">Pro</CardTitle>
      <div className="mt-4">
        <span className="text-5xl font-bold">$29</span>
        <span className="text-muted-foreground">/mo</span>
      </div>
    </CardHeader>
    <CardContent>
      <ul className="space-y-3">
        <li className="flex gap-2">
          <Check className="w-4 h-4 text-primary" />
          <span>Unlimited projects</span>
        </li>
      </ul>
    </CardContent>
    <CardFooter>
      <Button variant="gradient" size="lg" className="w-full">
        Get Started
      </Button>
    </CardFooter>
  </Card>
</div>
```

---

### Testimonial Section
```tsx
<div className="grid md:grid-cols-2 gap-6">
  <Card variant="glass">
    <CardContent className="pt-6">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
        ))}
      </div>
      <blockquote className="text-lg font-medium mb-6">
        "This changed everything for my business."
      </blockquote>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-aurora-1" />
        <div>
          <div className="font-bold">Sarah Chen</div>
          <div className="text-sm text-muted-foreground">Creator</div>
        </div>
      </div>
    </CardContent>
  </Card>
</div>
```

---

### CTA Section
```tsx
<section className="py-24 relative overflow-hidden">
  <div className="gradient-aurora-1 absolute inset-0 opacity-20" />
  <div className="relative max-w-3xl mx-auto px-6 text-center">
    <Badge variant="aurora" size="lg" className="mb-6">
      Limited Time Offer
    </Badge>
    <h2 className="text-4xl font-bold mb-6">
      Ready to <span className="text-gradient-aurora">Transform</span> Your Workflow?
    </h2>
    <p className="text-xl text-muted-foreground mb-10">
      Join 50,000+ creators building the future.
    </p>
    <div className="flex gap-4 justify-center">
      <Button variant="gradient" size="xl">
        Start Free Trial
      </Button>
      <Button variant="outline" size="xl">
        Book Demo
      </Button>
    </div>
  </div>
</section>
```

---

## ✨ MICRO-INTERACTIONS

### Hover Effects
- **Buttons:** Lift -2px, scale 102%, shadow grows
- **Cards:** Lift -8px, rotate 2deg, shadow + glow
- **Links:** Gradient underline scales from 0 to 100%
- **Icons:** Scale 110%, smooth spring

### Focus States
- **All interactive:** 2px emerald ring, 2px offset
- **Inputs:** 2px border, 4px emerald/10 shadow
- **Buttons:** 2px ring, smooth transition

### Loading States
- **Buttons:** Spinner icon, disabled state
- **Skeletons:** Shimmer animation (2s loop)
- **Progress:** Smooth linear transition

---

## 🎯 DESIGN TOKENS REFERENCE

### Spacing (Perfect Fourth)
```
4px   8px   12px  16px  21px  28px  38px  50px  67px  90px  120px  160px
```

### Border Radius
```
xs: 4px   sm: 8px   md: 12px   lg: 16px   xl: 24px   2xl: 32px   full: 9999px
```

### Typography Scale
```
xs: 12px   sm: 14px   base: 16px   lg: 18px   xl: 20px
2xl: 24px   3xl: 30px   4xl: 36px   5xl: 48px   6xl: 60px
```

### Font Weights
```
normal: 400   medium: 500   semibold: 600   bold: 700   extrabold: 800
```

---

**End of Showcase** 🎨✨

For implementation code, see `DESIGN_SYSTEM_EXAMPLES.md`  
For quick start, see `QUICK_START_GUIDE.md`
