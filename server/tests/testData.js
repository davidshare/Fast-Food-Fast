const newOrders = [
  {
  },
  {
    recipient: 'Mine Essien',
    recipientEmail: 'davidessienshare@gmail.com',
    recipientPhoneNumber: '08167462431',
    recipientAddress: 'Andela Epic tower Lagos',
    items: [
      {
        itemId: 1,
        item: 'Pepper soup',
        price: 2500,
        quantity: 2,
        total: 5000,
      },
      {
        itemId: 2,
        item: 'Ishiewu',
        price: 5000,
        quantity: 1,
        total: 5000,
      },
      {
        itemId: 3,
        item: 'Fried yam',
        price: 2000,
        quantity: 2,
        total: 4000,
      },
    ],
  },
  {
    recipient: 'Faith Obeten',
    recipientEmail: 'faithgem@gmail.com',
    recipientPhoneNumber: '08138463582',
    recipientAddress: 'Andela Epic tower Lagos',
    items: [
      {
        itemId: 1,
        item: 'Abak soup and semovita',
        price: 3500,
        quantity: 2,
        total: 700,
      },
    ],
  },
];

const newUsers = [
  {
    fullname: 'Faith Essien',
    email: 'faithgem@gmail.com',
    password: 'gemsharefaith',
    role: 0,
  },
  {
    fullname: 'Anastascia Demben',
    email: 'annademben@gmail.com',
    password: 'greatAnn',
    role: 1,
  },
  {
    fullname: 'Richard Demben',
    email: 'richard@gmail.com',
    password: 'richard4509',
    role: 2,
  },
];

export default { newUsers, newOrders };
