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
const showMessage = (message, type = 'error-text') => {
  const messageObj = document.getElementById('message');
  if (messageObj && message) {
    messageObj.innerHTML = message;
    messageObj.classList = type;
  }
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
    if (user.user.role !== 1 && user.user.role !== 2){
      setMessage('auth', 'Sorry you must be loggedin to access this section of the app');
      redirect(url);
    }
  } else {
    setMessage('auth', 'Sorry you must be loggedin to access this section of the app');
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
      <p class="card-content text-justify margin-top-bottom-1">${meal.description}
      </p>
      <div class="card-footer text-justify margin-top-bottom-1">
        <p><strong>Price:</strong>${meal.price}</p>
        <p class="text-center">
        <button class="btn btn-danger">Add to cart</button> 
        <button class="btn btn-success"><a href="user_order.html?mealId=${meal.id}" class="order-btn">View meal</a></button>
        </p>
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
    if (currentItem.item === item.item) exists = index;
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
    getCartCount();
  }
};

const getCart = () => JSON.parse(localStorage.getItem('cart'));

const formatCartItem = (item, serialNo) => {
  let cartRow = document.createElement('tr');
  cartRow.innerHTML = `<td>${serialNo}</td>
    <td class="item">${item.item}</td>
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

const clearCart = (redirectFlag) => {
  if (getCart()) {
    localStorage.removeItem('cart');
    getCartCount();
    if (redirectFlag) redirect('cart.html');
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

const calculateItemsTotal = (items) => {
  items.forEach((item) => {
    item.total = item.quantity * item.price;
  });
  return items;
};

const getCartCount = () => {
  const cartDisplay = document.querySelector('.cart-items');
  const cart = getCart();
  if (cart && cartDisplay) {
    cartDisplay.innerHTML = cart.length;
  }
  if (!cart && cartDisplay) {
    cartDisplay.innerHTML = 0;
  }
};

const displayOrders = (orders) => {
  if (orders) {
    const ordersTable = document.querySelector('.order-table');
    const tableHead = document.createElement('tr');

    tableHead.innerHTML = '<th>S/N</th><th>Order No</th><th>No.of Items</th><th>Total cost</th><th>Date</th><th></th>  <th></th><th></th>';
    ordersTable.appendChild(tableHead);
    orders.forEach((order) => {
      const tableRow = document.createElement('tr');
      tableRow.innerHTML = `
      <td>1</td>
      <td>${order.id}</td>
      <td>${order.items}</td>
      <td>${order.total_cost}</td>
      <td><button class="btn btn-dark"><a class="order-btn" href="order_summary.html?orderId=${order.id}">View</a></button></td>
      ${displayButtons(order.status)}
      `;
      ordersTable.appendChild(tableRow);
    });
  } else {
    showMessage('Sorry! No orders have been placed', 'error-text');
  }
};

const displayButtons = (status) => {
  const buttonsDisplay = {
    pending: `
    <td><button class="btn btn-primary status-accept" id="accept">Accept</button></td>
    <td><button class="btn btn-danger status-reject" id="reject">Reject</button></td>
    <td><button class="btn btn-success status-complete" id="complete">Complete</button></td>
    `,
    canceled: '<td><button class="btn btn-primary" id="accept" disabled>Canceled</button></td>',
    declined: '<td><button class="btn btn-primary" id="reject" disabled>Rejected</button></td>',
    accepted: `
    <td><button class="btn btn-primary" id="accept" disabled>Accepted</button></td>
    <td><button class="btn btn-success status-complete" id="complete">Complete</button></td>
    `,
    completed: '<td><button class="btn btn-success" id="complete" disabled>Completed</button></td>',
  };
  switch (status) {
  case 'Canceled':
    return buttonsDisplay.canceled;
  case 'Declined':
    return buttonsDisplay.declined;
  case 'Accepted':
    return buttonsDisplay.accepted;
  case 'Completed':
    return buttonsDisplay.completed;
  default:
    return buttonsDisplay.pending;
  }
};

const displaySummaryButtons = (status, container) => {
  const buttonContainer = document.createElement('p');
  buttonContainer.classList = 'text-center';
  const buttonsDisplay = {
    pending: `
    <button class="btn btn-primary status-accept" id="accept">Accept</button>
    <button class="btn btn-danger status-reject" id="reject">Reject</button>
    <button class="btn btn-success status-complete" id="complete">Complete</button>
    `,
    canceled: '<button class="btn btn-primary" id="accept" disabled>Canceled</button>',
    declined: '<button class="btn btn-primary" id="reject" disabled>Rejected</button>',
    accepted: `
    <button class="btn btn-primary" id="accept" disabled>Accepted</button>
    <button class="btn btn-success status-complete" id="complete">Complete</button>
    `,
    completed: '<button class="btn btn-success" id="complete" disabled>Completed</button>',
  };
  switch (status) {
  case 'Canceled':
    buttonContainer.innerHTML = buttonsDisplay.canceled;
    container.appendChild(buttonContainer);
    break;
  case 'Declined':
    buttonContainer.innerHTML = buttonsDisplay.declined;
    container.appendChild(buttonContainer);
    break;
  case 'Accepted':
    buttonContainer.innerHTML = buttonsDisplay.accepted;
    container.appendChild(buttonContainer);
    break;
  case 'Completed':
    buttonContainer.innerHTML = buttonsDisplay.completed;
    container.appendChild(buttonContainer);
    break;
  default:
    buttonContainer.innerHTML = buttonsDisplay.pending;
    container.appendChild(buttonContainer);
  }
};

const displayOrderDetails = (order, container) => {
  const detailsTable = document.createElement('table');
  detailsTable.classList.add('center-float', 'w6', 'clearfix', 'user-details', 'margin-bottom-4');
  detailsTable.innerHTML = `
  <tr class="order-info">
    <td><strong>Order number:</strong></td>
    <td>${orderId}</td>
  </tr>
  <tr class="order-info">
    <td><strong>Status:</strong></td>
    <td>${order.status}</td>
  </tr>
  <tr class="order-info">
    <td><strong>Recipient:</strong></td>
    <td>${order.firstname} ${order.lastname}</td>
  </tr>
  <tr class="order-info">
    <td><strong>Recipient Email:</strong></td>
    <td>${order.email}</td>
  </tr>
  <tr class="order-info">
    <td><strong>Recipient Phone number:</strong></td>
    <td>${order.phone}</td>
  </tr>
  <tr class="order-info">
    <td><strong>Recipient address:</strong></td>
    <td>${order.address}</td>
  </tr>
  `;

  container.appendChild(detailsTable);
};

const displayItemsTable = (orderItems, totalCost, status, container) => {
  const items = Array.from(orderItems);
  let count = 1;
  let totalQuantity = 0;
  const itemsTable = document.createElement('table');
  const tableHead = document.createElement('tr');
  const tableFooter = document.createElement('tr');
  itemsTable.classList.add('center-float', 'w6', 'clearfix');
  tableHead.innerHTML = `
    <th></th>
    <th>Item</th>
    <th>QTY</th>
    <th>Price</th>
    <th>Total</th> `;
  itemsTable.appendChild(tableHead);
  items.forEach((item) => {
    const itemRow = document.createElement('tr');
    itemRow.innerHTML = `
    <td>${count}</td>
    <td>${item.item}</td>
    <td>${item.quantity}</td>
    <td>${item.price}</td>
    <td>${item.total}</td>
    `;
    totalQuantity += item.quantity;
    count += 1;
    itemsTable.appendChild(itemRow);
  });
  tableFooter.innerHTML = `
    <td><strong>Total</strong></td>
    <td></td>
    <td><strong>${totalQuantity}</strong></td>
    <td></td>
    <td><strong>${totalCost}</strong></td>
  `;
  itemsTable.appendChild(tableFooter);
  container.appendChild(itemsTable);
  if (status === 'pending' && getDecodedUser() === 0) {
    const cancelButton = document.createElement('p');
    cancelButton.classList.add('text-center', 'margin-bottom-4');
    cancelButton.innerHTML = '<button class="btn btn-danger status-cancel">Cancel order</button>';
    container.appendChild(cancelButton);
  } else {
    displaySummaryButtons(status, container);
  }
};

const displayOrder = (order, container) => {
  displayOrderDetails(order, container);
  displayItemsTable(order.items, order.totalCost, order.status, container);
};

const getOrder = (orderId, orderContainer) => {
  if (!parseInt(orderId, 10)) showMessage('Sorry, the orderId must be a valid Integer greater than 0', 'error-text');
  fetch(`${ordersURL}/${orderId}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'x-access': getUserToken(),
    },
  })
    .then((response) => {
      return response.json()
        .then((orderResponse) => {
          if (response.ok) return orderResponse;
          throw orderResponse;
        })
        .then((data) => {
          displayOrder(data.order, orderContainer);
        })
    })
    .catch((error) => {
      if (error.status === 404) {
        showMessage(formatErrors(error.error), 'error-text');
      }
    });
};

const displayCancelButton = (status) => {
  if (status === 'pending') return '<td><button class="btn btn-danger status-cancel">Cancel</button></td>';
};

const getUserOrders = (userOrdersURL) => {
  fetch(userOrdersURL, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'x-access': getUserToken(),
    },
  })
    .then((response) => {
      return response.json()
        .then((ordersResponse) => {
          if (response.ok) return ordersResponse;
          throw ordersResponse;
        })
        .then((data) => {
          displayOrderHistory(data.orders);
          // displayOrders(data.orders, 'orders-container');
        })
    })
    .catch((error) => {
      if (error.status === 404) {
        showMessage(error.error, 'error-text');
      }
    });
};

const displayOrderHistory = (orders) => {
  const historyTable = document.createElement('table');
  const tableHead = document.createElement('tr');
  const count = 1;

  historyTable.classList.add('order-table', 'center-float', 'margin-bottom-4', 'margin-top-4');
  tableHead.innerHTML = `
  <th>S/N</th>
  <th>Order No</th>
  <th>No.of Items</th>
  <th>Total cost</th>
  <th>Status</th>
  <th></th>
  <th></th>
  `;
  historyTable.appendChild(tableHead);
  orders.forEach((order) => {
    const orderRow = document.createElement('tr');
    orderRow.innerHTML = `
    <td>${count}</td>
    <td>${order.id}</td>
    <td>${order.items}</td>
    <td>${order.total_cost}</td>
    <td>${order.status}</td>
    <td><button class="btn btn-dark"><a class="order-btn" href="order_summary.html?orderId=${order.id}">View</a></button></td>
    ${displayCancelButton(order.status)}
    `;
    historyTable.appendChild(orderRow);
    document.querySelector('.history-list').appendChild(historyTable);
  });
};
