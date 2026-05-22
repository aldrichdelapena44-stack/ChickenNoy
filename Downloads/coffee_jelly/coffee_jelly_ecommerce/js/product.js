// Products data
const products = [
    { id: 1, name: 'Classic Coffee Jelly', price: 89, description: 'Original coffee jelly with condensed milk', image: '../src/imports/c6c1c7a8-3c1c-4496-a61e-1009ef77254e.jpg' },
    { id: 2, name: 'Creamy Coffee Jelly', price: 99, description: 'Extra creamy with double condensed milk', image: '../src/imports/c6c1c7a8-3c1c-4496-a61e-1009ef77254e.jpg' },
    { id: 3, name: 'Signature Coffee Jelly', price: 109, description: 'Premium blend with special toppings', image: '../src/imports/c6c1c7a8-3c1c-4496-a61e-1009ef77254e.jpg' },
    { id: 4, name: 'Coffee Jelly Float', price: 119, description: 'Coffee jelly with ice cream float', image: '../src/imports/c6c1c7a8-3c1c-4496-a61e-1009ef77254e.jpg' },
    { id: 5, name: 'Mocha Coffee Jelly', price: 115, description: 'Rich mocha flavor with chocolate swirls', image: '../src/imports/c6c1c7a8-3c1c-4496-a61e-1009ef77254e.jpg' },
    { id: 6, name: 'Caramel Coffee Jelly', price: 125, description: 'Sweet caramel drizzle over coffee jelly', image: '../src/imports/c6c1c7a8-3c1c-4496-a61e-1009ef77254e.jpg' }
];

// Load products
const productsGrid = document.getElementById('productsGrid');
if (productsGrid) {
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">₱${product.price}</span>
                    <button class="btn btn-primary btn-sm" onclick="addToCart(${product.id}, '${product.name}', ${product.price}, '${product.image}')">
                        🛒 Add to Cart
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}
