# Chicken Noy — Frontend (Page)

Quick instructions to run the static frontend locally for development.

Prerequisites
- Node.js (v14+)

Start locally
1. Open a terminal in this folder (`C:\FriedChicken\Frontend\Page`).
2. Install dependencies:

```bash
npm install
```

3. Start the static server:

```bash
npm start
```

This runs a local static server at `http://localhost:5000` serving this folder.

Backend API
- Ensure your backend server is running (example: `http://localhost:5000`) so API endpoints under `/api/*` are reachable.

Quickly point the frontend to a different API base
- URL param (one-time): append `?apiBase=http://HOST:PORT` to any page URL (it will persist to localStorage).
- Shortcut (persistent): open any page and press `Ctrl+Shift+D` to paste a base URL (e.g. `http://localhost:5000`). The page will reload.
- Console: `localStorage.setItem('chickenoyApiBase','http://localhost:5000') && location.reload()`

Notes
- Service worker registration is skipped on insecure origins (e.g. `file://`) to avoid the origin error. Serve the site from `http://localhost:5000` for full PWA behavior.
- Admin login uses the `/api/admin/login` endpoint when username/email indicates an admin (e.g., `chickenoy` or `admin`).

If you want, I can run `npm install` here now — tell me to proceed and I'll run it in the terminal (requires network access).