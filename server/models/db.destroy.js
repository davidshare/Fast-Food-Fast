const usersDestroy = 'DROP TABLE IF EXISTS users CASCADE; ';
const mealsDestroy = 'DROP TABLE IF EXISTS meals CASCADE; ';
const ordersDestroy = 'DROP TABLE IF EXISTS orders CASCADE; ';
const recipientDestroy = 'DROP TABLE IF EXISTS recipient CASCADE; ';
const itemsDestroy = 'DROP TABLE IF EXISTS items CASCADE; ';

const destroyQuery = `${itemsDestroy}${mealsDestroy}${recipientDestroy}${ordersDestroy}${usersDestroy}`;

export default destroyQuery;
