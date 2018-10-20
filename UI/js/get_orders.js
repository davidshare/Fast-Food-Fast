const getOrders = () => {
  fetch(ordersURL, {
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
          displayOrders(data.orders, 'orders-container');
        })
    })
    .catch((error) => {
      if (error.status === 404) {
        showMessage(error.error, 'error-text');
      }
    });
};
getOrders();
document.querySelector('.history-list').addEventListener('click', updateStatus);
