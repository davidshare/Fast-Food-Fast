getMenu();

document.getElementById('meals-container').addEventListener('click', (event) => {
  if (event.target && event.target.classList.contains('btn-danger')) {
    const mealCard = event.target.parentElement.parentElement.parentElement.children;
    const item = mealCard[0].textContent;
    const price = parseInt(mealCard[1].children[0].textContent.split(':')[1], 10);
    addToCart({ item, quantity: 1, price });
    getCartCount();
  }
});