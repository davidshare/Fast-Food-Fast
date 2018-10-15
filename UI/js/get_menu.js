const getMenu = () => {
  fetch(menuUrl, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.json()
        .then((menuResponse) => {
          if (response.ok) return menuResponse;
          throw menuResponse;
        })
        .then((data) => {
          displayMeals(data.menu, 'meals-container');
        })
    })
    .catch((error) => {
      if (error.statusCode === 404) {
        showMessage(formatErrors(error.error), 'error-text');
      }
    });
};
getMenu();

document.getElementById('meals-container').addEventListener('click', (event) => {
  if (event.target && event.target.classList.contains('btn-danger')) {
    const mealCard = event.target.parentElement.parentElement.parentElement.children;
    const item = mealCard[0].textContent;
    const price = parseInt(mealCard[2].children[0].textContent.split(':')[1], 10);
    addToCart({ item, quantity: 1, price });
  }
});