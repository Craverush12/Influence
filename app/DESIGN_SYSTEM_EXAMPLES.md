# 🎨 DESIGN SYSTEM USAGE EXAMPLES
## How to Use the World-Class Components

---

## 🔘 BUTTON EXAMPLES

### Primary Buttons

```tsx
import { Button } from '@/components/ui/button'

// Standard Primary - Aurora Emerald with glow
<Button>Get Started</Button>

// Gradient Primary - Aurora gradient effect
<Button variant="gradient">Upgrade Now</Button>

// Large Premium Button
<Button variant="gradient" size="lg">
  <Sparkles className="w-5 h-5" />
  Start Free Trial
</Button>

// Extra Large Hero Button
<Button variant="gradient" size="xl">
  Join 50,000+ Creators
</Button>
```

### Secondary & Ghost Buttons

```tsx
// Secondary - Elevated dark
<Button variant="secondary">Learn More</Button>

// Ghost - Subtle transparent
<Button variant="ghost">Cancel</Button>

// Outline - Glass effect
<Button variant="outline">View Details</Button>
```

### Glass & Special Effects

```tsx
// Glassmorphic floating button
<Button variant="glass" size="lg">
  Premium Feature
</Button>

// Link with gradient underline
<Button variant="link">
  Read Documentation →
</Button>
```

### Icon Buttons

```tsx
// Small icon button
<Button variant="ghost" size="icon-sm">
  <Settings className="w-4 h-4" />
</Button>

// Standard icon button
<Button variant="default" size="icon">
  <Plus className="w-5 h-5" />
</Button>

// Large icon button
<Button variant="gradient" size="icon-lg">
  <Zap className="w-6 h-6" />
</Button>
```

---

## 🎴 CARD EXAMPLES

### Standard Cards

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Default Card
<Card>
  <CardHeader>
    <CardTitle>Video Editor Needed</CardTitle>
    <CardDescription>Posted by @creativepro</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Looking for fast cuts and smooth transitions for a travel vlog series.</p>
  </CardContent>
  <CardFooter>
    <Button variant="gradient" className="w-full">
      Apply Now
    </Button>
  </CardFooter>
</Card>
```

### Interactive Cards

```tsx
// Card with hover lift and glow
<Card variant="interactive">
  <CardHeader>
    <Badge variant="aurora">Featured</Badge>
    <CardTitle>Premium Opportunity</CardTitle>
  </CardHeader>
  <CardContent>
    <p>This card lifts on hover with an aurora glow effect.</p>
  </CardContent>
</Card>

// Hover Lift Card (smooth elevation)
<Card variant="hoverLift">
  <CardContent>
    <h3 className="text-xl font-bold mb-2">Smooth Animation</h3>
    <p>Elevates -8px on hover with border color change.</p>
  </CardContent>
</Card>
```

### Glass & Premium Cards

```tsx
// Glassmorphic Card
<Card variant="glass">
  <CardContent>
    <h3 className="text-2xl font-bold mb-4">Premium Glass</h3>
    <p className="text-muted-foreground">
      Frosted glass effect with backdrop blur and subtle glow.
    </p>
  </CardContent>
</Card>

// Aurora Glass Card
<Card variant="glassAurora">
  <CardContent>
    <h3 className="text-2xl font-bold text-gradient-aurora">Aurora Glass</h3>
    <p>Glass effect with aurora gradient tint.</p>
  </CardContent>
</Card>

// Gradient Border Card
<Card variant="gradientBorder">
  <CardContent>
    <h3>Gradient Border</h3>
    <p>Aurora gradient outline effect.</p>
  </CardContent>
</Card>
```

### Bento Grid Layout

```tsx
<div className="bento-container">
  <Card variant="bento">
    <h3>Regular</h3>
  </Card>
  
  <Card variant="bento" className="bento-wide">
    <h3>Wide (2 columns)</h3>
  </Card>
  
  <Card variant="bento" className="bento-tall">
    <h3>Tall (2 rows)</h3>
  </Card>
  
  <Card variant="bento" className="bento-large">
    <h3>Large (2x2)</h3>
  </Card>
</div>
```

---

## ✍️ INPUT EXAMPLES

```tsx
import { Input } from '@/components/ui/input'

// Default Input
<Input type="email" placeholder="your@email.com" />

// Modern Input (with premium styling)
<Input variant="modern" placeholder="Search..." />

// Premium Input (obsidian background, aurora focus)
<Input variant="premium" placeholder="Enter your name" />

// Glass Input (glassmorphic effect)
<Input variant="glass" placeholder="Username" />

// With Label
<div className="space-y-2">
  <label className="text-sm font-medium text-muted-foreground">
    Email Address
  </label>
  <Input 
    variant="premium" 
    type="email" 
    placeholder="you@example.com"
  />
  <p className="text-xs text-muted-foreground">
    We'll never share your email.
  </p>
</div>
```

---

## 🏷️ BADGE EXAMPLES

```tsx
import { Badge } from '@/components/ui/badge'

// Status Badges
<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Failed</Badge>
<Badge variant="info">Beta</Badge>

// Aurora Gradient Badge
<Badge variant="aurora">Featured</Badge>

// Size Variants
<Badge size="sm">Small</Badge>
<Badge size="default">Default</Badge>
<Badge size="lg">Large</Badge>

// Glass Badge
<Badge variant="glass">Premium</Badge>

// Outline Badge
<Badge variant="outline">Draft</Badge>

// Usage in Cards
<Card variant="interactive">
  <CardHeader>
    <div className="flex items-center gap-2">
      <Badge variant="aurora">Hot</Badge>
      <Badge variant="success">$500</Badge>
    </div>
    <CardTitle>Trending Opportunity</CardTitle>
  </CardHeader>
</Card>
```

---

## 🎨 GRADIENT & EFFECT UTILITIES

### Text Gradients

```tsx
<h1 className="text-gradient-aurora text-6xl font-bold">
  Create Magic
</h1>

<h2 className="text-gradient-emerald-cyan text-4xl font-bold">
  Premium Title
</h2>
```

### Background Gradients

```tsx
// Hero gradient (full aurora spectrum)
<div className="gradient-hero-aurora p-12 rounded-2xl">
  <h1 className="text-white text-4xl font-bold">Hero Section</h1>
</div>

// Aurora 1 (emerald → cyan → violet)
<div className="gradient-aurora-1 p-8 rounded-xl">
  <p className="text-white">Gradient Background</p>
</div>

// Aurora 2 (amber → red → rose)
<div className="gradient-aurora-2 p-8 rounded-xl">
  <p className="text-white">Warm Gradient</p>
</div>

// Mesh gradient (ambient glow)
<div className="gradient-mesh-ambient p-12 rounded-2xl">
  <h2 className="text-4xl font-bold">Ambient Glow</h2>
</div>
```

### Aurora Background with Animation

```tsx
<section className="aurora-bg min-h-screen flex items-center justify-center">
  <div className="text-center">
    <h1 className="text-6xl font-bold text-pearl mb-4">
      Welcome to Creator Hub
    </h1>
    <p className="text-xl text-fog">
      Where creators connect and collaborate
    </p>
  </div>
</section>
```

### Glassmorphism

```tsx
// Premium Glass
<div className="glass-premium p-8 rounded-2xl">
  <h3 className="text-xl font-bold mb-4">Premium Glass</h3>
  <p className="text-muted-foreground">
    Frosted glass with saturation boost and subtle inset highlight.
  </p>
</div>

// Aurora Glass
<div className="glass-aurora p-8 rounded-2xl">
  <h3 className="text-xl font-bold mb-4">Aurora Glass</h3>
  <p>Glass with aurora gradient tint.</p>
</div>
```

---

## ✨ ANIMATION UTILITIES

### Scroll Reveal Animations

```tsx
// Fade in up on scroll
<div className="scroll-reveal">
  <h2>This fades in as you scroll</h2>
</div>

// Staggered animations
<div className="space-y-4">
  <div className="scroll-reveal stagger-1">Item 1</div>
  <div className="scroll-reveal stagger-2">Item 2</div>
  <div className="scroll-reveal stagger-3">Item 3</div>
  <div className="scroll-reveal stagger-4">Item 4</div>
</div>
```

### Manual Animations

```tsx
// Fade in up
<div className="animate-fade-in-up">
  <h1>Animated Title</h1>
</div>

// Scale in (for icons, badges)
<Badge className="animate-scale-in" variant="aurora">
  New!
</Badge>

// Slide in from left
<Card className="animate-slide-in-left">
  <CardContent>Slides from left</CardContent>
</Card>

// Slide in from right
<Card className="animate-slide-in-right">
  <CardContent>Slides from right</CardContent>
</Card>
```

---

## 🎭 PREMIUM CARD PATTERNS

### Feature Card

```tsx
<Card variant="hoverLift" className="h-full">
  <CardContent className="pt-6">
    <div className="w-12 h-12 rounded-xl bg-gradient-aurora-1 flex items-center justify-center mb-6">
      <Sparkles className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-xl font-bold mb-3">Discover Matches</h3>
    <p className="text-muted-foreground leading-relaxed">
      Find collaborators who align with your vision and amplify your creative voice.
    </p>
  </CardContent>
</Card>
```

### Pricing Card

```tsx
<Card variant="gradientBorder" className="relative">
  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
    <Badge variant="aurora" size="lg">Most Popular</Badge>
  </div>
  <CardHeader className="text-center pt-8">
    <CardTitle className="text-3xl">Pro Plan</CardTitle>
    <div className="mt-4">
      <span className="text-5xl font-bold">$29</span>
      <span className="text-muted-foreground">/month</span>
    </div>
  </CardHeader>
  <CardContent>
    <ul className="space-y-3">
      <li className="flex items-center gap-2">
        <Check className="w-4 h-4 text-primary" />
        <span>Unlimited projects</span>
      </li>
      {/* More features */}
    </ul>
  </CardContent>
  <CardFooter>
    <Button variant="gradient" size="lg" className="w-full">
      Get Started
    </Button>
  </CardFooter>
</Card>
```

### Testimonial Card

```tsx
<Card variant="glass">
  <CardContent className="pt-6">
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
      ))}
    </div>
    <blockquote className="text-lg font-medium leading-relaxed mb-6">
      "This platform changed everything. I found my dream collaborators."
    </blockquote>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-gradient-aurora-1" />
      <div>
        <div className="font-bold">Sarah Chen</div>
        <div className="text-sm text-muted-foreground">Content Creator</div>
      </div>
    </div>
  </CardContent>
</Card>
```

---

## 🎯 COMPLETE EXAMPLES

### CTA Section

```tsx
<section className="py-24 relative overflow-hidden">
  <div className="gradient-mesh-ambient absolute inset-0 opacity-30" />
  <div className="relative max-w-3xl mx-auto px-6 text-center">
    <h2 className="text-4xl md:text-6xl font-bold mb-6">
      Ready to <span className="text-gradient-aurora">Level Up</span>?
    </h2>
    <p className="text-xl text-muted-foreground mb-10">
      Join thousands of creators building the future of content.
    </p>
    <div className="flex gap-4 justify-center">
      <Button variant="gradient" size="xl">
        Get Started Free
        <ArrowRight className="w-5 h-5" />
      </Button>
      <Button variant="outline" size="xl">
        View Demo
      </Button>
    </div>
  </div>
</section>
```

### Stats Section

```tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
  {[
    { value: '50K+', label: 'Active Creators' },
    { value: '100K+', label: 'Connections Made' },
    { value: '$50M+', label: 'Value Created' },
    { value: '4.9/5', label: 'Average Rating' },
  ].map((stat, i) => (
    <Card key={i} variant="elevated" className="text-center">
      <CardContent className="pt-6">
        <div className="text-4xl font-bold text-gradient-aurora mb-2">
          {stat.value}
        </div>
        <div className="text-sm text-muted-foreground uppercase tracking-wider">
          {stat.label}
        </div>
      </CardContent>
    </Card>
  ))}
</div>
```

---

## 🚀 PRO TIPS

### 1. Combining Effects

```tsx
// Glass card with gradient border on hover
<Card 
  variant="glass" 
  className="hover:shadow-2xl hover:border-primary transition-all duration-300"
>
  <CardContent>Premium combo effect</CardContent>
</Card>
```

### 2. Responsive Typography

```tsx
// Fluid hero text
<h1 className="text-hero text-pearl">
  Responsive Hero
</h1>
// Uses clamp(3rem, 8vw, 6rem) internally

// Premium text style
<h2 className="text-premium text-5xl">
  Premium Heading
</h2>
```

### 3. Loading States

```tsx
// Shimmer skeleton
<div className="skeleton-shimmer h-12 w-full rounded-lg" />

// Gradient shimmer
<div className="skeleton-gradient h-24 w-full rounded-xl" />

// Pulse skeleton
<div className="skeleton h-32 w-full rounded-2xl" />
```

### 4. Link with Gradient Underline

```tsx
<a href="#" className="link-gradient-underline font-medium">
  Learn more about our platform →
</a>
```

---

## 📚 DESIGN TOKEN REFERENCE

### Quick Color Access

```css
/* Use in custom styles */
background: hsl(var(--color-aurora-emerald));
color: hsl(var(--color-pearl));
border-color: hsl(var(--color-ash));
```

### Spacing

```css
/* Use spacing tokens */
padding: var(--space-6);  /* 28.44px */
gap: var(--space-4);      /* 16px */
margin: var(--space-12);  /* 67.34px */
```

### Radius

```css
/* Use radius tokens */
border-radius: var(--radius-xl);   /* 24px */
border-radius: var(--radius-full); /* 9999px */
```

---

**Ready to build world-class interfaces!** 🎨✨

*For more examples, see the full component documentation.*
