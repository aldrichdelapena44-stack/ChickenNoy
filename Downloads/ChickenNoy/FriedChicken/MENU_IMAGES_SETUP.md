# Menu Images Setup Guide

## Image Files Required

The following 5 promotional images need to be saved to the `Frontend/images/` folder:

### Image Files:
1. **menu-item-1.png** - Crispy Chicken Bundle (₱500)
   - From: First promotional image (Chicken bucket)

2. **menu-item-2.png** - Chicken & Fries Combo (₱320)
   - From: Second promotional image (Chicken & fries)

3. **menu-item-3.png** - Ultimate Chicken Feast (₱1000)
   - From: Third promotional image (Large bucket with fries)

4. **menu-item-4.png** - Classic Fried Chicken Leg (₱25)
   - From: Fourth promotional image (Single chicken piece)

5. **menu-item-5.png** - Signature Chicken Bucket (₱500)
   - From: Fifth promotional image (Chicken bucket with fries)

## Save Location:
All images should be saved to: `Frontend/images/`

## Next Steps:
1. Save all 5 promotional images to the `Frontend/images/` folder with the names listed above
2. Run the seed command to populate the database:
   ```
   cd Backend
   node seed-menu.js
   ```
3. Restart the backend server
4. The menu will now display with all 5 images perfectly

## Note:
The menu.js file will automatically display the images from these local paths in the 5 vertical rectangular boxes on the menu page.
