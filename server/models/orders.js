/**
 * @fileOverview – This module hosts dummy data to be used in the app
 * @exports orders– What is exported
 */

const orders = [
  {
    orderStatus: 'canceled',
    recipient: 'Sunday Essien',
    recipientEmail: 'sundaNelson@gmail.com',
    recipientPhoneNumber: '08167462431',
    recipientAddress: 'Andela Epic tower Lagos',
    items: [
      {
        orderId: 1,
        item: 'Tomatoes stew',
        price: 3000,
        quantity: 5,
        total: 15000,
      },
      {
        orderId: 1,
        item: 'vegetables shawarma',
        price: 3000,
        quantity: 5,
        total: 15000,
      },
    ],
  },
  {
    orderStatus: 'Completed',
    recipient: 'Njesua Essien',
    recipientEmail: 'sundaNelson@gmail.com',
    recipientPhoneNumber: '08167462431',
    recipientAddress: 'Andela Epic tower Lagos',
    items: [
      {
        orderId: 2,
        item: 'Fried chicken',
        price: 3000,
        quantity: 5,
        total: 15000,
      },
      {
        orderId: 2,
        item: 'Fried yam',
        price: 3000,
        quantity: 5,
        total: 15000,
      },
    ],
  },
];

export default orders;
