// Load cart page
function loadCartPage() {
    const cart = getCart();
    const cartItems = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    const emptyCart = document.getElementById('emptyCart');
    const cartContent = document.getElementById('cartContent');
    const totalItemsEl = document.getElementById('totalItems');
    
    if (cart.length === 0) {
        cartContent.style.display = 'none';
        emptyCart.style.display = 'block';
        return;
    }
    
    cartContent.style.display = 'grid';
    emptyCart.style.display = 'none';
    
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => {

    return sum + (Number(item.price) * Number(item.quantity));

}, 0);
    const deliveryFee = 10;
    const total = subtotal + deliveryFee;
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    totalItemsEl.textContent = totalItems;
    
    // Render cart items
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-header">
                    <div>
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">₱${item.price}</div>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">🗑️</button>
                </div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1}); loadCartPage();">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1}); loadCartPage();">+</button>
                    <span class="item-total">₱${item.price * item.quantity}</span>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // Render summary
    cartSummary.innerHTML = `
        <h2>Order Summary</h2>
        <div class="summary-row">
            <span>Subtotal</span>
            <span>₱${subtotal}</span>
        </div>
        <div class="summary-row">
            <span>Delivery Fee</span>
            <span>₱${deliveryFee}</span>
        </div>
        <div class="summary-total">
            <div class="summary-row">
                <span>Total</span>
                <span>₱${total}</span>
            </div>
        </div>
        <button class="btn btn-primary btn-full" onclick="checkout()">Proceed to Checkout</button>
        <button class="btn btn-secondary btn-full" style="margin-top: 10px;" onclick="clearCart()">Clear Cart</button>
    `;
}

function checkout() {
    const cart = getCart();
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }
    
    showNotification('Order placed successfully!', 'success');
    localStorage.removeItem('cart');
    
    setTimeout(() => {
        window.location.reload();
    }, 1500);
}

function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        localStorage.removeItem('cart');
        showNotification('Cart cleared', 'success');
        window.location.reload();
    }
}

// Load cart on page load
if (document.getElementById('cartItems')) {
    loadCartPage();
}
