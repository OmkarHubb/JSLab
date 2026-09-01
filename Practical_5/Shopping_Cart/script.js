/**
 * Shopping Cart Analyzer - Practical 5
 * Author: Omkar Pant
 * PRN: 25070521515
 */

// Initial product array
let products = [];

// Product emoji icons for visual flair
const productIcons = ["🛒", "📦", "🎁", "🛍️", "✨", "💎", "🎧", "📱", "⌚", "👟", "🎮", "💻"];
const iconColors = [
    "rgba(255,107,107,0.15)",
    "rgba(16,185,129,0.15)",
    "rgba(245,158,11,0.15)",
    "rgba(139,92,246,0.15)",
    "rgba(56,189,248,0.15)",
    "rgba(236,72,153,0.15)"
];


// Update badge and item count
function updateCounts() {
    document.getElementById("cartBadge").textContent = products.length;
    document.getElementById("itemCount").textContent =
        products.length + (products.length === 1 ? " item" : " items");
}


// Display products on the webpage
function displayProducts() {
    const productList = document.getElementById("productList");

    if (products.length === 0) {
        productList.innerHTML = `
            <div class="empty-cart">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.3">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                <p>Your cart is empty</p>
                <span>Add products using the form above</span>
            </div>
        `;
        updateCounts();
        return;
    }

    productList.innerHTML = "";

    products.forEach(function(product, index) {

        const icon = productIcons[index % productIcons.length];
        const bgColor = iconColors[index % iconColors.length];
        const subtotal = product.price * product.qty;

        productList.innerHTML += `
            <div class="product-item">
                <div class="product-icon" style="background:${bgColor}">${icon}</div>
                <div class="product-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-meta">₹${product.price} × ${product.qty}</div>
                </div>
                <div class="product-price-tag">₹${subtotal.toLocaleString()}</div>
                <div class="radio-wrapper">
                    <input type="radio" name="selectedProduct" value="${index}">
                </div>
            </div>
        `;
    });

    updateCounts();
}


// PUSH - Add product at the end
function addProduct() {

    const name = document.getElementById("productName").value;
    const price = Number(document.getElementById("productPrice").value);
    const qty = Number(document.getElementById("productQty").value);

    if (name === "" || price === 0 || qty === 0) {
        alert("Please enter all product details.");
        return;
    }

    products.push({
        name: name,
        price: price,
        qty: qty
    });

    displayProducts();

    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productQty").value = "";
}


// POP - Remove last product
function removeLast() {

    if (products.length === 0) {
        alert("Cart is empty.");
        return;
    }

    const removedProduct = products.pop();

    displayProducts();

    document.getElementById("result").innerHTML =
        `POP removed: <strong>${removedProduct.name}</strong>`;
}


// SHIFT - Remove first product
function removeFirst() {

    if (products.length === 0) {
        alert("Cart is empty.");
        return;
    }

    const removedProduct = products.shift();

    displayProducts();

    document.getElementById("result").innerHTML =
        `SHIFT removed: <strong>${removedProduct.name}</strong>`;
}


// UNSHIFT - Add product at beginning
function addFirst() {

    const name = prompt("Enter product name:");

    if (name === null || name.trim() === "") {
        return;
    }

    const price = Number(prompt("Enter price (₹):"));
    const qty = Number(prompt("Enter quantity:"));

    products.unshift({
        name: name,
        price: price,
        qty: qty
    });

    displayProducts();

    document.getElementById("result").innerHTML =
        `UNSHIFT added <strong>${name}</strong> to the beginning.`;
}


// SPLICE - Remove selected product
function removeProduct() {

    const selected = document.querySelector(
        'input[name="selectedProduct"]:checked'
    );

    if (!selected) {
        alert("Select a product first.");
        return;
    }

    const index = Number(selected.value);

    const removedProduct = products.splice(index, 1);

    displayProducts();

    document.getElementById("result").innerHTML =
        `SPLICE removed: <strong>${removedProduct[0].name}</strong>`;
}


// SLICE - Get first 3 products
function showSlice() {

    const firstThree = products.slice(0, 3);

    document.getElementById("result").innerHTML =
        `<strong>SLICE Result:</strong><br>
        ${firstThree.map(product => product.name).join("<br>")}`;
}


// MAP - Create array containing product names
function showMap() {

    const productNames = products.map(function(product) {
        return product.name;
    });

    document.getElementById("result").innerHTML =
        `<strong>MAP Result:</strong><br>
        ${productNames.join("<br>")}`;
}


// FILTER - Find products priced ₹500 or higher
function showFilter() {

    const expensive = products.filter(function(product) {
        return product.price >= 500;
    });

    document.getElementById("result").innerHTML =
        `<strong>FILTER Result:</strong><br>
        ${expensive.map(product =>
            `${product.name} - ₹${product.price}`
        ).join("<br>")}`;
}


// REDUCE - Calculate total cart price
function showReduce() {

    if (products.length === 0) {
        document.getElementById("result").innerHTML =
            "No products available.";
        return;
    }

    const totalPrice = products.reduce(function(total, product) {
        return total + product.price * product.qty;
    }, 0);

    document.getElementById("result").innerHTML =
        `<strong>REDUCE Result:</strong><br>
        Total Cart Price: ₹${totalPrice.toFixed(2)}`;
}


// FOREACH - Display every product
function showForEach() {

    let output = "<strong>forEach Result:</strong><br>";

    products.forEach(function(product, index) {

        output += `
            ${index + 1}. ${product.name}
            (₹${product.price}) - Qty: ${product.qty}<br>
        `;
    });

    document.getElementById("result").innerHTML = output;
}


// Display initial array
displayProducts();
