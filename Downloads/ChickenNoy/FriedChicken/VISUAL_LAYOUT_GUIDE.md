# Visual Layout Guide - Photo Upload Feature

## 📱 Layout Structure

### Message Admin (Customer Messenger)
```
┌─────────────────────────────────────────────────────────────┐
│  Message Admin                                          [×]  │
│  Product photos: use Facebook Business Chat.                │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │ [M] Chicken Noy Admin                           [▼] │   │
│  │     Payment Concern | 5/20/2026, 11:22:28 PM       │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │                                                      │   │
│  │  ┌──────────────────────────────────────────┐      │   │
│  │  │ hi                                        │      │   │
│  │  │ You | 5/20/2026, 11:22:28 PM             │      │   │
│  │  └──────────────────────────────────────────┘      │   │
│  │                                                      │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ [Preview Area - Shows when photo selected]          │   │
│  │ ┌──────────┐                                        │   │
│  │ │  [IMG]   │ [×]                                    │   │
│  │ │          │                                        │   │
│  │ └──────────┘                                        │   │
│  │ filename.png                                        │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ [Write a message...........] [📷] [Send]           │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Customer Messages (Admin Dashboard)
```
┌─────────────────────────────────────────────────────────────┐
│  Customer Messages                                      [×]  │
│  Product photos: use Facebook Business Chat.                │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐   │
│  │ [G] gio                                         [▼] │   │
│  │     Customer Review | 5/17/2026, 9:08:33 PM        │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │                                                      │   │
│  │      ┌──────────────────────────────────────────┐  │   │
│  │      │ hi                                        │  │   │
│  │      │ Admin | 5/16/2026, 11:44:05 PM           │  │   │
│  │      └──────────────────────────────────────────┘  │   │
│  │                                                      │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ [Preview Area - Shows when photo selected]          │   │
│  │ ┌──────────┐                                        │   │
│  │ │  [IMG]   │ [×]                                    │   │
│  │ │          │                                        │   │
│  │ └──────────┘                                        │   │
│  │ filename.png                                        │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ [Reply to gio..............] [📷] [Send]           │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Send a Message (Contact Form)
```
┌─────────────────────────────────────────────────────────────┐
│  Send a Message                                              │
│  Use this form for order questions, delivery instructions... │
├─────────────────────────────────────────────────────────────┤
│  [Full name....................................]             │
│  [Phone number..............................]              │
│  [Email address (optional).................]               │
│  [Order Support ▼]                                          │
│  ┌──────────────────────────────────────────┐              │
│  │ Write your message here                  │              │
│  │                                          │              │
│  │                                          │              │
│  └──────────────────────────────────────────┘              │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │ 📷 Attach Photo (Optional)                         │    │
│  └────────────────────────────────────────────────────┘    │
│                                                              │
│  [Preview Area - Shows when photo selected]                 │
│  ┌──────────┐                                               │
│  │  [IMG]   │ [×]                                           │
│  │          │                                               │
│  └──────────┘                                               │
│  filename.png                                               │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │              Send Message                          │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## 🎨 Color Scheme

### Photo Icon Button
- **Border:** `rgba(255, 190, 11, 0.45)` - Semi-transparent yellow
- **Background:** `transparent`
- **Icon Color:** `#ffdf7b` - Light yellow
- **Hover Background:** `rgba(255, 190, 11, 0.12)` - Very light yellow
- **Hover Border:** `#ffbe0b` - Solid yellow

### Preview Container
- **Border:** `rgba(255, 190, 11, 0.35)` - Semi-transparent yellow
- **Background:** `rgba(0, 0, 0, 0.3)` - Dark semi-transparent
- **Padding:** `10px`
- **Border Radius:** `8px`

### Delete Button
- **Background:** `#ff3b30` - Red
- **Border:** `2px solid #ffffff` - White
- **Color:** `#ffffff` - White
- **Hover Background:** `#ff1f1f` - Darker red
- **Size:** `28x28px`

### Message Bubbles

#### Admin Messages (in Admin Panel)
- **Background:** `linear-gradient(135deg, #ffbe0b, #f2a600)` - Yellow gradient
- **Color:** `#000000` - Black text
- **Alignment:** RIGHT side
- **Max Width:** `85%`

#### Customer Messages (in Admin Panel)
- **Background:** `#252525` - Dark gray
- **Color:** `#ffffff` - White text
- **Alignment:** LEFT side
- **Max Width:** `85%`

#### Admin Messages (in Customer View)
- **Background:** `linear-gradient(135deg, #ffbe0b, #f2a600)` - Yellow gradient
- **Color:** `#000000` - Black text
- **Alignment:** LEFT side
- **Max Width:** `85%`

#### Customer Messages (in Customer View)
- **Background:** `#252525` - Dark gray
- **Color:** `#ffffff` - White text
- **Alignment:** RIGHT side
- **Max Width:** `85%`

## 📐 Dimensions

### Desktop (>768px)
```
Photo Icon Button:    44 x 44 px
Send Button:          70px min-width, 44px height
Input Field:          Flexible (remaining space)
Preview Image:        120 x 120 px max
Message Photo:        280 x 280 px max
Message Bubble:       85% max-width
Gap between items:    8px
Gap between messages: 12px
```

### Tablet (≤768px)
```
Photo Icon Button:    44 x 44 px
Send Button:          60px min-width, 44px height
Input Field:          Flexible (remaining space)
Preview Image:        100 x 100 px max
Message Photo:        220 x 220 px max
Message Bubble:       90% max-width
Gap between items:    6px
Gap between messages: 12px
```

### Mobile (≤480px)
```
Photo Icon Button:    40 x 40 px
Send Button:          60px min-width, 40px height
Input Field:          Flexible (remaining space)
Preview Image:        80 x 80 px max
Message Photo:        180 x 180 px max
Message Bubble:       90% max-width
Gap between items:    6px
Gap between messages: 12px
```

## 🔄 Grid Layout

### Messenger Forms (Admin & Customer)
```css
display: grid;
grid-template-columns: minmax(0, 1fr) auto auto;
gap: 8px;

Column 1: Input field (flexible, min 0)
Column 2: Photo icon (44px fixed)
Column 3: Send button (70px min)
```

### Message Container
```css
display: grid;
gap: 12px;
grid-auto-rows: max-content;

Each message: auto height based on content
No fixed heights to prevent overlap
```

## 📱 Responsive Behavior

### Desktop
- Three-column grid: `[Input] [Photo] [Send]`
- All elements in one row
- Preview below in full width

### Tablet
- Three-column grid maintained
- Slightly smaller buttons
- Tighter gaps (6px)

### Mobile
- Three-column grid maintained
- Smaller buttons (40px)
- Tighter gaps (6px)
- Preview takes full width

## ✨ Interaction States

### Photo Icon Button
1. **Default:** Yellow border, transparent background
2. **Hover:** Light yellow background, solid yellow border, scale 1.05
3. **Active:** Same as hover
4. **Focus:** Yellow border highlight

### Delete Button
1. **Default:** Red background, white border
2. **Hover:** Darker red, scale 1.1
3. **Active:** Same as hover

### Send Button
1. **Default:** Yellow gradient background, black text
2. **Hover:** Lighter yellow gradient, lift effect
3. **Active:** Pressed state
4. **Disabled:** Gray background, no interaction

## 🎯 Touch Targets

All interactive elements meet WCAG 2.1 Level AA requirements:

- **Minimum Size:** 44x44px (desktop/tablet)
- **Mobile Size:** 40x40px (still adequate for touch)
- **Spacing:** 8px minimum between targets
- **Visual Feedback:** Hover/active states clearly visible

## 📊 Message Alignment Rules

### Admin Dashboard View
```
Customer Message (LEFT)
    Admin Reply (RIGHT)
        Customer Message (LEFT)
            Admin Reply (RIGHT)
```

### Customer View
```
    Admin Message (LEFT)
Customer Reply (RIGHT)
    Admin Message (LEFT)
Customer Reply (RIGHT)
```

## 🖼️ Photo Display in Messages

### Photo Attachment Styling
```css
max-width: min(280px, 100%);
max-height: 280px;
border-radius: 10px;
border: 1px solid rgba(255, 190, 11, 0.32);
object-fit: cover;
cursor: pointer;
```

### Photo Interaction
- **Click:** Opens full-size in new tab
- **Hover:** Slight scale (1.02)
- **Mobile:** Touch to open

## 🎨 Visual Hierarchy

1. **Primary Action:** Yellow "Send" button (most prominent)
2. **Secondary Action:** Photo icon button (visible but subtle)
3. **Input Field:** Neutral, takes most space
4. **Preview:** Below form, doesn't interfere with input
5. **Messages:** Clear sender distinction via color and alignment

## ✅ No Overlap Guarantee

### Grid System Prevents Overlap
- Each message is a grid item with `max-content` height
- Messages auto-size based on content
- No absolute positioning
- No floats
- No negative margins
- Proper box-sizing on all elements

### Word Wrapping
```css
word-wrap: break-word;
overflow-wrap: break-word;
word-break: break-word;
```

### Container Constraints
```css
max-width: 85%; /* Messages can't exceed this */
width: fit-content; /* Shrinks to content size */
box-sizing: border-box; /* Includes padding in width */
```

This ensures perfect message arrangement with zero overlaps on all screen sizes!
