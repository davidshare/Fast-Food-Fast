const mealId = window.location.href.split('?')[1].split('=')[1];
const getMeal = () => {
  if(!parseInt(mealId, 10)) showMessage('Sorry, the mealId must be a valid Integer greater than 0', 'error-text');
  fetch(`${menuUrl}/${mealId}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.json()
        .then((mealResponse) => {
          if (response.ok) return mealResponse;
          throw mealResponse;
        })
        .then((data) => {
          displayMeal(data.meal, 'meal-container');
        })
    })
    .catch((error) => {
      if (error.status === 404) {
        showMessage(formatErrors(error.error), 'error-text');
      }
    });
};
document.querySelector('.no-auth').addEventListener('click', logout);
getMeal();
removeLogoutLink();
removeAuthLinks();
