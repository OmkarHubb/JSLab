// Sarojini Nagar & Delhi Market Slang - Product Dataset
const products = [
    { id: 1, name: "Heavy Duty Laptop", category: "Electronics", price: 999, icon: "💻", badge: "🔥 BEST PRICE!", slogan: "Arre bhaiya, mall me yahi item 50 hazar ka hai!" },
    { id: 2, name: "Smart Touch Phone", category: "Electronics", price: 699, icon: "📱", badge: "⚡ LELO LELO!", slogan: "Madam, screen itna smooth hai ki makhhan phisal jaye!" },
    { id: 3, name: "Super Bass Headphones", category: "Electronics", price: 149, icon: "🎧", badge: "🎵 MAST MAAL!", slogan: "Ek baar suno bhaiya, auto wale bhi naachne lagenge!" },
    { id: 4, name: "Cotton Branded T Shirt", category: "Clothing", price: 25, icon: "👕", badge: "🏷️ SAROJINI SPECIAL", slogan: "Excuse me, brother ! Ek baar pehno, hero lagoge!" },
    { id: 5, name: "Stylio Denim Jeans", category: "Clothing", price: 50, icon: "👖", badge: "⭐ BARGAINING SPECIAL", slogan: "Ghar jaake wash karo, rang gaya toh dukaad band kar dunga!" },
    { id: 6, name: "Warm Winter Jacket", category: "Clothing", price: 80, icon: "🧥", badge: "❄️ THAND SPECIAL", slogan: "Shimla chale jao bhaiya, ek tinke ki thand nahi lagegi!" },
    { id: 7, name: "Full JS Coding Book", category: "Books", price: 40, icon: "📜", badge: "📚 EXAM TOPPER", slogan: "Ghar ki baat hai madam, isse padh ke Google me job lag jayegi!" },
    { id: 8, name: "Filmi Story Novel", category: "Books", price: 15, icon: "📖", badge: "🍿 TIMEPASS", slogan: "Mast timepass book hai madam, metro safar khatm ho jayega!" },
    { id: 9, name: "Physics Formula Book", category: "Books", price: 35, icon: "📘", badge: "🧠 SCIENTIST SPECIAL", slogan: "Einstein bhi yehi padhta tha bhaiya, lelo lelo!" },
    { id: 10, name: "Royal Smart Watch", category: "Accessories", price: 120, icon: "⌚", badge: "👑 VIP WATCH", slogan: "Bluetooth Calling hai bhaiya, phone nikalne ki zaroorat nahi!" },
    { id: 11, name: "Hero Cool Sunglasses", category: "Accessories", price: 45, icon: "🕶️", badge: "🕶️ BOLLYWOOD VIBE", slogan: "Goggles pehen ke auto me baitho, heroine lift maangegi!" },
    { id: 12, name: "Strong Travel Backpack", category: "Accessories", price: 60, icon: "🎒", badge: "🧳 CHOR PROOF", slogan: "5 Zippers hain bhaiya, chor dhoondte dhoondte thak jayega!" }
];

document.addEventListener("DOMContentLoaded", function () {
    const filterForm = document.getElementById("filterForm");
    const searchInput = document.getElementById("searchInput");
    const categorySelect = document.getElementById("categorySelect");
    const clearBtn = document.getElementById("clearBtn");
    const productList = document.getElementById("productList");
    const errorMessage = document.getElementById("errorMessage");

    // Initially render all market products
    renderBazaarProducts(products);

    // Event: input (Validate search box and filter products while typing)
    searchInput.addEventListener("input", function () {
        validateAndFilter();
    });

    // Event: change (Filter products based on selected category sector)
    categorySelect.addEventListener("change", function () {
        validateAndFilter();
    });

    // Event: click (Clear filters and show all products again)
    clearBtn.addEventListener("click", function () {
        searchInput.value = "";
        categorySelect.value = "all";
        errorMessage.innerText = "";
        searchInput.classList.remove("invalid");
        renderBazaarProducts(products);
    });

    // Event: submit (Validate inputs before searching if form submitted)
    filterForm.addEventListener("submit", function (event) {
        event.preventDefault();
        validateAndFilter();
    });

    // Validation and Filtering Function
    function validateAndFilter() {
        const query = searchInput.value;
        const selectedCategory = categorySelect.value;

        // Regex: Only letters and spaces allowed
        const validPattern = /^[a-zA-Z\s]*$/;

        if (!validPattern.test(query)) {
            errorMessage.innerText = '⚠️ "Excuse me, brother !" Numbers & special symbols yahan nahi chalenge!';
            searchInput.classList.add("invalid");
            productList.innerHTML = `
                <div class="empty-bazaar error-bazaar">
                    <span class="warning-emoji">🚨</span>
                    <h3>[ "ARRE BHAIYA, SAHI TYPE KARO!" ]</h3>
                    <p>Numbers aur Special Characters nahi chalenge. Sirf Letters & Spaces type karo!</p>
                </div>
            `;
            return;
        }

        // Input is valid
        errorMessage.innerText = "";
        searchInput.classList.remove("invalid");

        const trimmedQuery = query.trim().toLowerCase();

        // Filter items dynamically by search term & selected category
        const filtered = products.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(trimmedQuery);
            const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        renderBazaarProducts(filtered);
    }

    // Function to render items into market layout
    function renderBazaarProducts(items) {
        if (items.length === 0) {
            productList.innerHTML = `
                <div class="empty-bazaar">
                    <span class="sad-emoji">😔</span>
                    <h3>[ "BHAIYA, MAAL KHATM HO GAYA!" ]</h3>
                    <p>"Arre madam, doosra shabd try karo ya Clear Filter dabao!"</p>
                </div>
            `;
            return;
        }

        productList.innerHTML = items.map((item, index) => {
            const rotClass = index % 4 === 0 ? 'rot-left' : index % 4 === 1 ? 'rot-right' : index % 4 === 2 ? 'rot-slight' : 'rot-straight';
            return `
                <div class="bazaar-card ${rotClass}">
                    <!-- Paper Tape Decor -->
                    <div class="tape-decor"></div>

                    <!-- Slang Badge Stamp -->
                    <span class="bazaar-badge">${item.badge}</span>

                    <!-- Product Icon Frame -->
                    <div class="product-icon-frame">
                        <span class="item-emoji">${item.icon}</span>
                    </div>

                    <!-- Details -->
                    <div class="product-info">
                        <h3 class="item-title">${item.name}</h3>
                        <p class="category-tag">STALL: <b>${item.category}</b></p>
                        <p class="slogan-text">"${item.slogan}"</p>
                    </div>

                    <!-- Hinglish Price Tag with Bargain Quote -->
                    <div class="bazaar-price-tag">
                        <div>
                            <span class="mrp-price">MRP ₹${item.price * 160}</span>
                            <span class="offer-label">LAST PRICE?</span>
                        </div>
                        <span class="price-val">₹${item.price * 80} ONLY!</span>
                    </div>
                </div>
            `;
        }).join("");
    }
});
