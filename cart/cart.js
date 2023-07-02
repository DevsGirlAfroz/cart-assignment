// cart.js
const cart = [];

function addToCart(product, quantity) {
  const item = cart.find(item => item.product.id === product.id);
  
  if (item) {
    item.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }
}

function removeFromCart(productId) {
  const index = cart.findIndex(item => item.product.id === productId);

  if (index !== -1) {
    cart.splice(index, 1);
  }
}

function clearCart() {
  cart.length = 0;
}

export { cart, addToCart, removeFromCart, clearCart };
