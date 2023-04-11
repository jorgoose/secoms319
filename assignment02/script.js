const app = document.getElementById("app");

// Import Bootstrap from the CDN for use in renderBrowseView
const bootstrap = document.createElement("link");
bootstrap.rel = "stylesheet";
bootstrap.href =
  "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css";
document.head.appendChild(bootstrap);

const items = [
  {
    id: 1,
    name: "Super Cool Shoes",
    price: 45,
    image:
      "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-product-2_large.png?format=webp&v=1530129318",
  },
  {
    id: 2,
    name: "Rolex Watch",
    price: 9999,
    image:
      "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-product-5_large.png?format=webp&v=1530129458",
  },
  {
    id: 3,
    name: "Dad Hat",
    price: 25,
    image:
      "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-product-4_large.png?format=webp&v=1530129360",
  },
  {
    id: 4,
    name: "Gucci Sunglasses",
    price: 60,
    image:
      "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-product-3_large.png?format=webp&v=1530129341",
  },
  {
    id: 5,
    name: "Gamer Lamp",
    price: 10,
    image:
      "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-product-6_large.png?format=webp&v=1530129477",
  },
  {
    id: 6,
    name: "Pocket Dimension Backpack",
    price: 45,
    image:
      "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-product-1_large.png?format=webp&v=1530129297",
  },
  // Add more items here
];

let cart = {};
let userDetails = {};

function addToCart(itemId) {
  if (!cart[itemId]) {
    cart[itemId] = 1;
  } else {
    cart[itemId]++;
  }

  renderBrowseView();
}

function removeFromCart(itemId) {
  if (cart[itemId] && cart[itemId] > 0) {
    cart[itemId]--;
  }

  renderBrowseView();
}

function getItemById(itemId) {
  return items.find((item) => item.id === itemId);
}

function renderBrowseView() {
  app.innerHTML = `
    <div class="container my-4">
      <h1>Browse Items</h1>
      <input id="search" class="form-control" type="text" placeholder="Search" oninput="handleSearch(this.value)">
      <button class="btn btn-danger my-2" onclick="clearSearch()">Clear Search</button>
      <div class="row mt-4" id="items">
        ${items
          .map(
            (item) => `
          <div class="col-4 mb-3" data-id="${item.id}">
            <div class="card">
              <img src="${item.image}" class="card-img-top" alt="${item.name}">
              <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">Price: $${item.price}</p>
                <div class="d-flex justify-content-center">
                <button class="btn btn-primary ms-2 mx-2 font-weight-bold" onclick="removeFromCart(${
                  item.id
                })">-</button>
                  <input class="pl-2 text-center no-border" type="number" value="${
                    cart[item.id] || 0
                  }" min="0" readonly>
                  <button class="btn btn-primary me-2 mx-2 font-weight-bold" onclick="addToCart(${
                    item.id
                  })">+</button>
                </div>
              </div>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
      <div class="text-end mt-4">
        <button class="btn btn-success" onclick="renderCartView()">Checkout</button>
      </div>
    </div>
  `;
}

// Function that clears the search bar
function clearSearch() {
  document.getElementById("search").value = "";
  handleSearch("");
}

function handleSearch(query) {
  const lowerCaseQuery = query.toLowerCase();
  const itemElements = app.querySelectorAll("#items > div");

  itemElements.forEach((itemElement) => {
    const itemId = parseInt(itemElement.getAttribute("data-id"));
    const item = getItemById(itemId);

    if (item.name.toLowerCase().includes(lowerCaseQuery)) {
      itemElement.style.display = "block";
    } else {
      itemElement.style.display = "none";
    }
  });
}

function renderCartView() {
  const cartItems = Object.entries(cart).filter(
    ([_, quantity]) => quantity > 0
  );

  app.innerHTML = `
    <div class="container py-2">
      <h1>Cart</h1>
      <ul class="list-group mb-4">
        ${cartItems
          .map(([itemId, quantity]) => {
            const item = getItemById(parseInt(itemId));
            return `
            <li class="list-group-item d-flex justify-content-between align-items-center">
              ${item.name} (x${quantity})
              <span>$${item.price * quantity}</span>
            </li>
          `;
          })
          .join("")}
        <li class="list-group-item d-flex         justify-content-between align-items-center">
        <strong>Total</strong>
        <strong>$${cartItems.reduce((total, [itemId, quantity]) => {
          const item = getItemById(parseInt(itemId));
          return total + item.price * quantity * 1.07;
        }, 0)}</strong>
      </li>
    </ul>
    <h2>Payment Information</h2>
    <form id="payment-form" onsubmit="handlePaymentFormSubmit(event)">
      <div class="mb-3">
        <label for="fullName" class="form-label">Full Name</label>
        <input type="text" class="form-control" id="fullName" required>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="email" class="form-control" id="email" required>
      </div>
      <div class="mb-3">
        <label for="card" class="form-label">Credit Card</label>
        <input type="text" class="form-control" id="card" pattern="[0-9]{16}" required>
      </div>
      <div class="mb-3">
        <label for="address1" class="form-label">Address 1</label>
        <input type="text" class="form-control" id="address1" required>
      </div>
      <div class="mb-3">
        <label for="address2" class="form-label">Address 2</label>
        <input type="text" class="form-control" id="address2">
      </div>
      <div class="mb-3">
        <label for="city" class="form-label">City</label>
        <input type="text" class="form-control" id="city" required>
      </div>
      <div class="mb-3">
        <label for="state" class="form-label">State</label>
        <input type="text" class="form-control" id="state" required>
      </div>
      <div class="mb-3">
        <label for="zip" class="form-label">Zip Code</label>
        <input type="text" class="form-control" id="zip" pattern="[0-9]{5}" required>
      </div>
      <button type="submit" class="btn btn-primary">Order</button>
      <button type="button" class="btn btn-secondary" onclick="renderBrowseView()">Return</button>
    </form>
  </div>
`;
}

function handlePaymentFormSubmit(event) {
  event.preventDefault();

  const form = event.target;

  userDetails = {
    fullName: form.fullName.value,
    email: form.email.value,
    card: form.card.value,
    address1: form.address1.value,
    address2: form.address2.value,
    city: form.city.value,
    state: form.state.value,
    zip: form.zip.value,
  };

  renderConfirmationView();
}

function renderConfirmationView() {
  const cartItems = Object.entries(cart).filter(
    ([_, quantity]) => quantity > 0
  );

  app.innerHTML = `
  <div class="container py-2">
    <h1>Confirmation</h1>
    <h2>Order Summary</h2>
    <ul class="list-group mb-4">
      ${cartItems
        .map(([itemId, quantity]) => {
          const item = getItemById(parseInt(itemId));
          return `
          <li class="list-group-item d-flex justify-content-between align-items-center">
            ${item.name} (x${quantity})
            <span>$${item.price * quantity}</span>
            </li>
            `;
        })
        .join(
          ""
        )} <li class="list-group-item d-flex justify-content-between align-items-center"> <strong>Total</strong> <strong>$${cartItems.reduce(
    (total, [itemId, quantity]) => {
      const item = getItemById(parseInt(itemId));
      return total + item.price * quantity;
    },
    0
  )}</strong> </li> </ul> <h2>User Information</h2> <ul class="list-group mb-4"> <li class="list-group-item">Full Name: ${
    userDetails.fullName
  }</li> <li class="list-group-item">Email: ${
    userDetails.email
  }</li> <li class="list-group-item">Credit Card: **** **** **** ${userDetails.card.slice(
    -4
  )}</li> <li class="list-group-item">Address: ${userDetails.address1}, ${
    userDetails.address2 ? userDetails.address2 + ", " : ""
  }${userDetails.city}, ${userDetails.state}, ${
    userDetails.zip
  }</li> </ul> <button class="btn btn-primary" onclick="resetApp()">Return to Browse</button> </div>`;
}

function resetApp() {
  cart = {};
  renderBrowseView();
}

renderBrowseView();
