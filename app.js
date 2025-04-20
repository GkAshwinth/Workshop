let cart = [];

function displayProducts() {
  for (const [category, items] of Object.entries(products)) {
    const container = document.getElementById(category.replace(/([A-Z])/g, '-$1').toLowerCase());
    container.innerHTML = items.map(product => `
      <div class="product-card">
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <button class="button" onclick="addToCart('${product.id}')">Add to Cart</button>
      </div>
    `).join('');
  }
}

function findProduct(productId) {
  for (const category of Object.values(products)) {
    const product = category.find(p => p.id === productId);
    if (product) return product;
  }
  return null;
}

function addToCart(productId) {
  const product = findProduct(productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const checkoutButton = document.getElementById('checkout-button');

  cartItems.innerHTML = cart.map(item => `
    <tr>
      <td>${item.name}</td>
      <td>$${item.price.toFixed(2)}</td>
      <td>
        <button class="button" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
        ${item.quantity}
        <button class="button" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
      </td>
      <td>$${(item.price * item.quantity).toFixed(2)}</td>
      <td><button class="button remove" onclick="removeFromCart('${item.id}')">Remove</button></td>
    </tr>
  `).join('');

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = `$${total.toFixed(2)}`;
  checkoutButton.style.display = cart.length > 0 ? 'block' : 'none';
}

function updateQuantity(productId, newQuantity) {
  if (newQuantity < 1) {
    removeFromCart(productId);
    return;
  }
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = newQuantity;
    updateCart();
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
}

function saveAsFavorite() {
  if (cart.length === 0) {
    alert('Cannot save an empty cart as favorite!');
    return;
  }
  localStorage.setItem('favoriteOrder', JSON.stringify(cart));
  alert('Order saved as favorite!');
}

function applyFavorite() {
  const savedCart = localStorage.getItem('favoriteOrder');
  if (!savedCart) {
    alert('No favorite order found!');
    return;
  }
  try {
    cart = JSON.parse(savedCart);
    updateCart();
  } catch (error) {
    alert('Error loading favorite order');
  }
}

function showCheckout() {
  document.getElementById('store-content').style.display = 'none';
  document.getElementById('checkout-form').style.display = 'block';
}

function processOrder(event) {
  event.preventDefault();
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 7);

  document.getElementById('checkout-form').style.display = 'none';
  document.getElementById('confirmation').style.display = 'block';
  document.getElementById('delivery-date').textContent = deliveryDate.toLocaleDateString();
}

function returnToStore() {
  cart = [];
  document.getElementById('confirmation').style.display = 'none';
  document.getElementById('store-content').style.display = 'block';
  updateCart();
}

// Initialize the store
document.addEventListener('DOMContentLoaded', () => {
  displayProducts();
  updateCart();
});