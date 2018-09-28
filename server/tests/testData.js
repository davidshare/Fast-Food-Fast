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
    role: 0,
  },
  {
    fullname: 'Sharerudite Essien',
    email: 'sharerudite@gmail.com',
    password: 'gemshare,php1989@',
    role: 1,
  },
];

const newMeals = [
  {
    userId: 1,
    name: 'Rice and pepper soup',
    description: 'Rice and pepper soup consists of boiled rice and stew prepared with much paper and fish or meat with some spice',
    price: 3000,
  },
  {
    userId: 1,
    name: 'Ekpang',
    description: 'Ekpang Nkwukwo is one of the Nigerian cocoyam recipes made with grated cocoyam, water yam, cocoyam leaves and periwinkle.',
    price: 2500,
  },
  {
    userId: 1,
    name: 'Affang and Pounded yam',
    description: 'Affang is a native soup of the calabar people. The leaf is mostly gotten from forest areas. It is prepared with waterleaves and lots of dry fish and animal hide that has been soaked in water',
    price: 2500,
  },
];

export default { newUsers, newOrders, newMeals };
