const products = [];

storeData.categories.forEach(category => {

    category.subcategories.forEach(subcategory => {

        subcategory.products.forEach(product => {
            products.push(product);
        });

    });

});


// Sort products by price
products.sort((a, b) => a.price - b.price);


// Prefix sum for inventory value
const prefixSum = [0];

for (let i = 0; i < products.length; i++) {

    const value = products[i].price * products[i].stock;

    prefixSum.push(prefixSum[i] + value);
}


// First product with price >= target
function lowerBound(target) {

    let left = 0;
    let right = products.length;

    while (left < right) {

        const mid = Math.floor((left + right) / 2);

        if (products[mid].price >= target) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return left;
}


// First product with price > target
function upperBound(target) {

    let left = 0;
    let right = products.length;

    while (left < right) {

        const mid = Math.floor((left + right) / 2);

        if (products[mid].price > target) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }

    return left;
}


// Display matching products
function displayProducts(start, end) {

    const container = document.getElementById("productsContainer");

    container.innerHTML = "";

    if (start === end) {

        container.innerHTML = `
            <p class="empty-state">
                No products found in this price range.
            </p>
        `;

        return;
    }

    for (let i = start; i < end; i++) {

        const product = products[i];

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <h3>${product.name}</h3>
            <p><strong>Brand:</strong> ${product.brand}</p>
            <p><strong>Price:</strong> ₹${product.price}</p>
            <p><strong>Stock:</strong> ${product.stock}</p>
            <p><strong>Inventory Value:</strong> ₹${product.price * product.stock}</p>
        `;

        container.appendChild(card);
    }
}


// Search products
function searchProducts() {

    const minPrice = Number(
        document.getElementById("minPrice").value
    );

    const maxPrice = Number(
        document.getElementById("maxPrice").value
    );

    const errorMessage =
        document.getElementById("errorMessage");


    if (minPrice < 0 || maxPrice < 0) {

        errorMessage.textContent =
            "Price cannot be negative.";

        return;
    }


    if (minPrice > maxPrice) {

        errorMessage.textContent =
            "Minimum price cannot be greater than maximum price.";

        return;
    }


    errorMessage.textContent = "";


    const start = lowerBound(minPrice);

    const end = upperBound(maxPrice);


    const count = end - start;


    const totalValue =
        prefixSum[end] - prefixSum[start];


    document.getElementById("productCount").textContent =
        count;


    document.getElementById("inventoryValue").textContent =
        "₹" + totalValue.toLocaleString("en-IN");


    displayProducts(start, end);
}


// Search button
document.getElementById("searchBtn")
    .addEventListener("click", searchProducts);