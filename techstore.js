// Load products and initialize the store
async function initStore() {
    try {
        const response = await fetch('products.json');
        const products = await response.json();
        displayProducts(products);
        setupEventListeners();
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Display products in the store
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
        
        container.appendChild(section);
    }
}

// Format category name for display
function formatCategoryName(category) {
    return category.replace(/([A-Z])/g, ' $1').trim();
}

// Create HTML for a product card
function createProductCard(product) {
    return `
        <div class="techstore_product_card" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}" class="techstore_product_image">
            <h3 class="techstore_product_name">${product.name}</h3>
            <p class="techstore_product_description">${product.description}</p>
            <p class="techstore_product_price">$${product.price}</p>
            <div class="techstore_quantity_control">
                <button class="techstore_quantity_btn minus">-</button>
                <input type="number" class="techstore_quantity_input" value="0" min="0">
                <button class="techstore_quantity_btn plus">+</button>
            </div>
        </div>
    `;
}

// Set up event listeners
function setupEventListeners() {
    document.addEventListener('click', handleClick);
    document.addEventListener('change', handleChange);
    
    document.getElementById('saveToFavorites').addEventListener('click', saveFavorites);
    document.getElementById('applyFavorites').addEventListener('click', applyFavorites);
    document.getElementById('buyNow').addEventListener('click', proceedToCheckout);
}

// Handle click events
function handleClick(event) {
    if (event.target.classList.contains('techstore_quantity_btn')) {
        const input = event.target.parentElement.querySelector('.techstore_quantity_input');
        const currentValue = parseInt(input.value) || 0;
        
        if (event.target.classList.contains('plus')) {
            input.value = currentValue + 1;
        } else if (event.target.classList.contains('minus') && currentValue > 0) {
            input.value = currentValue - 1;
        }
        
        updateCart();
    }
}

// Handle input changes
function handleChange(event) {
    if (event.target.classList.contains('techstore_quantity_input')) {
        updateCart();
    }
}

// Update cart totals
function updateCart() {
    const items = [];
    let total = 0;
    
    document.querySelectorAll('.techstore_product_card').forEach(card => {
        const quantity = parseInt(card.querySelector('.techstore_quantity_input').value) || 0;
        if (quantity > 0) {
            const price = parseFloat(card.querySelector('.techstore_product_price').textContent.replace('$', ''));
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
    
    updateCartDisplay(items, total);
}

// Update cart display
function updateCartDisplay(items, total) {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const cartTableTotal = document.getElementById('cartTableTotal');
    
    cartItems.innerHTML = items.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>$${item.total.toFixed(2)}</td>
        </tr>
    `).join('');
    
    cartCount.textContent = items.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal.textContent = total.toFixed(2);
    cartTableTotal.textContent = `$${total.toFixed(2)}`;
}

// Save cart as favorites
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

// Apply favorites to cart
function applyFavorites() {
    const favorites = JSON.parse(localStorage.getItem('techstore_favorites') || '{}');
    document.querySelectorAll('.techstore_product_card').forEach(card => {
        const quantity = favorites[card.dataset.id] || 0;
        card.querySelector('.techstore_quantity_input').value = quantity;
    });
    updateCart();
}

// Proceed to checkout
function proceedToCheckout() {
    const items = [];
    let total = 0;
    
    document.querySelectorAll('.techstore_product_card').forEach(card => {
        const quantity = parseInt(card.querySelector('.techstore_quantity_input').value) || 0;
        if (quantity > 0) {
            const name = card.querySelector('.techstore_product_name').textContent;
            const price = parseFloat(card.querySelector('.techstore_product_price').textContent.replace('$', ''));
            const itemTotal = price * quantity;
            total += itemTotal;
            
            items.push({ name, quantity, price, total: itemTotal });
        }
    });
    
    if (items.length === 0) {
        alert('Please add items to your cart before checking out.');
        return;
    }
    
    // Store cart data for checkout page
    localStorage.setItem('techstore_checkout', JSON.stringify({ items, total }));
    window.location.href = 'checkout.html';
}

// Initialize the store when the page loads
document.addEventListener('DOMContentLoaded', initStore);