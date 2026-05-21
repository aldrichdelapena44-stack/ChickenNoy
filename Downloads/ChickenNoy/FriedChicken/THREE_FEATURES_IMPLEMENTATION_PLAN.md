# Three Features Implementation Plan

## Feature 1: Auto-fill Contact Form for Logged-in Users ✅

### Goal
When a registered user logs in and visits the "Send a Message" section, automatically populate:
- Full name
- Phone number  
- Email address

### Benefits
- Prevents duplicate customer entries
- Faster message sending
- Better customer tracking

### Implementation
**File:** `Chickenoy/Frontend/Page/contact.html`

**Steps:**
1. Check if user is logged in (token exists)
2. Get user data from localStorage
3. Auto-fill form fields on page load
4. Make fields read-only for logged-in users
5. Show indicator that fields are auto-filled

**Code Location:** Contact form initialization

---

## Feature 2: Improve Photo Alignment in Messages ✅

### Goal
Make photo attachments in message bubbles visually appealing, simple, and readable

### Current Issues
- Photos may not be properly centered
- Inconsistent spacing
- Not visually appealing

### Improvements
1. Center photos within message bubbles
2. Add proper padding/margins
3. Consistent border styling
4. Better responsive sizing
5. Smooth hover effects

### Implementation
**File:** `Chickenoy/Frontend/CSS/style.css`

**Changes:**
- Update `.message-photo-attachment` styles
- Center alignment
- Better spacing
- Rounded corners
- Shadow effects
- Responsive sizing

---

## Feature 3: Add Rice Option to ₱25 Chicken ✅

### Goal
Allow customers to add rice (₱15 per cup) to the ₱25 Chicken Noy Classic Fried Leg

### Requirements
1. **Only for ₱25 chicken** - Not for other products ✅
2. **Separate box** - Rice option in its own container ✅
3. **Quantity controls** - (+) and (-) buttons ✅
4. **Add button** - Changes to "Added" after clicking ✅
5. **Price update** - Total updates when rice added ✅
6. **Realistic rice image** - Professional food photo (SVG fallback implemented) ✅
7. **No remove button** - Only "Add" button for rice ✅

### Features
- Rice: ₱15 per cup ✅
- Quantity selector (0, 1, 2, 3...) ✅
- Add button → "Added" confirmation ✅
- Price calculation: ₱25 + (rice qty × ₱15) ✅
- Separate from main cart item ✅
- Responsive design ✅

### Implementation Status: COMPLETED ✅

### Implementation
**Files:**
- `Chickenoy/Frontend/JS/cart.js` - Cart logic
- `Chickenoy/Frontend/CSS/style.css` - Rice box styling
- Rice image - Create/add realistic rice photo

**Cart Structure:**
```javascript
{
  mainItem: {
    name: "Chicken Noy Classic Fried Leg",
    price: 25,
    quantity: 1
  },
  riceAddon: {
    quantity: 0,  // 0 to 10
    pricePerCup: 15,
    added: false  // true after clicking "Add"
  }
}
```

**Visual Layout:**
```
┌─────────────────────────────────────────┐
│ Chicken Noy Classic Fried Leg          │
│ [Image]                                 │
│ PHP 25.00 each                          │
│ [-] 1 [+]  PHP 25.00  [Remove]         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Add Rice (Optional)                     │
│ [Rice Image]                            │
│ PHP 15.00 per cup                       │
│ [-] 0 [+]  [Add]                        │
└─────────────────────────────────────────┘
```

**After Adding:**
```
┌─────────────────────────────────────────┐
│ Chicken Noy Classic Fried Leg          │
│ [Image]                                 │
│ PHP 25.00 each                          │
│ [-] 1 [+]  PHP 25.00  [Remove]         │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Add Rice (Optional)                     │
│ [Rice Image]                            │
│ PHP 15.00 per cup                       │
│ [-] 2 [+]  [Added] ✓                   │
│ Rice Total: PHP 30.00                   │
└─────────────────────────────────────────┘

Total: PHP 55.00 (25 + 30)
```

---

## Implementation Order

1. **Feature 1** - Auto-fill contact form (Easiest)
2. **Feature 2** - Photo alignment (Medium)
3. **Feature 3** - Rice addon (Most complex)

---

## Testing Checklist

### Feature 1: Auto-fill
- [ ] Form auto-fills for logged-in users
- [ ] Fields are read-only when auto-filled
- [ ] Works on desktop
- [ ] Works on mobile
- [ ] No auto-fill for non-logged-in users

### Feature 2: Photo Alignment
- [ ] Photos centered in bubbles
- [ ] Proper spacing
- [ ] Looks good on desktop
- [ ] Looks good on mobile
- [ ] Hover effects work

### Feature 3: Rice Addon
- [x] Only shows for ₱25 chicken
- [x] Quantity controls work
- [x] Add button changes to "Added"
- [x] Price updates correctly
- [x] Separate box styling
- [x] Responsive on all devices
- [x] Rice image with fallback (SVG placeholder until real image added)

---

## Files to Modify

1. `Chickenoy/Frontend/Page/contact.html` - Auto-fill form
2. `Chickenoy/Frontend/CSS/style.css` - Photo alignment + Rice styling
3. `Chickenoy/Frontend/JS/cart.js` - Rice addon logic
4. Add rice image to `Chickenoy/Frontend/images/`

---

## Estimated Completion

- Feature 1: 10 minutes
- Feature 2: 15 minutes
- Feature 3: 45 minutes
- **Total: ~70 minutes**

---

Ready to implement! 🚀
