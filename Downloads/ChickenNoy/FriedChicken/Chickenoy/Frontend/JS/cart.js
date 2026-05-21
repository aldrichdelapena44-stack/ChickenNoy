let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItemsDiv = document.getElementById("cartItems");
const emptyCartDiv = document.getElementById("emptyCart");
const cartContentDiv = document.getElementById("cartContent");

const productImageByKey = {
    "chicken-noy-party-platter": "../images/menu-item-1.png",
    "chicken-noy-bilao": "../images/menu-item-2.png",
    "chicken-bilao": "../images/menu-item-2.png",
    "chicken-fries-combo": "../images/menu-item-2.png",
    "chicken-and-fries-combo": "../images/menu-item-2.png",
    "chicken-noy-ultimate-feast": "../images/menu-item-3.png",
    "ultimate-chicken-feast": "../images/menu-item-3.png",
    "chicken-noy-classic-fried-leg": "../images/menu-item-4.png",
    "classic-fried-chicken-leg": "../images/menu-item-4.png",
    "chicken-noy-crispy-bundle": "../images/menu-item-5.png",
    "chickenoy-crispy-bundle": "../images/menu-item-5.png",
    "crispy-chicken-bundle": "../images/menu-item-5.png"
};

function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }[char]));
}

function productKey(value) {
    return String(value || "")
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}

function fallbackProductImage(item) {
    const idKey = productKey(item?._id || item?.menuItemId);
    const nameKey = productKey(item?.name);
    return productImageByKey[idKey] || productImageByKey[nameKey] || "";
}

function getCartImageUrl(image) {
    if (!image) return "";

    const normalized = String(image)
        .replace(/\\/g, "/")
        .replace(/^(\.\.\/)+/, "/")
        .replace(/^(\.\/)+/, "");

    if (/^https?:\/\//i.test(normalized) || /^data:/i.test(normalized)) return normalized;
    if (normalized.startsWith("/Frontend/images/")) return `..${normalized.replace(/^\/Frontend\//, "")}`;
    if (normalized.startsWith("/images/")) return `..${normalized}`;
    if (normalized.startsWith("/")) return normalized;
    if (normalized.startsWith("images/")) return `../${normalized}`;
    if (normalized.startsWith("Frontend/images/")) return `../${normalized.replace(/^Frontend\//, "")}`;

    return normalized;
}

function isLogoImage(image) {
    return !image || /(?:^|\/)logo\.png(?:$|\?)/i.test(String(image));
}

function resolveCartImage(item) {
    const storedImage = getCartImageUrl(item?.image);
    const productImage = getCartImageUrl(fallbackProductImage(item));

    if (storedImage && !isLogoImage(storedImage)) return storedImage;
    if (productImage) return productImage;
    return "../images/logo.png";
}

function normalizeCartShell() {
    const title = document.querySelector(".cart-container h2");
    if (title) title.textContent = "Your Shopping Cart";

    const emptyIcon = emptyCartDiv?.querySelector("div");
    if (emptyIcon) {
        emptyIcon.className = "cart-empty-icon";
        emptyIcon.removeAttribute("style");
        emptyIcon.setAttribute("aria-hidden", "true");
        emptyIcon.textContent = "";
    }

    const emptyText = emptyCartDiv?.querySelector("p");
    if (emptyText) {
        emptyText.removeAttribute("style");
        emptyText.textContent = "Start adding delicious chicken items to your order.";
    }

    const subtotal = document.getElementById("subtotal");
    const total = document.getElementById("totalPrice");
    if (subtotal?.parentElement?.firstChild) subtotal.parentElement.firstChild.textContent = "PHP ";
    if (total?.parentElement?.firstChild) total.parentElement.firstChild.textContent = "PHP ";
}

function calculateShipping(cart) {
    // Check if cart has any items that require shipping (₱320, ₱500, or ₱1000)
    // Flat ₱40 shipping fee regardless of quantity
    const hasShippableItems = cart.some(item => {
        const price = Number(item.price || 0);
        return price === 320 || price === 500 || price === 1000;
    });
    
    return hasShippableItems ? 40 : 0;
}

function loadCart() {
    normalizeCartShell();
    cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        emptyCartDiv.style.display = "grid";
        cartContentDiv.style.display = "none";
        return;
    }

    emptyCartDiv.style.display = "none";
    cartContentDiv.style.display = "grid";

    cartItemsDiv.innerHTML = "";
    let subtotal = 0;
    let itemCount = 0;
    let cartUpdated = false;

    cart.forEach((item, index) => {
        const price = Number(item.price || 0);
        const quantity = Number(item.quantity || 1);
        const itemTotal = price * quantity;
        
        // Initialize rice addon if not present for ₱25 chicken
        if (price === 25 && !item.riceAddon) {
            item.riceAddon = {
                quantity: 0,
                pricePerCup: 15,
                added: false
            };
            cartUpdated = true;
        }
        
        // Calculate rice total
        let riceTotal = 0;
        if (item.riceAddon && item.riceAddon.quantity > 0) {
            riceTotal = item.riceAddon.quantity * item.riceAddon.pricePerCup;
        }
        
        const totalWithRice = itemTotal + riceTotal;
        subtotal += totalWithRice;
        itemCount += quantity;

        const itemName = escapeHtml(item.name || "Menu item");
        const resolvedImage = resolveCartImage(item);
        const fallbackImage = getCartImageUrl(fallbackProductImage(item)) || "../images/logo.png";

        if (!isLogoImage(resolvedImage) && item.image !== resolvedImage) {
            item.image = resolvedImage;
            cartUpdated = true;
        }

        cartItemsDiv.insertAdjacentHTML("beforeend", `
            <div class="cart-item">
                <img class="item-image" src="${escapeHtml(resolvedImage)}" alt="${itemName}" onerror="this.onerror=null; this.src='${escapeHtml(fallbackImage)}'">
                <div class="item-details">
                    <div class="item-name">${itemName}</div>
                    <div class="item-price">PHP ${price.toFixed(2)} each</div>
                </div>
                <div class="item-quantity" aria-label="Quantity controls for ${itemName}">
                    <button type="button" aria-label="Decrease ${itemName}" onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${quantity}</span>
                    <button type="button" aria-label="Increase ${itemName}" onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <div class="item-total">PHP ${itemTotal.toFixed(2)}</div>
                <button type="button" class="item-remove" onclick="removeItem(${index})">Remove</button>
            </div>
            ${price === 25 ? renderRiceAddon(item, index, riceTotal) : ''}
        `);
    });

    if (cartUpdated) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    const shippingFee = calculateShipping(cart);
    const total = subtotal + shippingFee;

    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("totalPrice").textContent = total.toFixed(2);
    document.getElementById("itemCount").textContent = itemCount;
    
    // Update shipping display
    const shippingElement = document.getElementById("shippingFee");
    if (shippingElement) {
        shippingElement.textContent = shippingFee.toFixed(2);
    }
}

function updateQuantity(index, change) {
    if (!cart[index]) return;

    if (Number(cart[index].quantity || 1) + change < 1) {
        removeItem(index);
        return;
    }

    cart[index].quantity = Number(cart[index].quantity || 1) + change;
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function removeItem(index) {
    if (!cart[index]) return;

    const itemName = cart[index].name || "this item";
    if (confirm(`Remove "${itemName}" from cart?`)) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    }
}

function checkout() {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first to proceed with checkout.");
        window.location = "login.html";
        return;
    }

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    window.location = "checkout.html";
}

function addToCart(item) {
    const existingItem = cart.find(p => p._id === item._id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        item.quantity = 1;
        cart.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
}

function renderRiceAddon(item, itemIndex, riceTotal) {
    const riceAddon = item.riceAddon || { quantity: 0, pricePerCup: 15, added: false };
    const riceQuantity = riceAddon.quantity || 0;
    const isAdded = riceAddon.added || false;
    const buttonText = isAdded ? "Added ✓" : "Add";
    const buttonClass = isAdded ? "rice-add-btn added" : "rice-add-btn";
    
    // Use SVG placeholder file as fallback
    const riceFallback = "../images/rice-placeholder.svg";
    // Add cache buster to force reload of rice image
    const cacheBuster = "?v=" + Date.now();
    
    return `
        <div class="rice-addon-box">
            <div class="rice-addon-header">
                <span class="rice-addon-title">Add Rice (Optional)</span>
            </div>
            <div class="rice-addon-content">
                <img class="rice-image" src="../images/rice-cup.png${cacheBuster}" alt="Rice Cup" onerror="this.onerror=null; this.src='${riceFallback}'">
                <div class="rice-details">
                    <div class="rice-price-label">PHP ${riceAddon.pricePerCup.toFixed(2)} per cup</div>
                    <div class="rice-controls">
                        <div class="rice-quantity">
                            <button type="button" aria-label="Decrease rice" onclick="updateRiceQuantity(${itemIndex}, -1)">-</button>
                            <span>${riceQuantity}</span>
                            <button type="button" aria-label="Increase rice" onclick="updateRiceQuantity(${itemIndex}, 1)">+</button>
                        </div>
                        <button type="button" class="${buttonClass}" onclick="addRiceToItem(${itemIndex})">${buttonText}</button>
                    </div>
                    ${riceTotal > 0 ? `<div class="rice-total-display">Rice Total: PHP ${riceTotal.toFixed(2)}</div>` : ''}
                </div>
            </div>
        </div>
    `;
}

function updateRiceQuantity(itemIndex, change) {
    if (!cart[itemIndex] || !cart[itemIndex].riceAddon) return;
    
    const newQuantity = (cart[itemIndex].riceAddon.quantity || 0) + change;
    
    // Limit rice quantity between 0 and 10
    if (newQuantity < 0 || newQuantity > 10) return;
    
    cart[itemIndex].riceAddon.quantity = newQuantity;
    
    // Reset "added" status when quantity changes
    if (change !== 0) {
        cart[itemIndex].riceAddon.added = false;
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function addRiceToItem(itemIndex) {
    if (!cart[itemIndex] || !cart[itemIndex].riceAddon) return;
    
    const riceQuantity = cart[itemIndex].riceAddon.quantity || 0;
    
    if (riceQuantity === 0) {
        alert("Please select rice quantity first!");
        return;
    }
    
    // Mark as added
    cart[itemIndex].riceAddon.added = true;
    
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

window.addEventListener("load", loadCart);
