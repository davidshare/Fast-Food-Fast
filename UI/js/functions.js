const formatErrors = (errorObject) => {
  if (typeof errorObject === 'string') return errorObject;
  let errorString;
  for (key in errorObject) {
    errorString+= `<li>${errorObject[key]}</li>`;
  }
  return `<ul>${errorString}</ul>`;
};

const redirect = (link) => {
  window.location.href = link;
};

const setMessage = (key, message) => {
  if (window.localStorage) {
    localStorage.setItem(key, message);
  }
};

const getUserToken = () => localStorage.getItem('userToken') || null;

const getMessage = (key) => {
  let currentMessage;
  if (window.localStorage) {
    currentMessage = localStorage.getItem(key);
    localStorage.removeItem(key);
  }
  return currentMessage;
};
const showMessage = (message, type) => {
  const messageObj = document.getElementById('message');
  messageObj.innerHTML = message;
  messageObj.classList.add(type);
};

const getUserRole = () => {
  const role = window.location.href === adminSignUpPage? 1 : 0;
  return role;
};

const removeAuthLinks = () =>{
  const adminAuth = document.querySelectorAll('.admin-auth');
  const userAuth = document.querySelectorAll('.auth');
  if (adminAuth) {
    adminAuth.forEach((link) => {
      link.className = 'display-hide';
    });
  }

  if (userAuth) {
    userAuth.forEach((link) => {
      link.className = 'display-hide';
    });
  }
};

const removeLogoutLink = () => {
  const logoutLink = document.querySelector('.no-auth');
  if (!getUserToken() && logoutLink) {
    logoutLink.className = 'display-hide';
  }
};

const authenticateUser = (url) => {
  if (getUserToken()) {
    removeAuthLinks();
    removeLogoutLink();
  } else if (window.location.href !== `${appUrl}/index.html`) {
    setMessage('auth', 'Sorry you are not authorized to access this section.\nKindly login into your account');
    redirect(url);
  }
};

const authenticateAdmin = (url) => {
  if (getUserToken()) {
    removeAuthLinks();
    removeLogoutLink();
    const user = getDecodedUser(getUserToken());
    if(user.user.role !== 1 && user.user.role !== 2)
    redirect(url);
  }
};

const setAuthentication = (userData) => {
  setMessage('userToken', userData.token);
};

const logout = () => {
  localStorage.removeItem('userToken');
  redirect(`${appUrl}`);
};

const getDecodedUser = () => {
  if(localStorage.getItem('userToken')) {
    return jwt_decode(localStorage.getItem('userToken'));
  }  
};

const formatMeal = (meal) => {
  const card = document.createElement('div');
  card.classList.add('card', 'w3', 'left-float');
  card.innerHTML = 
  `<div class="card-img">
    <img src="${meal.picture}" alt="${meal.name} image">
  </div>
  <div class="card-body">
      <h3 class="card-title margin-top-bottom-1">${meal.name}</h3>
      <p class="card-content text-justify margin-top-bottom-1">${meal.description}</p>
      <div class="card-footer text-justify margin-top-bottom-1">
        <p><strong>Price:</strong>${meal.price}</p>
        <button class="btn btn-danger"><a href="user_order.html?mealId=${meal.id}" class="order-btn">Order now</a></p></button>
    </div>
  </div>
  `;
  return card;
};

const displayMeals = (meals, containterClass) => {
  const container = document.getElementById(containterClass);
  meals.forEach((meal) => {
    container.appendChild(formatMeal(meal));
  });
};

const displayMeal = (meal, containterClass) => {
  const card = document.createElement('div');
  card.classList.add('card', 'w4', 'order-card', 'center-float');
  card.innerHTML = `<div class="card-img">
  <img src="${meal.picture}" alt="${meal.name} image">
</div>
<div class="card-body">
  <h3 class="card-title margin-top-bottom-1">${meal.name}</h3>
  <p class="card-content text-justify margin-top-bottom-1">
  ${meal.description}
  </p>
  <div class="card-footer text-justify margin-top-bottom-1">
    <p><strong>Price:</strong> N<span class="card-price">${meal.price}</span></p>
    <p><strong>Quantity:</strong> <input type="number" class="card-quantity" name="quantity" value=0 required></p>
    <p><strong>Total:</strong> <span class="card-total"></span></p>
    <button class="btn btn-danger"><a href="cart.html" class="cart-btn">Add to cart</a></p></button>
  </div>
</div>`;
  document.getElementById(containterClass).appendChild(card);
};
