# Chickenoy deployment guide

This project is now prepared for this hosting setup:

- GitHub: source code repository
- Render: Node.js/Express backend API
- Vercel: static frontend
- MongoDB Atlas: cloud database

Important: the current backend uses MongoDB/Mongoose. Use MongoDB Atlas as the database unless you rewrite the backend for Supabase/Postgres.

## 1. Push to GitHub

```bash
git init
git add .
git commit -m "Prepare Chickenoy for deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## 2. Create MongoDB Atlas database

1. Create a MongoDB Atlas cluster.
2. Create a database user.
3. In Network Access, allow `0.0.0.0/0`.
4. Copy your connection string.

Example:

```txt
mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/Chickenoy?retryWrites=true&w=majority
```

## 3. Deploy backend to Render

Render settings:

```txt
Root Directory: Backend
Build Command: npm install
Start Command: npm start
```

Environment variables on Render:

```env
NODE_ENV=production
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/Chickenoy?retryWrites=true&w=majority
JWT_SECRET=make_a_long_random_secret
FRONTEND_URLS=https://YOUR_VERCEL_PROJECT.vercel.app
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
```

After deploy, test:

```txt
https://YOUR_RENDER_SERVICE.onrender.com/api/health
```

You should see:

```json
{ "status": "ok", "service": "chickenoy-backend" }
```

## 4. Connect frontend to backend

Open this file:

```txt
Chickenoy/Frontend/JS/deployment-config.js
```

Set your Render backend URL:

```js
window.CHICKENOY_CONFIG = {
  API_BASE: "https://YOUR_RENDER_SERVICE.onrender.com"
};
```

Commit and push the change.

## 5. Deploy frontend to Vercel

Vercel settings:

```txt
Framework Preset: Other
Root Directory: Chickenoy/Frontend
Build Command: leave empty
Output Directory: .
Install Command: leave empty
```

The frontend has a `vercel.json` file that maps clean URLs like `/menu`, `/cart`, `/admin`, and `/checkout` to the correct HTML files.

## 6. Update Render CORS after Vercel deploy

After Vercel gives your real URL, go back to Render and set:

```env
FRONTEND_URLS=https://YOUR_VERCEL_PROJECT.vercel.app
```

If you also use a custom domain:

```env
FRONTEND_URLS=https://YOUR_VERCEL_PROJECT.vercel.app,https://YOURDOMAIN.com
```

Redeploy/restart the Render service.

## 7. Local development

Create `Backend/.env` from `Backend/.env.example`, then run:

```bash
cd Backend
npm install
npm run dev
```

Then open:

```txt
http://localhost:5000
```

## 8. Seed menu data if needed

After MongoDB is connected, run locally or in Render shell:

```bash
cd Backend
npm run seed
```

## Files added or updated

- `Backend/.env.example`
- `Backend/package.json`
- `Backend/server.js`
- `Chickenoy/Frontend/JS/deployment-config.js`
- `Chickenoy/Frontend/JS/common.js`
- `Chickenoy/Frontend/vercel.json`
- `render.yaml`
- `.gitignore`
- all HTML pages now load `deployment-config.js`
