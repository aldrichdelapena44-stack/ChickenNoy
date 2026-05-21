<!-- NAVIGATION TEST AND SETUP GUIDE -->

Complete Navigation Flow Test
================================

✅ Pages Accessible (HTTP 200):
1. http://localhost:5000/menu.html - WORKING
2. http://localhost:5000/cart.html - WORKING  
3. http://localhost:5000/checkout.html - WORKING
4. http://localhost:5000/gcash-payment.html - WORKING
5. http://localhost:5000/dashboard.html - WORKING

COMPLETE NAVIGATION FLOW:
========================

Step 1: Menu (Home Page)
- URL: http://localhost:5000/menu.html
- Contains: List of fried chicken items
- Button: "Add to Cart" → Saves to localStorage
- Navigation: Menu → Cart link in navbar

Step 2: Shopping Cart  
- URL: http://localhost:5000/cart.html
- Contains: Items added from menu
- Shows: Item count, prices, total
- Button: "Proceed to Checkout" → Navigate to checkout.html
- Features: 
  * Increment/Decrement quantity
  * Remove items
  * Real-time total calculation

Step 3: Checkout
- URL: http://localhost:5000/checkout.html
- Form Fields:
  1. Full Name (required)
  2. Phone Number (required)
  3. Delivery Address (required)
  4. Payment Method (COD or GCASH)
- Order Summary: Shows all items with total
- Button: "Place Order" 
  * Validates form
  * Creates order in MongoDB
  * Routes based on payment method:
    - COD → Shows success message → Dashboard
    - GCASH → Redirects to gcash-payment.html

Step 4: GCash Payment (if GCASH selected)
- URL: http://localhost:5000/gcash-payment.html
- Features:
  * QR Code for payment
  * Step-by-step instructions
  * Confirm button → Dashboard
  * Cancel button → Back to Cart

Step 5: Dashboard
- URL: http://localhost:5000/dashboard.html
- Shows: User's order history
- Contains: All placed orders from MongoDB

TESTING INSTRUCTIONS:
====================

1. Start with Menu:
   - Choose any item
   - Click "Add to Cart"
   - Should see "Added to cart!" alert

2. Go to Cart:
   - Should see item with price and quantity controls
   - Total should calculate correctly
   - Click "Proceed to Checkout"

3. On Checkout:
   - Fill in all required fields
   - For COD: Select "Cash on Delivery"
   - For GCASH: Select "GCash"
   - Click "Place Order"

4. If GCASH selected:
   - Lands on gcash-payment.html
   - Shows payment instructions
   - Shows QR code image
   - Click "Confirm Payment" after paying
   - Redirects to dashboard

5. Dashboard:
   - Shows all user orders
   - Displays order status
