let cart = [];

function validatePhone(input) {
    const phonePattern = /^(?:\d{9}|\d{11})$/; // Regex for 9 or 11-digit phone numbers
    if (!phonePattern.test(input.value)) {
        input.setCustomValidity("Please enter a valid phone number (9 or 11 digits)."); // Custom validation message
    } else {
        input.setCustomValidity(""); // Clear the error message
    }
}

function continueToProducts() {
    const customerName = document.getElementById('customerName').value;
    const customerPhone = document.getElementById('customerPhone');
    const shopName = document.getElementById('shopName').value;

    // Check if all fields are filled and if the phone number is valid
    if (customerName && customerPhone.checkValidity() && shopName) {
        localStorage.setItem('customerName', customerName);
        localStorage.setItem('customerPhone', customerPhone.value);
        localStorage.setItem('shopName', shopName);
        window.location.href = 'products.html';
    } else {
        alert('Please fill in all fields correctly, including a valid phone number.');
    }
}

// Function to add items to the cart
function addToCart(productName, productPrice, quantity) {
    quantity = parseInt(quantity);
    if (quantity > 0) {
        const item = { name: productName, price: productPrice, quantity: quantity };
        const existingItemIndex = cart.findIndex(item => item.name === productName);
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity += quantity; // Update quantity if already in cart
        } else {
            cart.push(item); // Add new item to cart
        }
        updateCart();
    } else {
        alert('Please enter a valid quantity.');
    }
}

// Function to update the cart display
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price} x `;
        
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = item.quantity;
        quantityInput.min = '1';
        
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.onclick = () => updateQuantity(index, quantityInput.value);
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeFromCart(index);
        
        li.appendChild(quantityInput);
        li.appendChild(updateButton);
        li.appendChild(removeButton);
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    document.getElementById('totalPrice').textContent = total.toFixed(2);
}

// Function to update the quantity of an item in the cart
function updateQuantity(index, newQuantity) {
    newQuantity = parseInt(newQuantity);
    if (newQuantity > 0) {
        cart[index].quantity = newQuantity; // Update the quantity
        updateCart(); // Refresh the cart display
    } else {
        alert('Please enter a valid quantity.');
    }
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Function to navigate to the cart page
function goToCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.href = 'cart.html';
}

// Function to confirm the order
function confirmOrder() {
    localStorage.clear();
    window.location.href = 'confirmation.html';
}

// Load cart from local storage on cart page
if (window.location.pathname.includes('cart.html')) {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCart();
}

function updateTotal(quantityInput) {
    const row = quantityInput.closest('tr'); // Get the closest row
    const priceCell = row.cells[1]; // Get the price cell
    const totalCell = row.cells[3]; // Get the total cell

    const price = parseFloat(priceCell.innerText.replace('$', '')); // Get the price
    const quantity = parseInt(quantityInput.value); // Get the quantity

    const total = price * quantity; // Calculate total
    totalCell.innerText = `$${total.toFixed(2)}`; // Update total cell

    // Update overall total price
    updateOverallTotal();
}

function updateOverallTotal() {
    const totalCells = document.querySelectorAll('#cart-items td:nth-child(4)'); // Select all total cells
    let grandTotal = 0;

    totalCells.forEach(cell => {
        grandTotal += parseFloat(cell.innerText.replace('$', '')); // Sum up total values
    });

    document.getElementById('totalPrice').innerText = grandtotal.toFixed(2); // Update overall total
}

