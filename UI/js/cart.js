displayCart();
const cartTable = document.getElementById('cart-table');
cartTable.addEventListener('click', (event) => {
  if (event.target && event.target.classList.contains('clear-cart')) {
    clearCart(true);
  }

  if (event.target && event.target.classList.contains('continue')) {
    redirect('meals.html');
  }

  if (event.target && event.target.classList.contains('delete')) {
    const itemRow = event.target.parentElement.parentElement;
    itemRow.classList.add('delete-me');
    const table = itemRow.parentElement;
    const rowElements = itemRow.children;
    const mealName = rowElements[1].textContent;
    const cart = getCart();
    let itemIndex;
    cart.forEach((item, index) => {
      if (item.item === mealName) {
        itemIndex = index;
        return 0;
      }
    });
    cart.splice(itemIndex, 1);
    updateCart(cart);
    const itemTotalPrice = parseInt(rowElements[4].textContent, 10);
    const itemQuantity = parseInt(rowElements[3].children[0].value, 10);
    displayTotalQuantity(subtractQuantity(itemQuantity));
    displayTotalPrice(subtractPrice(itemTotalPrice));
    removeItem(table);
    getCartCount();
  }
});

cartTable.addEventListener('change', (event) => {
  if (event.target && event.target.classList.contains('cart-quantity')) {
    const itemRow = event.target.parentElement.parentElement;
    // itemRow.classList.add('delete-me');
    // const table = itemRow.parentElement;
    const rowElements = itemRow.children;
    const mealName = rowElements[1].textContent;
    const mealPrice = parseInt(rowElements[2].textContent, 10);
    const mealQuantity = parseInt(rowElements[3].children[0].value, 10);
    const cart = getCart();
    let itemIndex;
    cart.forEach((item, index) => {
      if (item.item === mealName) {
        itemIndex = index;
        return 0;
      }
    });
    cart[itemIndex].quantity = mealQuantity;
    updateCart(cart);  
    rowElements[4].textContent = mealPrice * mealQuantity;
    let totalPrices;
    let totalQuantity;

    const allPrices = [...document.querySelectorAll('.price-total')];
    if (allPrices.length<=1) {
      totalPrices = allPrices[0].textContent;
    } else {
      totalPrices = allPrices.reduce((prev, next) => {
        return parseInt(prev.textContent, 10) + parseInt(next.textContent, 10);
      });
    }

    const itemQuantity = [...document.querySelectorAll('.cart-quantity')];
    if(itemQuantity.length <= 1) {
      totalQuantity = itemQuantity[0].value;
    }else{
      totalQuantity = itemQuantity.reduce((prev, next) => {
        return parseInt(prev.value, 10) + parseInt(next.value, 10);
      });
    }
    displayTotalPrice(totalPrices);
    displayTotalQuantity(totalQuantity);
  }
});
