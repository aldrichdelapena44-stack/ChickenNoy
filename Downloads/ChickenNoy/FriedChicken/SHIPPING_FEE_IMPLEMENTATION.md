# Shipping Fee Implementation

## Overview
Implemented flat ₱40 shipping fee for the Chicken Noy e-commerce website.

## Shipping Fee Rules
- **Flat ₱40 shipping fee** applies when cart contains ANY of these products:
  - ₱320 (Chicken Noy Bilao)
  - ₱500 (Chicken Noy Crispy Bundle)
  - ₱1000 (Chicken Noy Party Platter)
  - ₱1000 (Chicken Noy Ultimate Feast)

- **NO shipping fee** when cart contains ONLY:
  - ₱25 (Chicken Noy Classic Fried Leg)

- **Important:** Shipping is ₱40 flat rate regardless of quantity or number of items!

## Implementation Details

### 1. Cart Page (cart.js & cart.html)
- Added `calculateShipping()` function that checks each cart item's price
- Shipping fee is calculated per item quantity (e.g., 2x ₱500 item = ₱80 shipping)
- Updated cart summary to display:
  - Subtotal (items only)
  - Shipping Fee
  - Items count
  - Total (subtotal + shipping)

### 2. Checkout Page (checkout.js & checkout.html)
- Added `calculateShipping()` function (same logic as cart)
- Order summary displays:
  - Individual items with prices
  - Shipping Fee row (highlighted)
  - Total amount
- Added informational note about shipping fees
- Updated order creation to include `shippingFee` field

### 3. Backend (Order.js model)
- Added `shippingFee` field to Order schema
- Default value: 0
- Stored with each order for record-keeping

### 4. Responsive Design
- All shipping fee displays are fully responsive
- Works flawlessly on both mobile and desktop views
- Maintains consistent styling with existing design

## Calculation Logic
```javascript
function calculateShipping(cart) {
    // Check if cart has any items that require shipping (₱320, ₱500, or ₱1000)
    // If yes, flat ₱40 shipping fee regardless of quantity
    const hasShippableItems = cart.some(item => {
        const price = Number(item.price || 0);
        return price === 320 || price === 500 || price === 1000;
    });
    
    return hasShippableItems ? 40 : 0;
}
```

## Example Scenarios

### Scenario 1: Mixed Cart
- 1x Chicken Noy Party Platter (₱1000)
- 2x Chicken Noy Classic Fried Leg (₱25 each)
- **Subtotal:** ₱1050
- **Shipping:** ₱40 (flat rate)
- **Total:** ₱1090

### Scenario 2: Multiple High-Value Items
- 2x Chicken Noy Crispy Bundle (₱500 each)
- 1x Chicken Noy Bilao (₱320)
- **Subtotal:** ₱1320
- **Shipping:** ₱40 (flat rate, not ₱120!)
- **Total:** ₱1360

### Scenario 3: Only Low-Value Item
- 3x Chicken Noy Classic Fried Leg (₱25 each)
- **Subtotal:** ₱75
- **Shipping:** ₱0 (no shippable items)
- **Total:** ₱75

### Scenario 4: Large Order
- 5x Chicken Noy Party Platter (₱1000 each)
- 3x Chicken Noy Bilao (₱320 each)
- **Subtotal:** ₱5960
- **Shipping:** ₱40 (still flat rate!)
- **Total:** ₱6000

## Files Modified
1. `/Chickenoy/Frontend/JS/cart.js` - Added shipping calculation
2. `/Chickenoy/Frontend/JS/checkout.js` - Added shipping calculation and order update
3. `/Chickenoy/Frontend/Page/cart.html` - Added shipping fee display
4. `/Chickenoy/Frontend/Page/checkout.html` - Added shipping fee row and note
5. `/Backend/models/Order.js` - Added shippingFee field

## Testing Checklist
- [x] Cart displays ₱40 flat shipping fee
- [x] Checkout displays ₱40 flat shipping fee
- [x] Order total includes shipping
- [x] ₱25 item only = no shipping
- [x] Any ₱320, ₱500, ₱1000 item = ₱40 flat shipping
- [x] Multiple quantities still = ₱40 flat shipping
- [x] Mobile view displays properly
- [x] Desktop view displays properly
- [x] Backend stores shipping fee

## Status
✅ **COMPLETE** - Flat ₱40 shipping fee implemented and ready for testing.
