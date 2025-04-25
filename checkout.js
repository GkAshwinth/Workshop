document.addEventListener('DOMContentLoaded', () => {
    // Load checkout data
    const checkoutData = JSON.parse(localStorage.getItem('techstore_checkout') || '{}');
    displayCheckoutItems(checkoutData);

    // Handle form submission
    document.getElementById('checkoutForm').addEventListener('submit', handleCheckout);
});

function displayCheckoutItems(data) {
    const container = document.getElementById('checkoutItems');
    const totalElement = document.getElementById('checkoutTotal');

    console.log("Checkout data:", data);

    if (data.items && data.items.length > 0) {
        container.innerHTML = data.items.map(item => `
            <div class="checkout_item">
                <p>${item.name} x ${item.quantity}</p>
                <p>LKR ${item.total?.toFixed(2) || '0.00'}</p>
            </div>
        `).join('');

        const total = parseFloat(data.total);
        totalElement.textContent = isNaN(total) ? 'LKR 0.00' : `LKR ${total.toFixed(2)}`;
    } else {
        window.location.href = 'store.html';
    }
}

function handleCheckout(event) {
    event.preventDefault();

    // Basic form validation
    const form = event.target;
    if (!form.checkValidity()) {
        alert('Please fill in all required fields correctly.');
        return;
    }

    // Calculate delivery date (3-5 business days)
    const deliveryDate = calculateDeliveryDate();
    document.getElementById('deliveryDate').textContent = deliveryDate.toDateString();

    // Show confirmation modal
    const modal = document.getElementById('confirmationModal');
    modal.style.display = 'flex';

    // Clear cart data
    localStorage.removeItem('techstore_checkout');
}

function calculateDeliveryDate() {
    const date = new Date();
    const businessDays = Math.floor(Math.random() * 3) + 3; // Random 3-5 days
    let daysAdded = 0;

    while (daysAdded < businessDays) {
        date.setDate(date.getDate() + 1);
        if (date.getDay() !== 0 && date.getDay() !== 6) { // Skip weekends
            daysAdded++;
        }
    }

    return date;
}