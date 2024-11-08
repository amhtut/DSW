document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const customerName = document.getElementById('customerName').value;
    const customerPhone = document.getElementById('customerPhone').value;
    const itemSelect = document.getElementById('itemSelect').value;
    const quantity = document.getElementById('quantity').value;

    // Create an order object
    const order = {
        customerName: customerName,
        customerPhone: customerPhone,
        item: itemSelect,
        quantity: quantity
    };

    // Store the order in local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(order);
    localStorage.setItem('cart', JSON.stringify(cart));

    // Redirect to cart.html
    window.location.href = 'cart.html';
});