// app.js
import products from './product.js';
import { cart, addToCart, removeFromCart, clearCart } from './cart.js';

function renderProductList() {
  const productList = document.getElementById('product-list');

  for (const product of products) {
    const productElement = document.createElement('div');
    productElement.className = 'product';
    productElement.innerHTML = `
      <span>${product.name}</span>
      <span>$${product.price}</span>
      <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
    `;

    productList.appendChild(productElement);
  }
}

function renderShoppingCart() {
  const shoppingCart = document.getElementById('shopping-cart');
  shoppingCart.innerHTML = '';

  for (const item of cart) {
    const itemElement = document.createElement('div');
    itemElement.className = 'shopping-item';
    itemElement.innerHTML = `
      <span>${item.product.name}</span>
      <span>Quantity: ${item.quantity}</span>
      <span>$${item.product.price * item.quantity}</span>
      <button class="remove-from-cart" data-product-id="${item.product.id}">Remove</button>
    `;

    shoppingCart.appendChild(itemElement);
  }

  const totalAmount = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  const totalElement = document.createElement('div');
  totalElement.className = 'shopping-item';
  totalElement.innerHTML = `
    <span>Total:</span>
    <span></span>
    <span>$${totalAmount}</span>
  `;

  shoppingCart.appendChild(totalElement);
}

function attachEventListeners() {
  const productList = document.getElementById('product-list');
  const clearCartButton = document.getElementById('clear-cart');

  productList.addEventListener('click', event => {
    if (event.target.classList.contains('add-to-cart')) {
      const productId = parseInt(event.target.dataset.productId);
      addToCart(products.find(product => product.id === productId), 1);
      renderShoppingCart();
    }
  });

  clearCartButton.addEventListener('click', () => {
    clearCart();
    renderShoppingCart();
  });

  const shoppingCart = document.getElementById('shopping-cart');
  shoppingCart.addEventListener('click', event => {
    if (event.target.classList.contains('remove-from-cart')) {
      const productId = parseInt(event.target.dataset.productId);
      removeFromCart(productId);
      renderShoppingCart();
    }
  });
}

renderProductList();
renderShoppingCart();
attachEventListeners();
