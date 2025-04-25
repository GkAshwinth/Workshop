window.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('product-container');

    for (const category in productData) {
        const section = document.createElement('section');
        section.className = "product-section";
        const heading = document.createElement('h2');
        heading.textContent = category;
        section.appendChild(heading);

        const wrapper = document.createElement('div');
        wrapper.className = "product-wrapper";

        productData[category].forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';

            card.innerHTML = `
            <img src="${product.img}" alt="${product.name}" class="product-img">
            <h3>${product.name}</h3>
            <p>LKR ${product.price.toFixed(2)}</p>
            <input type="number" min="0" value="0" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">
        `;
            wrapper.appendChild(card);
        });

        section.appendChild(wrapper);
        container.appendChild(section);
    }

    fetch('products.json')
  .then(res => res.json())
  .then(data => {
    console.log(data); // use the data in your app
  });
});