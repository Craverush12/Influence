# 📋 VISUAL TEST CHECKLIST - Quick 5-Minute Test

## 🎯 **HOW TO USE THIS CHECKLIST**

Open your website and go through each section. Check off each item as you test it.

---

## 1️⃣ **DASHBOARD TEST** (`/dashboard`)

### **Layout:**
- [ ] Page loads without errors
- [ ] 4 stat cards visible at top
- [ ] Bento grid layout visible (different sized cards)
- [ ] Navigation bar at top with Influx logo

### **Stats Cards (Top Row):**
- [ ] "Earned This Month" shows $2,847
- [ ] "Active Opportunities" shows 12
- [ ] "Profile Views" shows 847
- [ ] "New Connections" shows 8
- [ ] All cards have icons
- [ ] All cards have trend indicators (arrows)
- [ ] Hover over each card - should see scale animation

### **Bento Grid Section:**
- [ ] Large "Top Opportunity" card (takes ~2/3 width on desktop)
  - [ ] Shows job title
  - [ ] Shows budget badge (orange/amber color)
  - [ ] Shows description
  - [ ] Shows skills tags
  - [ ] Shows "Apply Now" button
  - [ ] Hover - should see subtle animation
- [ ] "Quick Actions" card (smaller, top right)
  - [ ] Shows 3 buttons
  - [ ] "Post a Job" is highlighted
  - [ ] Hover - buttons should animate
- [ ] "Recent Activity" card (smaller, below quick actions)
  - [ ] Shows 4 recent items with icons
  - [ ] Each item has colored icon
  - [ ] Hover over items - should highlight
- [ ] "Earnings This Week" chart (bottom, spans width)
  - [ ] Shows 7 bars (Mon-Sun)
  - [ ] Bars are orange/amber
  - [ ] Hover over bars - should see tooltips
  - [ ] Shows total: $3,560

### **Recommended Creators:**
- [ ] Section title "Recommended For You"
- [ ] Shows 3 creator cards (or message if none)
- [ ] Each card has avatar, name, bio
- [ ] Hover - cards should lift slightly

### **Responsive (Resize Browser):**
- [ ] Make browser narrow (mobile size)
- [ ] Stats cards stack vertically (1 column)
- [ ] Bento grid stacks vertically
- [ ] Navigation compresses (icons only)
- [ ] Everything readable and usable

### **Theme Toggle:**
- [ ] Click sun/moon icon in nav
- [ ] Theme should switch instantly
- [ ] Try light mode - should see white background
- [ ] Try dark mode - should see dark background
- [ ] All text readable in both modes
- [ ] No broken colors

---

## 2️⃣ **JOB LISTINGS TEST** (`/jobs`)

### **Layout:**
- [ ] Page loads without errors
- [ ] Navigation bar at top
- [ ] Large title "Discover Opportunities"
- [ ] Search bar below title

### **Hot Opportunities Section:**
- [ ] Section title "Hot Opportunities" with fire/trending icon
- [ ] Shows up to 3 job cards
- [ ] Each card has:
  - [ ] Creator avatar (top left)
  - [ ] Job title
  - [ ] Budget badge (prominent, orange/amber)
  - [ ] Description (2 lines)
  - [ ] Skills tags
  - [ ] Time posted, applicants count
  - [ ] "Open" status badge (green)
  - [ ] Some cards might have "Hot" badge (orange)
- [ ] Hover over cards - should lift and show subtle glow

### **All Opportunities Section:**
- [ ] Section title "All Opportunities"
- [ ] Shows remaining job cards in grid
- [ ] Same card design as hot opportunities
- [ ] Grid adjusts based on screen size

### **Search Bar:**
- [ ] Can click and type in search
- [ ] Filter button on right
- [ ] Should look clean and modern

### **Empty State (if no jobs):**
- [ ] Shows briefcase icon
- [ ] Message "No opportunities yet"
- [ ] "Post Your First Job" button

### **Responsive (Resize Browser):**
- [ ] Make browser narrow
- [ ] Cards stack vertically (1 column)
- [ ] Card content adjusts
- [ ] Budget badges stay visible
- [ ] Everything readable

### **Theme Toggle:**
- [ ] Try switching themes
- [ ] Cards update colors
- [ ] Text stays readable
- [ ] Borders visible in both themes

---

## 3️⃣ **EXPLORE PAGE TEST** (`/explore`)

### **Quick Check:**
- [ ] Page loads
- [ ] Creator cards show properly
- [ ] Grid responsive
- [ ] Theme toggle works
- [ ] Search bar functional

---

## 4️⃣ **LANDING PAGE TEST** (`/` - logged out)

### **Quick Check:**
- [ ] Page loads
- [ ] Hero section visible
- [ ] Theme toggle works
- [ ] Login/Signup buttons work
- [ ] All text readable
- [ ] Animations smooth

---

## 5️⃣ **OVERALL POLISH CHECK**

### **Navigation (All Pages):**
- [ ] Logo always visible (top left)
- [ ] "Influx" brand name displayed
- [ ] Theme toggle accessible
- [ ] Links work correctly
- [ ] Mobile menu functional (if applicable)

### **Hover Effects (All Pages):**
- [ ] Buttons have hover states
- [ ] Cards lift on hover
- [ ] Links underline or change color
- [ ] Cursor changes to pointer on clickable items

### **Colors:**
- [ ] Primary color is warm amber/orange
- [ ] Accent color is coral/pink
- [ ] Dark mode uses true black backgrounds
- [ ] Light mode uses clean white
- [ ] All text has good contrast

### **Typography:**
- [ ] Headings are bold and clear
- [ ] Body text is readable
- [ ] Font sizes appropriate
- [ ] Line height comfortable
- [ ] No text cutoffs

### **Spacing:**
- [ ] Elements not cramped
- [ ] Consistent gaps between sections
- [ ] Padding feels balanced
- [ ] No overlapping elements

### **Mobile:**
- [ ] Test on actual phone if possible
- [ ] Touch targets big enough
- [ ] Text readable without zooming
- [ ] No horizontal scrolling
- [ ] Buttons easy to tap

---

## ✅ **QUICK MOBILE TEST (2 minutes)**

1. **Open on Phone:**
   - [ ] Visit dashboard
   - [ ] Visit jobs page
   - [ ] Everything loads

2. **Test Interactions:**
   - [ ] Tap buttons - they work
   - [ ] Scroll smoothly
   - [ ] Theme toggle works
   - [ ] No layout breaking

3. **Check Readability:**
   - [ ] All text readable
   - [ ] Images not pixelated
   - [ ] Nothing too small
   - [ ] Can use site comfortably

---

## 🐛 **IF YOU FIND ISSUES:**

### **Common Fixes:**

1. **Colors Not Changing on Theme Toggle:**
   - Check `globals.css` - light/dark mode variables
   - Check component uses theme-aware classes

2. **Layout Breaking on Mobile:**
   - Check responsive classes (sm:, md:, lg:)
   - Verify grid column settings

3. **Cards Not Hovering:**
   - Check PremiumCard `hoverEffect` prop
   - Verify CSS includes hover utilities

4. **Text Not Readable:**
   - Increase contrast
   - Check foreground/background colors
   - Use `text-foreground` class

5. **Images Not Loading:**
   - Check image URLs
   - Verify Supabase storage setup
   - Use fallback placeholders

---

## 🎉 **PASS CRITERIA**

Your website is ready to launch if:
- [ ] All pages load without errors
- [ ] Theme toggle works everywhere
- [ ] Fully responsive (desktop, tablet, mobile)
- [ ] All hover effects working
- [ ] Text readable in both themes
- [ ] No console errors
- [ ] Navigation functional
- [ ] Cards and components look professional

---

## 📸 **BONUS: SCREENSHOT TEST**

Take screenshots of:
1. Dashboard (desktop, dark mode)
2. Dashboard (mobile, light mode)
3. Job listings (desktop, dark mode)
4. A single premium job card (close-up)
5. Landing page hero

Compare to Awwwards websites - should look competitive!

---

**Estimated Time:** 5-10 minutes  
**Last Updated:** January 13, 2026
