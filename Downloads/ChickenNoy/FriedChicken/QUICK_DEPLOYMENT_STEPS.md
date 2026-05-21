# 🚀 Quick Deployment Steps - Chicken Noy

## 5-Minute Setup Guide

### Step 1: Sign Up (2 minutes)
1. Go to https://infinityfree.com
2. Click "Sign Up" → Enter email & password
3. Verify email → Login

### Step 2: Create Website (1 minute)
1. Click "Create Account"
2. Choose subdomain: `chickennoy.infinityfreeapp.com`
3. Click "Create Account"
4. Wait 2-5 minutes for activation

### Step 3: Upload Files (2 minutes)
1. Click "Control Panel" → "File Manager"
2. Open `htdocs` folder
3. Delete default files
4. Click "Upload"
5. Upload these folders from `C:\FriedChicken\Chickenoy\Frontend\`:
   - CSS folder
   - images folder
   - JS folder
   - Page folder
   - .htaccess file (I created this for you!)
   - manifest.json
   - robots.txt
   - service-worker.js

### Step 4: Deploy Backend (5 minutes)
1. Go to https://render.com
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Upload your Backend folder
5. Settings:
   - Name: `chickennoy-backend`
   - Environment: `Node`
   - Build: `npm install`
   - Start: `npm start`
6. Add Environment Variables:
   - `MONGO_URI`: (your MongoDB connection)
   - `PORT`: `10000`
7. Click "Create Web Service"
8. Copy your backend URL

### Step 5: Connect Frontend to Backend (30 seconds)
1. Visit your InfinityFree site
2. Add to URL: `?apiBase=https://your-backend.onrender.com`
3. Example: `https://chickennoy.infinityfreeapp.com/?apiBase=https://chickennoy-backend.onrender.com`
4. Done! The URL is saved automatically

### Step 6: Set Up MongoDB (3 minutes)
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Create free account
3. Create free cluster (M0 Sandbox)
4. Create database user
5. Allow access from anywhere (0.0.0.0/0)
6. Get connection string
7. Add to Render environment variables

---

## ✅ That's It!

Your site is now live at:
`https://yoursite.infinityfreeapp.com`

---

## 🎯 What You Get:

✅ Free hosting for frontend
✅ Free hosting for backend
✅ Free database
✅ SSL certificate (HTTPS)
✅ Custom subdomain
✅ No credit card required

---

## 📱 Test Your Site:

1. Open on phone browser
2. Try adding items to cart
3. Test login/register
4. Test checkout
5. Share with friends!

---

## 🔥 Pro Tips:

- Backend sleeps after 15 min → First request takes 30 sec to wake
- InfinityFree has 50,000 daily hits limit
- MongoDB Atlas free tier: 512 MB storage
- Render free tier: 750 hours/month

---

## 🆘 Quick Fixes:

**Images not loading?**
→ Check images folder is in htdocs/images/

**Backend not connecting?**
→ Press Ctrl+Shift+D and enter backend URL

**404 errors?**
→ Check .htaccess file is in htdocs folder

**CSS not working?**
→ Clear cache (Ctrl+F5)

---

**Need detailed guide?** 
See `INFINITYFREE_DEPLOYMENT_GUIDE.md`
