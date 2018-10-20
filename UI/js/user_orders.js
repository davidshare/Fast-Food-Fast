const userId = getDecodedUser().user.id;
const userOrdersURL = `${baseUrl}users/${userId}/orders`;
getUserOrders(userOrdersURL);

document.querySelector('.history-list').addEventListener('click', updateStatus);
