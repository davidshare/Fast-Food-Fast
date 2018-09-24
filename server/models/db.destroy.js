const usersDestroy = 'DROP TABLE IF EXISTS users CASCADE; ';
const mealsDestroy = 'DROP TABLE IF EXISTS meals CASCADE; ';
const ordersDestroy = 'DROP TABLE IF EXISTS orders CASCADE; ';
const itemsDestroy = 'DROP TABLE IF EXISTS items CASCADE; ';

const destroyQuery = `${itemsDestroy}${ordersDestroy}${mealsDestroy}${usersDestroy}`;

export default destroyQuery;
