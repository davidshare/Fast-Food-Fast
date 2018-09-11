/**
 * @fileOverview – This module hosts dummy data to be used in the app
 * @exports orders– What is exported
 */

const orders = [
  {
  },
  {
    orderId: 1,
    orderStatus: 'Pending',
    recipient: 'David Essien',
    recipientEmail: 'davidessienshare@gmail.com',
    recipientPhoneNumber: '08167462431',
    recipientAddress: 'Andela Epic tower Lagos',
    dateTimeOrder: '1:50pm - Tue Sep 11 2018',
    dateTimeDelivery: '3:00pm - Tue Sep 11 2018',
    Items: [
      {
        itemId: 1,
        item: 'Onion soup',
        price: 3000,
        quantity: 5,
        total: 15000,
      },
      {
        itemId: 2,
        item: 'Ishiewu',
        price: 3000,
        quantity: 5,
        total: 15000,
      },
    ],
  },

  {
    orderId: 2,
    orderStatus: 'canceled',
    recipient: 'Sunday Essien',
    recipientEmail: 'sundaNelson@gmail.com',
    recipientPhoneNumber: '08167462431',
    recipientAddress: 'Andela Epic tower Lagos',
    dateTimeOrder: '1:50pm - Tue Sep 11 2018',
    dateTimeDelivery: '3:00pm - Tue Sep 11 2018',
    Items: [
      {
        itemId: 1,
        item: 'Tomatoes stew',
        price: 3000,
        quantity: 5,
        total: 15000,
      },
      {
        itemId: 2,
        item: 'vegetables shawarma',
        price: 3000,
        quantity: 5,
        total: 15000,
      },
    ],
  },
  {
    orderId: 3,
    orderStatus: 'Completed',
    recipient: 'Njesua Essien',
    recipientEmail: 'sundaNelson@gmail.com',
    recipientPhoneNumber: '08167462431',
    recipientAddress: 'Andela Epic tower Lagos',
    dateTimeOrder: '1:50pm - Tue Sep 11 2018',
    dateTimeDelivery: '3:00pm - Tue Sep 11 2018',
    Items: [
      {
        itemId: 1,
        item: 'Fried chicken',
        price: 3000,
        quantity: 5,
        total: 15000,
      },
      {
        itemId: 2,
        item: 'Fried yam',
        price: 3000,
        quantity: 5,
        total: 15000,
      },
    ],
  },
];

export default orders;
