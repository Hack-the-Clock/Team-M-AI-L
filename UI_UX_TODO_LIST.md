# 🎨 InvestorIQ - UI/UX Implementation Todo List

Based on the Figma design mockups - Complete build checklist

---

## 📋 Overview

This todo list breaks down the InvestorIQ platform into actionable UI/UX tasks based on your design mockups. Each section includes specific components, styling, and functionality requirements.

---

## 🎯 Global Components (Build First)

### ✅ Navigation Bar
- [ ] **Logo** - "InvestorIQ" with chart icon (top left)
- [ ] **Navigation Tabs**
  - [ ] Home (active state highlight)
  - [ ] Sectors
  - [ ] Trends
  - [ ] AI Chatbot
  - [ ] My Watchlist (with badge counter - shows "3" in design)
- [ ] **Search Bar** (center/right)
  - [ ] Input field: "Search companies or sectors..."
  - [ ] Search icon
  - [ ] Autocomplete dropdown (optional)
- [ ] **Right Actions**
  - [ ] Theme toggle (light/dark mode icon)
  - [ ] User profile icon
- [ ] **Styling**
  - [ ] White background (light mode) / Dark background (dark mode)
  - [ ] Border bottom (subtle separator)
  - [ ] Sticky positioning on scroll
  - [ ] Active tab indicator (underline or color change)

### ✅ Color System
- [ ] **Primary Colors**
  - [ ] Navy blue: #0B132B (or similar dark blue from design)
  - [ ] Emerald/Teal: #29A19C (used for CTAs and accents)
  - [ ] White/Off-white: #F7F8FA
- [ ] **Status Colors**
  - [ ] Green: For positive changes (+15.3%, +12.7%, etc.)
  - [ ] Red: For negative changes
  - [ ] Yellow/Orange: For neutral/warning states
- [ ] **Dark Mode Variants**
  - [ ] Background: Very dark navy (#0A1628 or similar)
  - [ ] Card backgrounds: Slightly lighter navy
  - [ ] Text: Off-white/gray tones

### ✅ Typography
- [ ] Font family: Inter or similar modern sans-serif
- [ ] Heading sizes: 2xl, xl, lg
- [ ] Body text: base, sm
- [ ] Font weights: Regular (400), Medium (500), Semibold (600), Bold (700)

---

## 🏠 Page 1: Landing Page (Home)

### ✅ Hero Section
- [ ] **Layout**
  - [ ] Full-width gradient background (dark blue gradient with teal accent)
  - [ ] Centered content container
- [ ] **Headline**
  - [ ] Main text: "Explore Smarter, Invest Better" (large, bold, white text)
  - [ ] Emoji/icon: 📈 or chart graphic
- [ ] **Subtext**
  - [ ] "Get stock insights, sector trends, and AI-powered recommendations — all in one place."
  - [ ] Lighter color, medium size
- [ ] **CTA Button**
  - [ ] Text: "Start Exploring" with arrow icon →
  - [ ] Teal/emerald background (#29A19C)
  - [ ] White text
  - [ ] Rounded corners (large radius)
  - [ ] Hover effect: Slightly darker background
  - [ ] Click: Smooth scroll to chatbot section or next section
- [ ] **Stats Display** (below CTA)
  - [ ] "10,000+ Companies" (left)
  - [ ] "50+ Sectors" (center)
  - [ ] "Real-time AI Insights" (right)
  - [ ] Light text with subtle separators

### ✅ Top Performing Sectors Section
- [ ] **Section Header**
  - [ ] Title: "Top Performing Sectors" (large, bold, accent color)
  - [ ] Subtitle: "Explore high-growth sectors and discover emerging opportunities"
- [ ] **Sector Cards Grid** (3 columns on desktop, 1-2 on mobile)
  
  **Card 1: AI & Robotics**
  - [ ] Icon: Purple/violet background with robot/chip icon
  - [ ] Title: "AI & Robotics"
  - [ ] Percentage: "+15.3%" (green, top right)
  - [ ] Description text
  - [ ] "Explore" button or link
  - [ ] Hover effect: Lift up slightly with shadow
  
  **Card 2: Green Energy**
  - [ ] Icon: Green background with leaf icon
  - [ ] Title: "Green Energy"
  - [ ] Percentage: "+12.7%" (green)
  - [ ] Description text
  - [ ] Hover effect
  
  **Card 3: Healthcare Tech**
  - [ ] Icon: Pink/red background with heart/medical icon
  - [ ] Title: "Healthcare Tech"
  - [ ] Percentage: "+10.2%" (green)
  - [ ] Description text
  - [ ] Hover effect

- [ ] **Card Styling**
  - [ ] White background (light mode) / dark card (dark mode)
  - [ ] Rounded corners (16px)
  - [ ] Soft shadow
  - [ ] Padding: 24px
  - [ ] Smooth transitions on hover

---

## 📊 Page 2: Sectors Explorer

### ✅ Page Header
- [ ] Title: "Sectors Explorer"
- [ ] Subtitle: "Browse through major sectors and discover subcategories with detailed insights"

### ✅ Sector List (Accordion/Expandable)
- [ ] **Information Technology** (+12.5%)
  - [ ] Main sector row
  - [ ] Percentage indicator (green)
  - [ ] Description: "Software, hardware, semiconductors, and IT services"
  - [ ] Expand/collapse arrow icon (right side)
  - [ ] Subcategories (collapsed by default)
  
- [ ] **Industrials** (+8.3%)
  - [ ] Similar layout
  - [ ] Description: "Manufacturing, aerospace, defense, and automation"
  
- [ ] **Health Care** (+10.7%)
  - [ ] Description: "Pharmaceuticals, biotech, medical devices, and health services"
  
- [ ] **Financials** (+6.9%)
  - [ ] Description: "Banking, insurance, fintech, and financial services"
  
- [ ] **Consumer Discretionary** (+9.2%)
  - [ ] Description: "Retail, e-commerce, automotive, and consumer services"
  
- [ ] **Energy** (+11.4%)
  - [ ] Description: "Oil, gas, renewable energy, and energy storage"

- [ ] **Styling**
  - [ ] Each row: white background, border, padding
  - [ ] Hover state: Slight background color change
  - [ ] Expand animation: Smooth slide down
  - [ ] Divider lines between sectors

---

## 📈 Page 3: Trends / Insights

### ✅ Market Performance Chart
- [ ] **Chart Title**: "Market Performance"
- [ ] **Line Chart** (using Recharts or similar)
  - [ ] X-axis: Months (Jan, Feb, Mar... Dec)
  - [ ] Y-axis: Values (0, 55, 110, 165, 220)
  - [ ] Line: Teal/emerald color with gradient fill below
  - [ ] Smooth curve animation on load
  - [ ] Tooltip on hover (show exact values)
- [ ] **Time Period Selector** (optional)
  - [ ] Buttons: 1M, 3M, 6M, 1Y, ALL

### ✅ Market Heatmap by Sector
- [ ] **Section Title**: "Market Heatmap by Sector"
- [ ] **Heatmap Grid** (4 columns x 2 rows)
  
  **Sector Cards:**
  - [ ] AI & Robotics: Bright green (+15.3%)
  - [ ] Green Energy: Green (+12.7%)
  - [ ] Healthcare Tech: Light green (+10.2%)
  - [ ] Fintech: Yellow/gold (+8.9%)
  - [ ] EVs: Green (+14.5%)
  - [ ] Semiconductors: Light green (+11.8%)
  - [ ] E-commerce: Yellow (+6.2%)
  - [ ] Cloud Computing: Yellow/gold (+9.8%)
  
- [ ] **Card Styling**
  - [ ] Color intensity based on percentage (green = positive, red = negative)
  - [ ] Sector name (white text)
  - [ ] Percentage value (white text, bold)
  - [ ] Rounded corners
  - [ ] Hover: Scale up slightly
  - [ ] Click: Navigate to sector details

---

## 🤖 Page 4: AI Chatbot

### ✅ Layout (Split Screen - 2 Column)

**Left Column: Chat Interface**
- [ ] **Header**
  - [ ] Title: "AI Investment Assistant"
  - [ ] Subtitle: "Ask me anything about stocks, sectors, and market trends"
  - [ ] Icon: Robot/AI icon

- [ ] **Chat Messages Area**
  - [ ] Scrollable container
  - [ ] Bot welcome message:
    - [ ] "Hello! I'm your AI investment assistant. Ask me about trending companies, sectors, or specific stock recommendations. How can I help you today?"
    - [ ] Bot icon (left side)
    - [ ] Light gray bubble
  
  - [ ] User message example:
    - [ ] "What companies are leading in AI Robotics?"
    - [ ] Teal/blue bubble (right-aligned)
    - [ ] White text
  
  - [ ] Bot response:
    - [ ] "Here are the leading companies in AI & Robotics. These firms are at the forefront of artificial intelligence and automation technology."
    - [ ] Left-aligned
    - [ ] Light gray bubble

- [ ] **Typing Indicator**
  - [ ] Three animated dots when AI is responding
  - [ ] Bot icon with pulsing animation

- [ ] **Input Area** (bottom)
  - [ ] Text input field
  - [ ] Placeholder: "Ask me about trending companies in any category..."
  - [ ] Send button (teal, with arrow icon →)
  - [ ] Rounded corners on input

- [ ] **Example Queries** (below input)
  - [ ] Small gray text links (clickable)
  - [ ] "What companies are leading in AI Robotics?"
  - [ ] "Show me undervalued Fintech stocks."
  - [ ] "Which EV firms are growing fastest in 2025?"

**Right Column: Recommended Companies**
- [ ] **Header**
  - [ ] Title: "Recommended Companies"
  - [ ] Filter/sort options (optional)

- [ ] **Company Cards** (vertical list)
  
  **Card 1: NVIDIA**
  - [ ] Company icon/logo (purple chip icon in design)
  - [ ] Company name: "NVIDIA Corporation"
  - [ ] Ticker: "NVDA"
  - [ ] Price: "$875.28" (large, bold)
  - [ ] Change: "+4.5%" (green, with arrow)
  - [ ] Description: "Leading AI computing and GPU manufacturer powering the AI revolution"
  - [ ] Tags: "AI", "Semiconductors", "Innovation" (rounded chip tags)
  - [ ] "+ Add" button (teal, bottom right)
  - [ ] Hover: Card shadow increases
  
  **Card 2: Tesla**
  - [ ] Icon: Lightning/electric icon (orange/red)
  - [ ] Name: "Tesla Inc"
  - [ ] Ticker: "TSLA"
  - [ ] Price: "$242.84"
  - [ ] Change: "+2.3%" (green)
  - [ ] Description: "Electric vehicles with advanced AI-powered autonomous driving technology"
  - [ ] Tags: "AI", "Robotics", "EVs"
  - [ ] "+ Add" button
  
  **Card 3: Alphabet**
  - [ ] Icon: Search/Google icon
  - [ ] Name: "Alphabet Inc"
  - [ ] Ticker: "GOOGL"
  - [ ] Price: "$141.8"
  - [ ] Change: "+1.8%" (green)
  - [ ] Similar layout

- [ ] **Card Styling**
  - [ ] White background / dark mode variant
  - [ ] Border or subtle shadow
  - [ ] Rounded corners (12px)
  - [ ] Padding: 16px
  - [ ] Margin between cards: 12px
  - [ ] Smooth hover transition

- [ ] **Add Button Interaction**
  - [ ] Click: Show toast "Added to Watchlist!"
  - [ ] Button changes to "Added" or checkmark briefly
  - [ ] Update watchlist counter in navbar

---

## 🛒 Page 5: My Watchlist

### ✅ Page Header
- [ ] Title: "My Watchlist"
- [ ] Subtitle: "Track and compare your favorite stocks (3 companies)" - show count dynamically
- [ ] "Export CSV" button (top right, blue outline)

### ✅ Watchlist Table
- [ ] **Table Headers**
  - [ ] Compare (checkbox column)
  - [ ] Company (name + ticker)
  - [ ] Sector
  - [ ] Price
  - [ ] Change (%)
  - [ ] Tags
  - [ ] Actions

- [ ] **Table Rows** (from design)
  
  **Row 1: Tesla**
  - [ ] Checkbox (for compare)
  - [ ] Icon: Lightning bolt (orange)
  - [ ] Name: "Tesla Inc"
  - [ ] Ticker: "TSLA" (gray, smaller)
  - [ ] Sector: "Automotive"
  - [ ] Price: "$242.84"
  - [ ] Change: "+2.3%" (green with arrow)
  - [ ] Tags: "EVs", "Energy" (teal badges)
  - [ ] Delete icon (trash, red on hover)
  
  **Row 2: Rivian**
  - [ ] Icon: Truck icon (blue)
  - [ ] Name: "Rivian Automotive"
  - [ ] Ticker: "RIVN"
  - [ ] Sector: "Automotive"
  - [ ] Price: "$18.75"
  - [ ] Change: "+5.7%" (green)
  - [ ] Tags: "EVs", "Growth" (teal badges)
  - [ ] Delete icon
  
  **Row 3: NVIDIA**
  - [ ] Icon: Chip icon (purple)
  - [ ] Name: "NVIDIA Corporation"
  - [ ] Ticker: "NVDA"
  - [ ] Sector: "Technology"
  - [ ] Price: "$875.28"
  - [ ] Change: "+4.5%" (green)
  - [ ] Tags: "AI", "Semiconductors" (teal badges)
  - [ ] Delete icon

- [ ] **Table Styling**
  - [ ] White background / dark mode
  - [ ] Header row: Bold, slightly gray background
  - [ ] Alternating row colors (very subtle)
  - [ ] Hover row: Light background highlight
  - [ ] Border separators
  - [ ] Responsive: Stack on mobile

### ✅ Compare Feature
- [ ] "Compare" button (appears when 2-3 stocks checked)
- [ ] Opens modal or new section
- [ ] Side-by-side comparison view
- [ ] Mini charts showing price trends
- [ ] Key metrics comparison table

### ✅ Empty State
- [ ] Show when watchlist is empty
- [ ] Illustration or icon
- [ ] Text: "Your watchlist is empty"
- [ ] CTA: "Browse Sectors" or "Ask AI Chatbot"

---

## 🎨 UI Components Library

### ✅ Buttons
- [ ] **Primary Button** (Teal)
  - [ ] Background: #29A19C
  - [ ] Text: White
  - [ ] Padding: 12px 24px
  - [ ] Border radius: 8px
  - [ ] Hover: Darken 10%
  
- [ ] **Secondary Button** (Outline)
  - [ ] Border: Teal
  - [ ] Text: Teal
  - [ ] Background: Transparent
  - [ ] Hover: Light teal background
  
- [ ] **Icon Button**
  - [ ] Size: 40px x 40px
  - [ ] Rounded
  - [ ] Hover: Background appears

### ✅ Cards
- [ ] **Standard Card**
  - [ ] Background: White (light) / Dark gray (dark)
  - [ ] Border radius: 16px
  - [ ] Shadow: 0 2px 8px rgba(0,0,0,0.08)
  - [ ] Padding: 24px
  - [ ] Hover: Shadow increases to 0 4px 16px

### ✅ Badges/Tags
- [ ] Background: Light teal (rgba(41, 161, 156, 0.1))
- [ ] Text: Teal (#29A19C)
- [ ] Padding: 4px 12px
- [ ] Border radius: 12px (pill shape)
- [ ] Font size: Small (12-14px)

### ✅ Loading States
- [ ] Skeleton screens for cards
- [ ] Spinner for data fetching
- [ ] Shimmer effect on loading cards

### ✅ Toast Notifications
- [ ] Position: Top right
- [ ] Success: Green background
- [ ] Error: Red background
- [ ] Info: Blue background
- [ ] Auto-dismiss: 3 seconds
- [ ] Close button (X)

---

## 📱 Responsive Design

### ✅ Mobile (< 768px)
- [ ] Navbar: Hamburger menu
- [ ] Sector cards: Single column
- [ ] Chatbot: Stack vertically (chat on top, recommendations below)
- [ ] Watchlist: Card view instead of table
- [ ] Charts: Adjust height, responsive width

### ✅ Tablet (768px - 1024px)
- [ ] Navbar: Full tabs visible
- [ ] Sector cards: 2 columns
- [ ] Chatbot: Keep split view
- [ ] Adjust spacing and font sizes

### ✅ Desktop (> 1024px)
- [ ] Full layout as designed
- [ ] Max width container (1440px)
- [ ] Proper spacing and margins

---

## ✨ Animations & Micro-interactions

### ✅ Page Transitions
- [ ] Fade in on page load
- [ ] Smooth scroll between sections

### ✅ Card Interactions
- [ ] Hover: Lift up (translateY: -4px)
- [ ] Hover: Shadow increases
- [ ] Click: Scale down slightly (0.98)

### ✅ Button Interactions
- [ ] Hover: Darken background
- [ ] Click: Ripple effect
- [ ] Loading state: Spinner inside button

### ✅ Chatbot Animations
- [ ] Message slide in from left (bot) or right (user)
- [ ] Typing indicator: Bouncing dots
- [ ] Auto-scroll to latest message

### ✅ Add to Watchlist
- [ ] Button click: Success animation
- [ ] Toast notification slides in
- [ ] Navbar badge counter animates (+1)

### ✅ Chart Animations
- [ ] Line draws from left to right on load
- [ ] Fade in heatmap cards with stagger

---

## 🌙 Dark Mode

### ✅ Color Adjustments
- [ ] Background: #0A1628 (very dark navy)
- [ ] Cards: #1A2642 (dark blue-gray)
- [ ] Text: #E5E7EB (light gray)
- [ ] Borders: Lighter/more visible in dark mode
- [ ] Shadows: Adjust opacity

### ✅ Theme Toggle
- [ ] Icon: Sun (light mode) / Moon (dark mode)
- [ ] Smooth transition (0.3s)
- [ ] Save preference to localStorage
- [ ] Apply on page load

---

## ♿ Accessibility

### ✅ Keyboard Navigation
- [ ] All interactive elements focusable
- [ ] Focus indicators visible
- [ ] Tab order logical

### ✅ Screen Readers
- [ ] ARIA labels on icons
- [ ] Alt text on images
- [ ] Semantic HTML (nav, main, section, etc.)

### ✅ Color Contrast
- [ ] Text meets WCAG AA standards (4.5:1 ratio)
- [ ] Not relying on color alone for information

---

## 🎯 Priority Levels

### 🔴 HIGH PRIORITY (Week 1)
- [ ] Navigation bar (all pages)
- [ ] Landing page hero
- [ ] Top performing sectors cards
- [ ] AI Chatbot basic UI
- [ ] Dark mode toggle

### 🟡 MEDIUM PRIORITY (Week 2)
- [ ] Sectors explorer page
- [ ] Trends page with charts
- [ ] Chatbot recommendations panel
- [ ] Watchlist table
- [ ] Responsive design

### 🟢 LOW PRIORITY (Week 3)
- [ ] Compare feature
- [ ] Export CSV functionality
- [ ] Advanced animations
- [ ] Empty states
- [ ] Loading skeletons

---

## ✅ Implementation Checklist Template

Use this for each component:

```
Component: [Name]
├── [ ] HTML Structure
├── [ ] CSS Styling
├── [ ] Responsive breakpoints
├── [ ] Dark mode variant
├── [ ] Hover states
├── [ ] Click/interaction logic
├── [ ] Loading state
├── [ ] Error state
├── [ ] Accessibility (ARIA, keyboard)
└── [ ] Testing (multiple browsers/devices)
```

---

## 🚀 Quick Start Order

1. **Day 1-2:** Global components (navbar, colors, typography)
2. **Day 3-4:** Landing page (hero + sector cards)
3. **Day 5-6:** AI Chatbot page (split view)
4. **Day 7:** Sectors explorer
5. **Day 8:** Trends/Insights page (charts)
6. **Day 9:** Watchlist page
7. **Day 10:** Polish, animations, dark mode

---

**Start with the navigation bar, then build page by page. Test on mobile as you go!** 🎨✨
