require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const compression = require("compression")
const rateLimit = require("express-rate-limit")
const path = require("path")

const authRoutes = require("./routes/authRoutes")
const menuRoutes = require("./routes/menuRoutes")
const orderRoutes = require("./routes/orderRoutes")
const adminRoutes = require("./routes/adminRoutes")
const contactRoutes = require("./routes/contactRoutes")
const reviewRoutes = require("./routes/reviewRoutes")

const app = express()

app.set("trust proxy", 1)

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
})

// Middleware for proper headers on mobile and PWA support
const mobileAndPWAHeaders = (req, res, next) => {
    // Cache control for different file types
    if (req.url.match(/\.(js|css)$/)) {
        // Keep scripts and styles fresh so deployed UI updates appear quickly.
        res.set('Cache-Control', 'public, max-age=0, must-revalidate');
    } else if (req.url.match(/\.(png|jpg|jpeg|gif|ico|svg|webp)$/)) {
        // Cache images for 30 days
        res.set('Cache-Control', 'public, max-age=2592000, immutable');
    } else if (req.url === '/service-worker.js') {
        // Never cache service worker - always check for updates
        res.set('Cache-Control', 'public, max-age=0, must-revalidate');
    } else {
        // Keep HTML fresh so direct customer/admin pages update after deploys.
        res.set('Cache-Control', 'public, max-age=0, must-revalidate');
    }

    // Security headers for mobile and desktop
    res.set('X-Content-Type-Options', 'nosniff');
    res.set('X-Frame-Options', 'SAMEORIGIN');
    res.set('X-XSS-Protection', '1; mode=block');
    res.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Enable GZIP compression
    res.set('Vary', 'Accept-Encoding');
    
    // PWA and Mobile headers
    res.set('X-UA-Compatible', 'IE=edge');
    
    next();
};


const parseAllowedOrigins = () => {
    const raw = process.env.FRONTEND_URLS || process.env.FRONTEND_URL || "";
    return raw
        .split(",")
        .map(origin => origin.trim().replace(/\/$/, ""))
        .filter(Boolean);
};

const allowedOrigins = parseAllowedOrigins();
const isProduction = process.env.NODE_ENV === "production";

app.use(cors({
    origin(origin, callback) {
        // Allow same-origin requests, server-to-server requests, curl/Postman, and local files.
        if (!origin) return callback(null, true);

        const normalizedOrigin = origin.replace(/\/$/, "");
        const isLocalhost = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(normalizedOrigin);
        const isAllowed = allowedOrigins.includes(normalizedOrigin);

        if (!isProduction || isLocalhost || isAllowed) {
            return callback(null, true);
        }

        return callback(new Error(`CORS blocked request from ${origin}. Add it to FRONTEND_URLS.`));
    },
    credentials: true
}))
app.use(compression())
app.use(mobileAndPWAHeaders)
app.use(express.json({ limit: "18mb" }))
// Serve static files. During development prefer no-cache to ensure updated
// JS/CSS files are immediately fetched by browsers. In production this can
// be changed back to a longer maxAge.
const staticOptions = { maxAge: 0, etag: false };
app.use(express.static(path.join(__dirname, '../Chickenoy/Frontend'), staticOptions));

app.use("/api", limiter)

const mongoUri = process.env.MONGO_URI || (isProduction ? "" : "mongodb://127.0.0.1:27017/Chickenoy");

if (!mongoUri) {
    console.error("MONGO_URI is required in production. Add it in Render environment variables.");
    process.exit(1);
}

mongoose.connect(mongoUri)
    .then(() => console.log("MongoDB connected"))
    .catch(err => {
        console.error("MongoDB connection failed:", err.message);
        process.exit(1);
    })

app.use("/api/auth", authRoutes)
app.use("/api/menu", menuRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/contact", contactRoutes)
app.use("/api/reviews", reviewRoutes)

app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "chickenoy-backend" })
})

app.use("/api", (req, res) => {
    res.status(404).json({ error: "API route not found" })
})

app.get(["/", "/index.html"], (req, res) => {
    res.sendFile(path.join(__dirname, '../Chickenoy/Frontend/Page/index.html'))
})

app.get('/menu.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../Chickenoy/Frontend/Page/menu.html'))
})

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../Chickenoy/Frontend/Page/login.html'))
})

app.get(['/register', '/register.html'], (req, res) => {
    res.sendFile(path.join(__dirname, '../Chickenoy/Frontend/Page/register.html'))
})

app.get(['/login', '/login.html'], (req, res) => {
    res.sendFile(path.join(__dirname, '../Chickenoy/Frontend/Page/login.html'))
})

app.get(['/menu', '/menu.html'], (req, res) => {
    res.sendFile(path.join(__dirname, '../Chickenoy/Frontend/Page/menu.html'))
})

app.get(['/dashboard', '/dashboard.html'], (req, res) => {
    res.sendFile(path.join(__dirname, '../Chickenoy/Frontend/Page/dashboard.html'))
})

app.get(['/profile', '/profile.html'], (req, res) => {
    res.sendFile(path.join(__dirname, '../Chickenoy/Frontend/Page/profile.html'))
})

app.get(['/admin', '/admin.html'], (req, res) => {
    res.sendFile(path.join(__dirname, '../Chickenoy/Frontend/Page/admin.html'))
})

app.get(['/contact', '/contact.html'], (req, res) => {
    res.sendFile(path.join(__dirname, '../Chickenoy/Frontend/Page/contact.html'))
})

app.get(['/cart', '/cart.html'], (req, res) => {
    res.sendFile(path.join(__dirname, '../Chickenoy/Frontend/Page/cart.html'))
})

app.get(['/checkout', '/checkout.html'], (req, res) => {
    res.sendFile(path.join(__dirname, '../Chickenoy/Frontend/Page/checkout.html'))
})

app.get(['/gcash-payment', '/gcash-payment.html'], (req, res) => {
    res.sendFile(path.join(__dirname, '../Chickenoy/Frontend/Page/gcash-payment.html'))
})

app.get(['/about', '/about.html'], (req, res) => {
    res.sendFile(path.join(__dirname, '../Chickenoy/Frontend/Page/about.html'))
})

app.get(['/privacy-policy', '/privacy-policy.html'], (req, res) => {
    res.sendFile(path.join(__dirname, '../Chickenoy/Frontend/Page/privacy-policy.html'))
})

app.get(['/terms-conditions', '/terms-conditions.html'], (req, res) => {
    res.sendFile(path.join(__dirname, '../Chickenoy/Frontend/Page/terms-conditions.html'))
})

app.get(['/delivery-information', '/delivery-information.html'], (req, res) => {
    res.sendFile(path.join(__dirname, '../Chickenoy/Frontend/Page/delivery-information.html'))
})

// Fallback to index.html for any other routes (SPA support)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../Chickenoy/Frontend/Page/index.html'))
})

const PORT = Number(process.env.PORT) || 5000;

const server = app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});

server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
        console.error(`❌ Port ${PORT} is already in use!`);
        process.exit(1);
    }
    console.error(err);
    process.exit(1);
});
