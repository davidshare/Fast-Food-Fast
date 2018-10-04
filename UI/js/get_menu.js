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
document.querySelector('.no-auth').addEventListener('click', logout);
getMenu();
removeLogoutLink();
removeAuthLinks();
