const orderId = window.location.href.split('?')[1].split('=')[1];
const orderContainer = document.querySelector('.order-summary');

getOrder(orderId, orderContainer);
removeLogoutLink();
removeAuthLinks();

document.querySelector('.order-summary').addEventListener('click', updateStatus);
