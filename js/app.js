// Store all products in one array

let allProducts = [];

storeData.categories.forEach(category => {

    category.subcategories.forEach(subcategory => {

        subcategory.products.forEach(product => {

            allProducts.push(product);

        });

    });

});


// Recently viewed products

let recentlyViewed = [];

let recentlyViewedSet = new Set();


// HTML elements

let productsContainer =
    document.getElementById("productsContainer");

let recentlyViewedContainer =
    document.getElementById("recentlyViewedContainer");

let clearHistoryBtn =
    document.getElementById("clearHistoryBtn");

let productModal =
    document.getElementById("productModal");

let productDetails =
    document.getElementById("productDetails");

let closeModal =
    document.getElementById("closeModal");


// Display all products

function displayProducts() {

    productsContainer.innerHTML = "";

    allProducts.forEach(product => {

        let card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <h3>${product.name}</h3>

            <p>Brand: ${product.brand}</p>

            <p>Price: ₹${product.price}</p>

            <p>Rating: ⭐ ${product.rating}</p>

            <p>Stock: ${product.stock}</p>

            <button onclick="viewProduct('${product.id}')">
                View Product
            </button>
        `;

        productsContainer.appendChild(card);

    });

}


// View product

function viewProduct(productId) {

    let product = allProducts.find(
        product => product.id === productId
    );

    if (!product) {
        return;
    }


    // Add to recently viewed

    addToRecentlyViewed(productId);


    // Show product details

    productDetails.innerHTML = `

        <h2>${product.name}</h2>

        <p>
            <strong>Brand:</strong>
            ${product.brand}
        </p>

        <p>
            <strong>Price:</strong>
            ₹${product.price}
        </p>

        <p>
            <strong>Rating:</strong>
            ⭐ ${product.rating}
        </p>

        <p>
            <strong>Reviews:</strong>
            ${product.reviews}
        </p>

        <p>
            <strong>Stock:</strong>
            ${product.stock}
        </p>

        <p>
            <strong>Category:</strong>
            ${product.category}
        </p>

        <p>
            <strong>Subcategory:</strong>
            ${product.subcategory}
        </p>

    `;


    // Open modal

    productModal.style.display = "flex";

}


// Add product to recently viewed

function addToRecentlyViewed(productId) {

    // Product already exists

    if (recentlyViewedSet.has(productId)) {

        recentlyViewed =
            recentlyViewed.filter(id => id !== productId);

    }


    // Maximum 5 products

    else if (recentlyViewed.length === 5) {

        let oldestProduct =
            recentlyViewed.pop();

        recentlyViewedSet.delete(oldestProduct);

    }


    // Add latest product at beginning

    recentlyViewed.unshift(productId);

    recentlyViewedSet.add(productId);


    // Update recently viewed section

    displayRecentlyViewed();

}


// Display recently viewed products

function displayRecentlyViewed() {

    recentlyViewedContainer.innerHTML = "";


    // Empty history

    if (recentlyViewed.length === 0) {

        recentlyViewedContainer.innerHTML = `
            <div class="empty-message">
                No products viewed yet.
            </div>
        `;

        return;
    }


    // Display products

    recentlyViewed.forEach(productId => {

        let product = allProducts.find(
            product => product.id === productId
        );

        if (!product) {
            return;
        }


        let card = document.createElement("div");

        card.className = "recent-card";

        card.innerHTML = `

            <h3>${product.name}</h3>

            <p>₹${product.price}</p>

            <p>⭐ ${product.rating}</p>

            <button onclick="viewProduct('${product.id}')">
                View Again
            </button>

        `;

        recentlyViewedContainer.appendChild(card);

    });

}


// Clear history

clearHistoryBtn.addEventListener("click", function() {

    recentlyViewed = [];

    recentlyViewedSet.clear();

    displayRecentlyViewed();

});


// Close modal

closeModal.addEventListener("click", function() {

    productModal.style.display = "none";

});


// Close modal by clicking outside

productModal.addEventListener("click", function(event) {

    if (event.target === productModal) {

        productModal.style.display = "none";

    }

});


// Initial display

displayProducts();

displayRecentlyViewed();