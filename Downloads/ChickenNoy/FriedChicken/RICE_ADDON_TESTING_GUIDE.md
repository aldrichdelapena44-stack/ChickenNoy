# Rice Addon Feature - Testing Guide

## Quick Test Steps

### 1. **Add ₱25 Chicken to Cart**
1. Go to Menu page
2. Find "Chicken Noy Classic Fried Leg" (₱25)
3. Click "Add to Cart"
4. Go to Cart page

**Expected Result:**
- Chicken item appears in cart
- Rice addon box appears below the chicken item
- Rice box shows:
  - Title: "Add Rice (Optional)"
  - Rice image (emoji fallback if no real image)
  - Price: "PHP 15.00 per cup"
  - Quantity controls: [-] 0 [+]
  - "Add" button

---

### 2. **Test Quantity Controls**
1. Click the (+) button multiple times
2. Watch the quantity increase (0 → 1 → 2 → 3...)
3. Click the (-) button
4. Watch the quantity decrease

**Expected Result:**
- Quantity increases/decreases smoothly
- Cannot go below 0
- Cannot go above 10
- "Add" button stays as "Add" (not "Added")

---

### 3. **Test Add Button**
1. Set rice quantity to 2
2. Click "Add" button

**Expected Result:**
- Button changes to "Added ✓"
- Button background turns yellow
- "Rice Total: PHP 30.00" appears below controls
- Subtotal updates to include rice cost
- Total price updates correctly

**Price Calculation:**
```
Chicken: ₱25 × 1 = ₱25
Rice: ₱15 × 2 = ₱30
Subtotal: ₱55
```

---

### 4. **Test Quantity Change After Adding**
1. After clicking "Add", change the rice quantity
2. Click (+) or (-) button

**Expected Result:**
- Button changes back to "Add" (from "Added ✓")
- Rice total updates
- Subtotal updates
- Need to click "Add" again to confirm

---

### 5. **Test Zero Quantity Add**
1. Set rice quantity to 0
2. Click "Add" button

**Expected Result:**
- Alert appears: "Please select rice quantity first!"
- Button stays as "Add"
- No changes to price

---

### 6. **Test Multiple Chicken Items**
1. Add 2 or more ₱25 chicken items to cart
2. Each should have its own rice addon box

**Expected Result:**
- Each chicken item has separate rice addon
- Rice quantities are independent
- Each can be added separately
- Prices calculate correctly for each

---

### 7. **Test Other Products**
1. Add ₱320, ₱500, or ₱1000 items to cart
2. Check if rice addon appears

**Expected Result:**
- Rice addon ONLY appears for ₱25 chicken
- Other products do NOT have rice addon
- No errors in console

---

### 8. **Test Mobile View**
1. Resize browser to mobile width (< 520px)
2. Or use browser DevTools mobile emulator

**Expected Result:**
- Rice box becomes vertical layout
- Image centered (80x80px)
- Controls stacked vertically
- Quantity selector centered (140px wide)
- Add button centered (140px wide)
- Everything readable and clickable

---

### 9. **Test Desktop View**
1. View on desktop (> 860px)

**Expected Result:**
- Rice box horizontal layout
- Image on left (100x100px)
- Controls on right
- Everything aligned properly
- Looks professional

---

### 10. **Test Price Calculation**
Test these scenarios:

**Scenario A:**
- 1 chicken (₱25) + 1 rice (₱15) = ₱40

**Scenario B:**
- 2 chickens (₱50) + 3 rice on first (₱45) + 2 rice on second (₱30) = ₱125

**Scenario C:**
- 1 chicken (₱25) + 0 rice (₱0) = ₱25

**Expected Result:**
- All calculations correct
- Subtotal matches manual calculation
- Total includes shipping if applicable

---

## Visual Checks

### Rice Box Appearance:
- ✅ Yellow border (rgba(255, 190, 11, 0.25))
- ✅ Light yellow background (rgba(255, 190, 11, 0.04))
- ✅ Rounded corners (10px)
- ✅ Proper spacing and padding
- ✅ Hover effect (border brightens)

### Rice Image:
- ✅ 100x100px on desktop
- ✅ 80x80px on mobile
- ✅ Yellow border (2px solid)
- ✅ Rounded corners (12px)
- ✅ Shadow effect
- ✅ Hover scale effect (1.03)

### Quantity Controls:
- ✅ Same style as main cart quantity
- ✅ Yellow buttons
- ✅ Hover effect
- ✅ Proper alignment

### Add Button:
- ✅ Normal state: transparent with yellow border
- ✅ Added state: yellow gradient background
- ✅ Text changes: "Add" → "Added ✓"
- ✅ Hover effect (except when added)

---

## Browser Testing

Test on:
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile Chrome
- ✅ Mobile Safari

---

## Common Issues to Check

### Issue 1: Rice box not appearing
**Check:**
- Is the item price exactly 25?
- Check browser console for errors
- Verify cart.js loaded correctly

### Issue 2: Button not changing to "Added"
**Check:**
- Did you click "Add" button?
- Is quantity > 0?
- Check browser console for errors

### Issue 3: Price not updating
**Check:**
- Did you click "Add" button?
- Check subtotal calculation in console
- Verify localStorage is working

### Issue 4: Image not showing
**Check:**
- rice-cup.png exists in images folder?
- Fallback SVG should show rice emoji (🍚)
- Check browser console for 404 errors

### Issue 5: Mobile layout broken
**Check:**
- Resize browser to < 520px
- Check CSS media queries loaded
- Verify responsive styles applied

---

## Performance Checks

- ✅ No console errors
- ✅ No console warnings
- ✅ Page loads quickly
- ✅ Smooth animations
- ✅ No layout shifts
- ✅ localStorage updates correctly

---

## Accessibility Checks

- ✅ Buttons have aria-labels
- ✅ Images have alt text
- ✅ Keyboard navigation works
- ✅ Screen reader friendly
- ✅ Proper contrast ratios

---

## Final Verification

Before marking as complete, verify:

1. ✅ Feature works on desktop
2. ✅ Feature works on mobile
3. ✅ Feature works on tablet
4. ✅ All prices calculate correctly
5. ✅ No console errors
6. ✅ Responsive design works
7. ✅ Add button changes state
8. ✅ Only shows for ₱25 chicken
9. ✅ User experience is smooth
10. ✅ Code is clean and documented

---

## Next Steps After Testing

### If Everything Works:
1. ✅ Mark feature as complete
2. ✅ Add real rice image (optional)
3. ✅ Update backend to handle rice addon
4. ✅ Test checkout with rice addon
5. ✅ Update order display to show rice

### If Issues Found:
1. Document the issue
2. Check browser console
3. Review code changes
4. Fix and retest
5. Verify fix works

---

## Support

If you encounter any issues:
1. Check browser console for errors
2. Verify all files were updated correctly
3. Clear browser cache and reload
4. Test in incognito/private mode
5. Check localStorage data

---

**Happy Testing! 🍗🍚**
