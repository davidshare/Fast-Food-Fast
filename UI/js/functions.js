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
    currentMessage = window.localStorage.getItem(key);
    window.localStorage.removeItem(key);
  }
  return currentMessage;
};
const showMessage = (message, type) => {
  const messageObj = document.getElementById('message');
  messageObj.innerHTML = message;
  messageObj.classList = type;
};

const getUserRole = () => {
  const role = window.location.href === adminSignUpPage? 1 : 0;
  return role;
};

const removeAuthLinks = () => {
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
  const logoutLink = document.querySelector('#no-auth');
  if (!getUserToken() && logoutLink) {
    logoutLink.className = 'display-hide';
  }
};

const authenticateUser = (url) => {
  if (getUserToken()) {
    removeAuthLinks();
  } else if (window.location.href !== `${appUrl}index.html` && window.location.href !== appUrl) {
    setMessage('auth', 'Sorry you are not authorized to access this section.\nKindly login into your account');
    redirect(url);
  }
};

const authenticateAdmin = (url) => {
  if (getUserToken()) {
    removeAuthLinks();
    const user = getDecodedUser(getUserToken());
    if (user.user.role !== 1 && user.user.role !== 2) redirect(url);
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
    <button class="btn btn-danger"><a href="#" class="cart-btn">Add to cart</a></p></button>
  </div>
</div>`;
  document.getElementById(containterClass).appendChild(card);
};

const itemExists = (cart, item) => {
  let exists = 'e';
  cart.forEach((currentItem, index) => {
    if (currentItem.mealName === item.mealName) exists = index;
  });
  return exists;
};

const  addToCart = (item) => {
  let cart = [];
  if (getCart()) {
    cart = getCart();
    const exists = itemExists(cart, item);
    if (exists >= 0) {
      cart[exists].quantity = parseInt(cart[exists].quantity, 10) + parseInt(item.quantity, 10);
    } else {
      cart.push(item);
    }
    localStorage.removeItem('cart');
    localStorage.setItem('cart', JSON.stringify(cart));

  } else {
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
  }
};

const getCart = () => JSON.parse(localStorage.getItem('cart'));

const formatCartItem = (item, serialNo) => {
  let cartRow = document.createElement('tr');
  cartRow.innerHTML = `<td>${serialNo}</td>
    <td class="item">${item.mealName}</td>
    <td class="item_price">${item.price}</td>
    <td><input type="number" class="cart-quantity" value=${item.quantity}></td>
    <td class="price-total">${item.price * item.quantity}</td>
    <td><button class="btn btn-danger delete">X</button></td>
  `;
  return cartRow;
};

const displayCart = () => {
  const cartTable = document.getElementById('cart-table');
  const tableHead = document.createElement('tr');
  const tableFooter = document.createElement('tr');
  const cartSummary = document.createElement('tr');

  let totalPrice = 0;
  let totalItems = 0;
  let count = 1;

  cartSummary.classList = 'cart-summary';
  tableHead.classList = 'table-heading';
  tableHead.innerHTML = `
    <th>S/N</th>
    <th class="item">Item</th>
    <th>Price</th>
    <th>Quantity</th>
    <th>Total price</th>
    <th></th>
  `;

  tableFooter.classList = 'table-footer';
  tableFooter.innerHTML = `
    <td></td>
    <td class="item"></td>
    <td></td>
    <td></td>
    <td><button class="btn btn-primary continue">Continue shopping</button></td>
    <td><button class="btn btn-success"><a class="order-btn" href="checkout.html">Checkout</a></button></td>
  `;

  cartTable.appendChild(tableHead);

  if (getCart()) {
    getCart().forEach((item) => {
      cartTable.appendChild((formatCartItem(item, count)));
      count += 1;
      totalItems += parseInt(item.quantity, 10);
      totalPrice += parseInt(item.price, 10) * parseInt(item.quantity, 10);
    });
  } else {
    // document.querySelector('.table-heading').classList = 'display-hide';
    showMessage('Sorry you do not have any Items in your cart', 'error-text');
  }

  cartSummary.innerHTML = `<td><strong>Total</strong></td>
    <td class="item"></td>
    <td></td>
    <td><strong class="total-items">${totalItems}</strong></td>
    <td><strong class="total-price">${totalPrice}</strong></td>
    <td><button class="btn btn-dark clear-cart">Clear cart</button></td>`;
  cartTable.appendChild(cartSummary);
  cartTable.appendChild(tableFooter);
};

const clearCart = () => {
  if (getCart()) {
    localStorage.removeItem('cart');
    redirect('cart.html');
  }
};

const subtractPrice = (price) => {
  let totalPrice = document.querySelector('.total-price').textContent;
  totalPrice = parseInt(totalPrice, 10) - price;
}

const subtractQuantity = (quantity) => {
  let totalQuantity = document.querySelector('.total-items').textContent;
  totalQuantity = parseInt(totalQuantity, 10) - quantity;
}

const displayTotalPrice = (price) => {
  document.querySelector('.total-price').textContent = price;
};

const displayTotalQuantity = (quantity) => {
  document.querySelector('.total-items').textContent = quantity;
};

const removeItem = (parentElement) => {
  parentElement.removeChild(document.querySelector('.delete-me'));
};

const updateCart = (cart) => {
  localStorage.removeItem('cart');
  localStorage.setItem('cart', JSON.stringify(cart));
};