document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCart(cart);
});

// Function to update the cart display
function updateCart(cart) {
    const cartTableBody = document.querySelector('#cartTable tbody');
    cartTableBody.innerHTML = ''; // Clear existing cart items

    let totalPrice = 0;

    cart.forEach((item, index) => {
        // Assuming you have a price mapping for items
        const priceMapping = {
            'ကွမ်းစားဆေးကြီး': 700,
            'ဘုန်းကျော် ၄လိပ်': 999,
            'ကွမ်းစားဆေးသေး': 170,
            '၅လိပ် ရစပ': 3700,
            '၅လိပ် ရရတ': 4000,
            'ဘုန်းကျော် ၃လိပ်': 999,
            '၅၀စီးဘုန်းကျော်': 999,
            '၅လိပ် ရွှေကြီး': 999,
            '၄ လိပ် ငွေထုပ်': 999,
            'ထုံး သေး': 999,
            'ထုံံး လတ်': 999,
            'ထုံး ကြီး': 999,
            'ထုဘက ဇက ၅၀စီး': 999,
            'ထကကြီးဘုန်းကျော်': 999,
        };

        const itemPrice = priceMapping[item.item] || 0;
        const itemTotal = item.quantity * itemPrice;
        totalPrice += itemTotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.item}</td>
            <td>${item.quantity}</td>
            <td>$${itemPrice.toFixed(2)}</td>
            <td>$${itemTotal.toFixed(2)}</td>
            <td><button onclick="removeFromCart(${index})">Remove</button></td>
        `;
        cartTableBody.appendChild(row);
    });

    document.getElementById('totalPrice').textContent = `Total Price: $${totalPrice.toFixed(2)}`;
}

// Function to remove an item from the cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart(cart);
}