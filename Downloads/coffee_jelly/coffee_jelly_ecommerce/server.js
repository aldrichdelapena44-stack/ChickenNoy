const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const DB_FILE = "database.json";

// CREATE DATABASE IF NOT EXIST
if (!fs.existsSync(DB_FILE)) {

    fs.writeFileSync(DB_FILE, JSON.stringify({
        users: [],
        orders: [],
        messages: [],
        cart: []
    }, null, 2));

}

// READ DATABASE
function readDB() {

    const data = fs.readFileSync(DB_FILE);

    return JSON.parse(data);

}

// WRITE DATABASE
function writeDB(data) {

    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

}

// REGISTER
app.post("/register", (req, res) => {

    const { name, email, password } = req.body;

    const db = readDB();

    const existingUser = db.users.find(
        user => user.email === email
    );

    if (existingUser) {

        return res.json({
            success: false,
            message: "Email already exists"
        });

    }

    const newUser = {
        id: Date.now(),
        name,
        email,
        password
    };

    db.users.push(newUser);

    writeDB(db);

    res.json({
        success: true,
        message: "Registration successful"
    });

});

// LOGIN
app.post("/login", (req, res) => {

    const { email, password } = req.body;

    const db = readDB();

    const user = db.users.find(
        user => user.email === email &&
        user.password === password
    );

    if (!user) {

        return res.json({
            success: false,
            message: "Invalid email or password"
        });

    }

    res.json({
        success: true,
        user
    });

});

// ADD TO CART
app.post("/add-to-cart", (req, res) => {

    try {

        const db = readDB();

        const newItem = {
            customerName: req.body.customerName,
            location: req.body.location,
            productName: req.body.productName,
            price: req.body.price,
            quantity: req.body.quantity
        };

        db.cart.push(newItem);

        writeDB(db);

        console.log("Cart saved:", newItem);

        res.json({
            success: true
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false
        });

    }

});
// GET CART
app.get("/cart", (req, res) => {

    try {

        const db = readDB();

        if (!db.cart) {
            db.cart = [];
        }

        res.json(db.cart);

    } catch (error) {

        console.log(error);

        res.status(500).json([]);

    }

});

// TEST ROUTE
app.get("/", (req, res) => {

    res.send("Backend server is running!");

});

// START SERVER
app.listen(PORT, () => {

    console.log("Server running on http://localhost:5000");

});