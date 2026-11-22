function addToCart(button) {

    let product = button.parentElement;

    let name = product.querySelector("h3").innerText;
    let priceText = product.querySelector("ins").innerText;

    let price = parseInt(priceText.replace("₹", "").split("/")[0]);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let item = {
        name: name,
        price: price,
        quantity: 1
    };

    cart.push(item);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart!");
}


function displayCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let container = document.getElementById("cart-container");

    if (cart.length === 0) {
        container.innerHTML = "<h3>Your cart is empty</h3>";
        return;
    }

    container.innerHTML = "";

    let total = 0;

    cart.forEach(function(item, index) {

        let price = item.price;

        total = total + price * item.quantity;

        container.innerHTML += `
            <div class="cart-item">

                <h3>${item.name}</h3>

                <p>Price: ₹${price}</p>

                <button onclick="changeQuantity(${index}, -1)">−</button>

                <span>${item.quantity}</span>

                <button onclick="changeQuantity(${index}, 1)">+</button>

                <button onclick="removeItem(${index})">
                    Remove
                </button>

            </div>
        `;
    });

    document.getElementById("cart-total").innerText =
        "Total: ₹" + total;
}


function changeQuantity(index, change) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
    updateCartCount();
}


function removeItem(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
    updateCartCount();
}


if (document.getElementById("cart-container")) {
    displayCart();
}
function updateCartCount() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let count = 0;

    cart.forEach(function(item) {
        count = count + item.quantity;
    });

    let cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.innerText = count;
    }
}

updateCartCount();
function searchProducts() {

    let searchText = document.getElementById("searchInput").value.toLowerCase();

    let products = document.querySelectorAll(".featured-products article");

    products.forEach(function(product) {

        let name = product.querySelector("h3").innerText.toLowerCase();

        if (name.includes(searchText)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }

    });
}
let loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let login = document.querySelector('input[name="login"]').value;
        let password = document.querySelector('input[name="Password"]').value;

        if (login === "" || password === "") {
            alert("Please enter email/phone and password");
        }
        else {
            alert("Login successful!");
        }

    });

}
let signupForm = document.getElementById("signupForm");

if (signupForm) {

    signupForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let firstName = document.querySelector('input[name="first name"]').value;
        let lastName = document.querySelector('input[name="Last name"]').value;
        let mobile = document.querySelector('input[name="Mobile number"]').value;
        let password = document.querySelector('input[name="new Password"]').value;
        let confirmPassword = document.querySelector('input[name="re enter Password"]').value;

        if (firstName === "" || lastName === "" || mobile === "" || password === "" || confirmPassword === "") {
            alert("Please fill all the fields");
        }
        else if (password !== confirmPassword) {
            alert("Passwords do not match");
        }
        else {
            alert("Registration successful!");
        }

    });

}