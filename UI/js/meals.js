const getMealInput = () => {
  const name = document.getElementById('meal-name').value.trim();
  const description = document.getElementById('meal-description').value.trim();
  const price = document.getElementById('meal-price').value.trim();
  const picture = document.getElementById('meal-img').value.trim();
  return {
    name, description, price, picture,
  };
};

const addMeal = (event) => {
  event.preventDefault();
  if (validateMeal(getMealInput())) {
    fetch(menuUrl, {
      method: 'POST',
      mode: 'cors',
      headers: { 
        'Content-Type': 'application/json',
        'x-access': getUserToken(),
      },      
      body: JSON.stringify(getMealInput()),
    })
      .then((response) => {
        return response.json()
          .then((newMealResponse) => {
            if (response.ok) return newMealResponse;
            throw newMealResponse;
          })
          .then((data) => {
            setMessage('fff_signup', data.message);
            redirect(`../${menuPage}`);
          })
      })
      .catch((error) => {
        if (error.status === 403 || error.status === 401 || error.status === 406) {
          showMessage(formatErrors(error.error), 'error-text');
        }
      });
  }
};

const validateMeal = (mealObject) => {
  let errorFlag = true;
  document.getElementById('meal_msg').innerHTML = '';
  document.getElementById('desc_msg').innerHTML = '';
  document.getElementById('price_msg').innerHTML = '';
  document.getElementById('pic_msg').innerHTML = '';
  document.getElementById('message').innerHTML = '';

  const { name, description, price, picture, } = mealObject;
  if (name === '' || description === '' || price === '' || picture === '') {
    showMessage('Sorry all the fields are required', 'error-text');
    return false;
  }

  if (!rules.mealLength.test(name)) {
    errorFlag = false;
    document.getElementById('meal_msg').innerHTML = errorsMessages.mealLength;
  } else if (!rules.validMeal.test(name)) {
    errorFlag = false;
    document.getElementById('meal_msg').innerHTML = errorsMessages.invalidMeal;
  }

  if (!rules.descLength.test(description)) {
    errorFlag = false;
    document.getElementById('desc_msg').innerHTML = errorsMessages.descLength;
  } else if (!rules.validDesc.test(description)) {
    errorFlag = false;
    document.getElementById('desc_msg').innerHTML = errorsMessages.invalidDesc;
  }

  if (!rules.validPrice.test(price)) {
    errorFlag = false;
    document.getElementById('price_msg').innerHTML = errorsMessages.invalidPrice;
  } 

  if (!rules.validUrl.test(picture)) {
    errorFlag = false;
    document.getElementById('pic_msg').innerHTML = errorsMessages.invalidPic;
  }

  return errorFlag;
};

document.getElementById('add-meal-btn').addEventListener('click', addMeal);

