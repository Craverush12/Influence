# 🎨 COMPONENT REDESIGN GUIDE - Implementation Details

## How to Apply the New Design System

### Color Palette Reference
```javascript
// Use these CSS variables throughout components
--background: #0A0E1A       // Main bg
--surface: #1A1428          // Cards, surfaces
--primary: #2D1B4E          // Primary buttons/accents
--secondary: #8B4513        // Secondary accents
--accent: #CC6644           // Main accent (Terracotta)
--accent-light: #D4A574     // Light accent (Mustard)
--foreground: #F5F1E8       // Text color
```

### Typography Classes
```html
<!-- Headings - Use Playfair Display -->
<h1 style={{ fontFamily: "'Playfair Display', serif" }}>Your Heading</h1>

<!-- Body - Use Inter -->
<p style={{ fontFamily: "'Inter', sans-serif" }}>Your text</p>

<!-- Code/Mono - Use Space Grotesk -->
<code style={{ fontFamily: "'Space Grotesk', monospace" }}>code</code>
```

---

## Component Templates

### 1️⃣ BUTTONS

#### Primary Button (CTA)
```jsx
<button className="px-8 py-4 rounded-lg font-semibold transition warm-glow"
  style={{
    background: 'linear-gradient(135deg, #CC6644 0%, #D4A574 100%)',
    color: '#0A0E1A'
  }}>
  Button Text
</button>
```

#### Secondary Button
```jsx
<button className="px-8 py-4 rounded-lg font-semibold transition interactive-element"
  style={{
    background: 'transparent',
    border: '2px solid rgba(204, 102, 68, 0.3)',
    color: '#F5F1E8'
  }}>
  Button Text
</button>
```

#### Ghost Button
```jsx
<button className="px-4 py-2 transition hover:opacity-70"
  style={{ color: '#F5F1E8' }}>
  Light Button
</button>
```

---

### 2️⃣ CARDS

#### Matte Card (Base)
```jsx
<div className="matte-card p-6"
  style={{
    background: 'rgba(26, 20, 40, 0.6)',
    border: '1px solid rgba(204, 102, 68, 0.15)'
  }}>
  <h3 style={{ fontFamily: "'Playfair Display', serif" }}>Card Title</h3>
  <p style={{ color: 'rgba(245, 241, 232, 0.7)' }}>Card content</p>
</div>
```

#### Professional Card (with accent bar)
```jsx
<div className="matte-card p-6" 
  style={{
    background: 'rgba(26, 20, 40, 0.6)',
    borderLeft: '4px solid #CC6644',
    paddingLeft: '20px'
  }}>
  {/* Content */}
</div>
```

#### Hover Card (elevated state)
```jsx
<div className="matte-card p-6 hover:shadow-lg transition-all"
  style={{
    background: 'rgba(26, 20, 40, 0.8)',
    cursor: 'pointer'
  }}>
  {/* Content */}
</div>
```

---

### 3️⃣ INPUT FIELDS

#### Text Input
```jsx
<input className="glass-input w-full px-4 py-3"
  style={{
    background: 'var(--surface)',
    border: '2px solid var(--primary)',
    borderRadius: '12px',
    color: '#F5F1E8'
  }}
  placeholder="Enter text..."
/>
```

#### Textarea
```jsx
<textarea className="glass-input w-full px-4 py-3 min-h-[120px]"
  style={{
    background: 'var(--surface)',
    border: '2px solid var(--primary)',
    borderRadius: '12px',
    color: '#F5F1E8',
    resize: 'vertical'
  }}
  placeholder="Enter message..."
/>
```

---

### 4️⃣ BADGES & TAGS

#### Category Badge
```jsx
<span className="px-3 py-1 rounded-full text-xs font-medium transition"
  style={{
    background: 'rgba(204, 102, 68, 0.15)',
    border: '1px solid rgba(204, 102, 68, 0.3)',
    color: '#D4A574'
  }}>
  Category Name
</span>
```

#### Specialty Tag
```jsx
<span className="px-3 py-1 rounded-full text-xs font-medium"
  style={{
    background: 'linear-gradient(135deg, rgba(204, 102, 68, 0.2) 0%, rgba(212, 165, 116, 0.1) 100%)',
    border: '1px solid rgba(204, 102, 68, 0.25)',
    color: '#F5F1E8'
  }}>
  {tag}
</span>
```

---

### 5️⃣ NAVIGATION SIDEBAR

```jsx
<aside className="matte-surface w-64 flex flex-col"
  style={{
    background: 'rgba(26, 20, 40, 0.8)',
    border: 'none',
    boxShadow: '0 0 0 1px rgba(204, 102, 68, 0.1)'
  }}>
  {/* Logo */}
  <div className="p-6" style={{ borderBottom: '1px solid rgba(204, 102, 68, 0.1)' }}>
    <Link href="/" className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #CC6644 0%, #D4A574 100%)' }}>
        <span style={{ color: '#0A0E1A', fontWeight: 'bold' }}>CH</span>
      </div>
      <span className="font-bold" style={{ color: '#F5F1E8' }}>Creator Hub</span>
    </Link>
  </div>

  {/* Nav Links */}
  <nav className="flex-1 p-4 space-y-2">
    {links.map((link) => (
      <Link key={link.href} href={link.href}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
          isActive ? '' : ''
        }`}
        style={{
          background: isActive ? 'rgba(204, 102, 68, 0.2)' : 'transparent',
          borderLeft: isActive ? '3px solid #CC6644' : 'none',
          color: isActive ? '#D4A574' : 'rgba(245, 241, 232, 0.7)',
          paddingLeft: isActive ? '13px' : '16px'
        }}>
        <Icon className="w-5 h-5" />
        <span>{link.label}</span>
      </Link>
    ))}
  </nav>
</aside>
```

---

### 6️⃣ PROFESSIONAL CARD

```jsx
<div className="matte-card p-6 hover:shadow-lg transition-all"
  style={{
    background: 'rgba(26, 20, 40, 0.7)',
    borderLeft: '4px solid #CC6644'
  }}>
  {/* Header */}
  <div className="flex gap-4 mb-4">
    <img src={image} 
      className="w-20 h-20 rounded-lg object-cover"
      style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)' }}
    />
    <div className="flex-1">
      <h3 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '4px'
      }}>
        {name}
      </h3>
      <p style={{ color: 'rgba(245, 241, 232, 0.6)' }}>{bio}</p>
    </div>
  </div>

  {/* Specialties */}
  <div className="flex flex-wrap gap-2 mb-4">
    {specialties.map((spec) => (
      <span key={spec} className="px-3 py-1 rounded-full text-xs"
        style={{
          background: 'rgba(204, 102, 68, 0.15)',
          border: '1px solid rgba(204, 102, 68, 0.3)',
          color: '#D4A574'
        }}>
        {spec}
      </span>
    ))}
  </div>

  {/* Stats Grid */}
  <div className="grid grid-cols-5 gap-3 mb-4 pb-4"
    style={{ borderBottom: '1px solid rgba(204, 102, 68, 0.1)' }}>
    {/* Stats here */}
  </div>

  {/* CTA Button */}
  <button className="w-full px-4 py-2 rounded-lg font-semibold transition warm-glow"
    style={{
      background: 'linear-gradient(135deg, #CC6644 0%, #D4A574 100%)',
      color: '#0A0E1A'
    }}>
    View Profile
  </button>
</div>
```

---

### 7️⃣ MESSAGING INTERFACE

#### Message Container
```jsx
<div className="flex flex-col gap-4 p-6"
  style={{
    background: 'rgba(10, 14, 26, 0.5)',
    minHeight: '500px'
  }}>
  {/* Messages */}
</div>
```

#### Own Message (Sent)
```jsx
<div className="flex justify-end mb-4">
  <div className="max-w-xs px-4 py-3 rounded-lg"
    style={{
      background: 'linear-gradient(135deg, #2D1B4E 0%, #CC6644 100%)',
      color: '#F5F1E8',
      borderRadius: '12px 12px 0 12px'
    }}>
    {message}
  </div>
</div>
```

#### Other's Message (Received)
```jsx
<div className="flex justify-start mb-4">
  <div className="max-w-xs px-4 py-3 rounded-lg"
    style={{
      background: 'rgba(26, 20, 40, 0.8)',
      border: '1px solid rgba(204, 102, 68, 0.15)',
      color: '#F5F1E8',
      borderRadius: '12px 12px 12px 0'
    }}>
    {message}
  </div>
</div>
```

#### Message Input
```jsx
<div className="flex gap-2 p-6"
  style={{ borderTop: '1px solid rgba(204, 102, 68, 0.1)' }}>
  <input className="glass-input flex-1 px-4 py-3"
    style={{
      background: 'var(--surface)',
      border: '2px solid var(--primary)',
      borderRadius: '12px'
    }}
    placeholder="Type your message..."
  />
  <button className="px-6 py-3 rounded-lg font-semibold transition warm-glow"
    style={{
      background: 'linear-gradient(135deg, #CC6644 0%, #D4A574 100%)',
      color: '#0A0E1A'
    }}>
    Send
  </button>
</div>
```

---

### 8️⃣ FORM FIELDS

#### Form Container
```jsx
<form className="space-y-6 max-w-md">
  {/* Field */}
  <div>
    <label style={{
      display: 'block',
      marginBottom: '8px',
      fontWeight: '500',
      color: '#F5F1E8'
    }}>
      Field Label
    </label>
    <input className="glass-input w-full px-4 py-3"
      style={{
        background: 'var(--surface)',
        border: '2px solid var(--primary)',
        borderRadius: '12px',
        color: '#F5F1E8'
      }}
    />
  </div>

  {/* Submit Button */}
  <button type="submit" className="w-full px-4 py-3 rounded-lg font-semibold transition warm-glow"
    style={{
      background: 'linear-gradient(135deg, #CC6644 0%, #D4A574 100%)',
      color: '#0A0E1A',
      marginTop: '16px'
    }}>
    Submit
  </button>
</form>
```

---

### 9️⃣ PROFILE SECTIONS

#### Profile Header
```jsx
<div style={{
  background: 'linear-gradient(135deg, rgba(45, 27, 78, 0.4) 0%, rgba(139, 69, 19, 0.2) 100%)',
  padding: '48px',
  borderRadius: '16px',
  marginBottom: '32px'
}}>
  <div className="flex gap-6 items-end">
    <img src={avatar}
      className="w-24 h-24 rounded-xl"
      style={{ boxShadow: 'var(--shadow-md)' }}
    />
    <div>
      <h1 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '32px',
        marginBottom: '8px',
        color: '#F5F1E8'
      }}>
        {name}
      </h1>
      <p style={{ color: 'rgba(245, 241, 232, 0.7)' }}>{title}</p>
    </div>
  </div>
</div>
```

#### Profile Stats
```jsx
<div className="grid grid-cols-4 gap-6">
  {[
    { label: 'Projects', value: '24' },
    { label: 'Rating', value: '4.9' },
    { label: 'Completed', value: '120' },
    { label: 'Followers', value: '15K' }
  ].map((stat) => (
    <div key={stat.label} className="matte-card p-6 text-center">
      <div className="text-3xl font-bold gradient-text mb-2"
        style={{ fontFamily: "'Playfair Display', serif" }}>
        {stat.value}
      </div>
      <p style={{ color: 'rgba(245, 241, 232, 0.6)' }}>{stat.label}</p>
    </div>
  ))}
</div>
```

---

## Quick Implementation Tips

1. **Always use CSS variables** from `globals.css` for consistency
2. **Gradient text**: Use `.gradient-text` class for consistency
3. **Hover effects**: Use `.warm-glow` class for accent color glows
4. **Matte cards**: Always use `.matte-card` class as base
5. **Rounded corners**: Use `rounded-lg` (12px) for small, `rounded-xl` (16px) for large
6. **Spacing**: Use Tailwind spacing (gap-4, p-6, etc.) - 16px base unit
7. **Borders**: Use `rgba(204, 102, 68, 0.15)` for subtle borders
8. **Text colors**: Cream (#F5F1E8) for main, `rgba(245, 241, 232, 0.7)` for secondary

---

## Animation Recommendations

```css
/* Use these easing functions */
transition-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);

/* Hover states */
transform: translateY(-4px);        /* Lift up */
box-shadow: 0 0 20px rgba(204, 102, 68, 0.3);  /* Warm glow */

/* Durations */
transition: all 300ms cubic-bezier(...);  /* Standard */
transition: all 500ms cubic-bezier(...);  /* Slower for larger elements */
```

---

## Files to Update Next

- [ ] `/app/auth/login/page.tsx` - Login form
- [ ] `/app/auth/signup/page.tsx` - Signup form
- [ ] `/app/dashboard/page.tsx` - Dashboard
- [ ] `/app/creators/page.tsx` - Creators list
- [ ] `/app/professionals/page.tsx` - Professionals page
- [ ] `/components/professional-card.tsx` - Update component
- [ ] `/components/sidebar.tsx` - Update sidebar
- [ ] `/components/chat-window.tsx` - Messaging UI
- [ ] All UI components in `/components/ui/` - Button, Card, Input, etc.

---

This design system ensures consistency, accessibility, and that beautiful matte, culturally-rich aesthetic throughout! 🎨✨


