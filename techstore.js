// <-------- Load products and initialize the store when the page loads -------->
async function initStore() {
    try {
        const response = await fetch('products.json');
        const products = await response.json();
        displayProducts(products); // Show all products on the page
        setupEventListeners();    // Set up all event handlers
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// <-------- Create and display all product sections dynamically -------->
function displayProducts(products) {
    const container = document.getElementById('productsContainer');
    
    for (const [category, items] of Object.entries(products)) {
        const section = document.createElement('div');
        section.className = 'techstore_section';
        
        section.innerHTML = `
            <h2 class="techstore_section_title">${formatCategoryName(category)}</h2>
            <div class="techstore_product_grid">
                ${items.map(item => createProductCard(item)).join('')}
            </div>
        `;
        
        container.appendChild(section); // Add this section to the page
    }
}

// <-------- Format category names like "graphicsCards" → "Graphics Cards" -------->
function formatCategoryName(category) {
    return category.replace(/([A-Z])/g, ' $1').trim();
}

// <-------- Return HTML for a single product card -------->
function createProductCard(product) {
    return `
        <div class="techstore_product_card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="techstore_product_image">
            <h3 class="techstore_product_name">${product.name}</h3>
            <p class="techstore_product_description">${product.description}</p>
            <p class="techstore_product_price">LKR ${product.price}</p>
            <div class="techstore_quantity_control">
                <button class="techstore_quantity_btn minus">-</button>
                <input type="number" class="techstore_quantity_input" value="0" min="0">
                <button class="techstore_quantity_btn plus">+</button>
            </div>
        </div>
    `;
}

// <-------- Hook up all the main buttons and input events -------->
function setupEventListeners() {
    document.addEventListener('click', handleClick);       // For +/- buttons
    document.addEventListener('change', handleChange);     // For manual quantity edits

    // Buttons for saving, applying favorites, and checking out
    document.getElementById('saveToFavorites').addEventListener('click', saveFavorites);
    document.getElementById('applyFavorites').addEventListener('click', applyFavorites);
    document.getElementById('buyNow').addEventListener('click', proceedToCheckout);
}

// <-------- Handle all click-based interactions (like + and -) -------->
function handleClick(event) {
    if (event.target.classList.contains('techstore_quantity_btn')) {
        const input = event.target.parentElement.querySelector('.techstore_quantity_input');
        const currentValue = parseInt(input.value) || 0;
        
        // Increase or decrease quantity
        if (event.target.classList.contains('plus')) {
            input.value = currentValue + 1;
        } else if (event.target.classList.contains('minus') && currentValue > 0) {
            input.value = currentValue - 1;
        }
        
        updateCart(); // Refresh cart data
    }
}

// <-------- Handle changes made directly in quantity input fields -------->
function handleChange(event) {
    if (event.target.classList.contains('techstore_quantity_input')) {
        updateCart();
    }
}

// <-------- Update cart item list and totals based on current selections -------->
function updateCart() {
    const items = [];
    let total = 0;
    
    document.querySelectorAll('.techstore_product_card').forEach(card => {
        const quantity = parseInt(card.querySelector('.techstore_quantity_input').value) || 0;
        if (quantity > 0) {
            const price = parseFloat(card.querySelector('.techstore_product_price').textContent.replace(/[^\d.]/g, ''));
            const itemTotal = price * quantity;
            total += itemTotal;
            
            items.push({
                name: card.querySelector('.techstore_product_name').textContent,
                quantity,
                price,
                total: itemTotal
            });
        }
    });
    
    updateCartDisplay(items, total); // Update the visual cart
}

// <-------- Render the cart table and update total displays -------->
function updateCartDisplay(items, total) {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const cartTableTotal = document.getElementById('cartTableTotal');
    
    // Fill the table with selected items
    cartItems.innerHTML = items.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>LKR ${item.price.toFixed(2)}</td>
            <td>LKR ${item.total.toFixed(2)}</td>
        </tr>
    `).join('');
    
    // Update cart summary info
    cartCount.textContent = items.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal.textContent = `LKR ${total.toFixed(2)}`; 
    cartTableTotal.textContent = `LKR ${total.toFixed(2)}`;
}

// <-------- Save the current cart as the user's "Favorite" -------->
function saveFavorites() {
    const favorites = {};
    document.querySelectorAll('.techstore_product_card').forEach(card => {
        const quantity = card.querySelector('.techstore_quantity_input').value;
        if (quantity > 0) {
            favorites[card.dataset.id] = quantity;
        }
    });
    localStorage.setItem('techstore_favorites', JSON.stringify(favorites));
    alert('Order saved to favorites!');
}

// <-------- Load saved favorites into the cart -------->
function applyFavorites() {
    const favorites = JSON.parse(localStorage.getItem('techstore_favorites') || '{}');
    document.querySelectorAll('.techstore_product_card').forEach(card => {
        const quantity = favorites[card.dataset.id] || 0;
        card.querySelector('.techstore_quantity_input').value = quantity;
    });
    updateCart(); // Refresh cart with restored data
}

// <-------- Validate and prepare the cart for checkout -------->
function proceedToCheckout() {
    const items = [];
    let total = 0;
    
    document.querySelectorAll('.techstore_product_card').forEach(card => {
        const quantity = parseInt(card.querySelector('.techstore_quantity_input').value) || 0;
        if (quantity > 0) {
            const name = card.querySelector('.techstore_product_name').textContent;
            const priceText = card.querySelector('.techstore_product_price').textContent;
            const price = parseFloat(priceText.replace(/[^\d.]/g, ''));

            const itemTotal = price * quantity;
            total += itemTotal;
            
            items.push({ name, quantity, price, total: itemTotal });
        }
    });
    
    if (items.length === 0) {
        alert('Please add items to your cart before checking out.');
        return;
    }
    
    // Save checkout data and move to the next page
    localStorage.setItem('techstore_checkout', JSON.stringify({ items, total }));
    window.location.href = 'checkout.html';
}

// <-------- Fire everything off when the DOM is ready -------->
document.addEventListener('DOMContentLoaded', initStore);