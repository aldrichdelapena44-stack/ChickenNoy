# Rice Addon Visual Guide

## What You'll See in the Cart

### Desktop View (> 860px)

```
┌─────────────────────────────────────────────────────────────────────┐
│ CART ITEM: Chicken Noy Classic Fried Leg                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  [Image]    Chicken Noy Classic Fried Leg                          │
│  76x76px    PHP 25.00 each                                          │
│                                                                     │
│             [-] 1 [+]        PHP 25.00        [Remove]              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ ADD RICE (OPTIONAL)                                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  [Rice]     PHP 15.00 per cup                                       │
│  100x100    [-] 0 [+]  [Add]                                        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### After Adding Rice (Desktop)

```
┌─────────────────────────────────────────────────────────────────────┐
│ CART ITEM: Chicken Noy Classic Fried Leg                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  [Image]    Chicken Noy Classic Fried Leg                          │
│  76x76px    PHP 25.00 each                                          │
│                                                                     │
│             [-] 1 [+]        PHP 25.00        [Remove]              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ ADD RICE (OPTIONAL)                                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  [Rice]     PHP 15.00 per cup                                       │
│  100x100    [-] 2 [+]  [Added ✓]                                   │
│                                                                     │
│             Rice Total: PHP 30.00                                   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

### Mobile View (< 520px)

```
┌───────────────────────────────┐
│ CART ITEM                     │
├───────────────────────────────┤
│                               │
│  [Image]  Chicken Noy         │
│  64x64    Classic Fried Leg   │
│           PHP 25.00 each      │
│                               │
│  [-]    1    [+]              │
│                               │
│  PHP 25.00                    │
│                               │
│  [Remove]                     │
│                               │
└───────────────────────────────┘

┌───────────────────────────────┐
│ ADD RICE (OPTIONAL)           │
├───────────────────────────────┤
│                               │
│        [Rice Image]           │
│         80x80px               │
│                               │
│    PHP 15.00 per cup          │
│                               │
│     [-]  0  [+]               │
│                               │
│        [Add]                  │
│                               │
└───────────────────────────────┘
```

### After Adding Rice (Mobile)

```
┌───────────────────────────────┐
│ CART ITEM                     │
├───────────────────────────────┤
│                               │
│  [Image]  Chicken Noy         │
│  64x64    Classic Fried Leg   │
│           PHP 25.00 each      │
│                               │
│  [-]    1    [+]              │
│                               │
│  PHP 25.00                    │
│                               │
│  [Remove]                     │
│                               │
└───────────────────────────────┘

┌───────────────────────────────┐
│ ADD RICE (OPTIONAL)           │
├───────────────────────────────┤
│                               │
│        [Rice Image]           │
│         80x80px               │
│                               │
│    PHP 15.00 per cup          │
│                               │
│     [-]  2  [+]               │
│                               │
│      [Added ✓]                │
│                               │
│  Rice Total: PHP 30.00        │
│                               │
└───────────────────────────────┘
```

---

## Color Scheme

### Rice Addon Box
- **Background:** Light yellow (rgba(255, 190, 11, 0.04))
- **Border:** Yellow (rgba(255, 190, 11, 0.25))
- **Border Radius:** 10px
- **Hover Border:** Brighter yellow (rgba(255, 190, 11, 0.35))

### Rice Image
- **Size Desktop:** 100x100px
- **Size Mobile:** 80x80px
- **Border:** 2px solid yellow (#ffbe0b)
- **Border Radius:** 12px
- **Shadow:** 0 4px 12px rgba(255, 190, 11, 0.2)
- **Hover:** Scale 1.03 + stronger shadow

### Title "ADD RICE (OPTIONAL)"
- **Color:** Yellow (#ffbe0b)
- **Font Weight:** 800
- **Font Size:** 0.9rem
- **Text Transform:** Uppercase
- **Letter Spacing:** 0.05em

### Price Label "PHP 15.00 per cup"
- **Color:** Light gray (#c8c8c8)
- **Font Size:** 0.9rem
- **Font Weight:** 600

### Quantity Controls
- **Background:** Dark (rgba(0, 0, 0, 0.38))
- **Border:** Yellow (rgba(255, 190, 11, 0.3))
- **Border Radius:** 8px
- **Button Color:** Yellow (#ffbe0b)
- **Number Color:** White (#ffffff)
- **Button Hover:** Light yellow background

### Add Button (Normal State)
- **Background:** Transparent with yellow tint (rgba(255, 190, 11, 0.1))
- **Border:** Yellow (rgba(255, 190, 11, 0.4))
- **Text Color:** Yellow (#ffbe0b)
- **Text:** "Add"
- **Hover:** Brighter background + slight lift

### Add Button (Added State)
- **Background:** Yellow gradient (linear-gradient(135deg, #ffbe0b, #f2a600))
- **Border:** Yellow (#ffbe0b)
- **Text Color:** Black (#000000)
- **Text:** "Added ✓"
- **Hover:** No transform (stays in place)

### Rice Total Display
- **Color:** Yellow (#ffbe0b)
- **Font Weight:** 900
- **Font Size:** 0.95rem
- **Text:** "Rice Total: PHP XX.XX"

---

## Interaction States

### State 1: Initial (No Rice Selected)
```
Quantity: 0
Button: "Add" (gray/yellow border)
Total: Not shown
```

### State 2: Rice Selected (Not Added)
```
Quantity: 1-10
Button: "Add" (yellow border)
Total: Not shown
```

### State 3: Rice Added
```
Quantity: 1-10
Button: "Added ✓" (yellow background)
Total: "Rice Total: PHP XX.XX" (shown)
```

### State 4: Quantity Changed After Adding
```
Quantity: Changed
Button: Resets to "Add" (gray/yellow border)
Total: Updates but button needs re-confirmation
```

---

## Animation Effects

### Rice Box Hover
```css
transition: all 0.2s ease;
hover: border-color brightens
```

### Rice Image Hover
```css
transition: all 0.2s ease;
hover: scale(1.03) + shadow increases
```

### Quantity Button Hover
```css
transition: background-color 160ms ease;
hover: light yellow background
```

### Add Button Hover (Normal)
```css
transition: all 0.2s ease;
hover: background brightens + translateY(-1px)
```

### Add Button (Added State)
```css
No hover animation
Stays in place
```

---

## Spacing & Layout

### Desktop Layout
```
Rice Box Padding: 16px 18px
Content Gap: 16px
Image: 100x100px (left side)
Controls: Right side, vertical stack
Control Gap: 10px
```

### Mobile Layout
```
Rice Box Padding: 14px
Content: Centered, vertical stack
Image: 80x80px (centered)
Image Margin Bottom: 12px
Controls: Centered, vertical stack
Control Gap: 10px
Quantity Width: 140px max
Button Width: 140px max
```

---

## Typography

### Title
```
Font Family: System UI
Font Size: 0.9rem
Font Weight: 800
Text Transform: Uppercase
Letter Spacing: 0.05em
Color: #ffbe0b
```

### Price Label
```
Font Family: System UI
Font Size: 0.9rem
Font Weight: 600
Color: #c8c8c8
```

### Quantity Number
```
Font Family: System UI
Font Size: 1rem (inherited)
Font Weight: 800
Color: #ffffff
```

### Button Text
```
Font Family: System UI
Font Size: 0.85rem
Font Weight: 800
Text Transform: Uppercase
Letter Spacing: 0.05em
Color: #ffbe0b (normal) / #000000 (added)
```

### Rice Total
```
Font Family: System UI
Font Size: 0.95rem
Font Weight: 900
Color: #ffbe0b
```

---

## Responsive Breakpoints

### Large Desktop (> 1200px)
- Full layout
- Maximum spacing
- Optimal readability

### Desktop (860px - 1200px)
- Standard layout
- Normal spacing
- Horizontal rice box

### Tablet (520px - 860px)
- Adjusted layout
- Reduced spacing
- Horizontal rice box maintained

### Mobile (< 520px)
- Vertical layout
- Compact spacing
- Centered elements
- Stacked controls

---

## Accessibility Features

### ARIA Labels
```html
<button aria-label="Decrease rice">-</button>
<button aria-label="Increase rice">+</button>
```

### Alt Text
```html
<img alt="Rice" src="...">
```

### Keyboard Navigation
- Tab through controls
- Enter to activate buttons
- Arrow keys for quantity (optional)

### Screen Reader
- Announces quantity changes
- Announces button state changes
- Announces price updates

---

## Example Scenarios

### Scenario 1: Single Chicken with Rice
```
Item: Chicken Noy Classic Fried Leg × 1
Price: PHP 25.00

Rice: 2 cups × PHP 15.00 = PHP 30.00

Subtotal: PHP 55.00
Shipping: PHP 0.00
Total: PHP 55.00
```

### Scenario 2: Multiple Chickens with Different Rice
```
Item 1: Chicken × 1 + Rice × 3
Price: PHP 25.00 + PHP 45.00 = PHP 70.00

Item 2: Chicken × 1 + Rice × 1
Price: PHP 25.00 + PHP 15.00 = PHP 40.00

Subtotal: PHP 110.00
Shipping: PHP 0.00
Total: PHP 110.00
```

### Scenario 3: Chicken Without Rice
```
Item: Chicken Noy Classic Fried Leg × 2
Price: PHP 50.00

Rice: 0 cups = PHP 0.00

Subtotal: PHP 50.00
Shipping: PHP 0.00
Total: PHP 50.00
```

---

## Visual Hierarchy

1. **Chicken Item** (Main focus)
   - Large image
   - Bold name
   - Clear price

2. **Rice Addon Box** (Secondary)
   - Slightly smaller
   - Lighter background
   - Clear separation

3. **Controls** (Interactive)
   - Easy to find
   - Clear labels
   - Obvious buttons

4. **Price Display** (Information)
   - Prominent color
   - Clear formatting
   - Easy to read

---

## User Flow Visualization

```
┌─────────────────┐
│  Add Chicken    │
│   to Cart       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Rice Box       │
│  Appears        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Click (+)      │
│  to Add Rice    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Quantity       │
│  Increases      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Click "Add"    │
│  Button         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Button →       │
│  "Added ✓"      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Rice Total     │
│  Displays       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Price          │
│  Updates        │
└─────────────────┘
```

---

## Comparison: Before vs After

### Before (No Rice Option)
```
Cart Item: Chicken (₱25)
Total: ₱25
Options: None
```

### After (With Rice Option)
```
Cart Item: Chicken (₱25)
Rice Addon: 2 cups (₱30)
Total: ₱55
Options: Customizable rice quantity
```

---

## Key Visual Elements

1. **Separation** - Clear visual separation between chicken and rice
2. **Hierarchy** - Chicken is primary, rice is secondary
3. **Consistency** - Matches overall cart design
4. **Clarity** - Easy to understand and use
5. **Feedback** - Clear visual feedback on interactions
6. **Responsiveness** - Adapts to all screen sizes

---

**Visual Design Status: ✅ COMPLETE**
**User Experience: ✅ OPTIMIZED**
**Accessibility: ✅ COMPLIANT**

---

🍚 **Enjoy your rice with Chicken Noy!** 🍗
