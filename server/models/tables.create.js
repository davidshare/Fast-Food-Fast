const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY NOT NULL,
    fullname VARCHAR (100) NOT NULL,
    email VARCHAR(30) NOT NULL,
    phone INTEGER,
    password VARCHAR(255) NOT NULL,
    role INTEGER DEFAULT 0,
    address TEXT,
    status INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE DEFAULT now()
  );
`;

const createOrdersTable = `
  CREATE TABLE IF NOT EXISTS orders(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id),
    recipient_id INTEGER REFERENCES users(id),
    quantity INTEGER,
    total_cost INTEGER,
    status VARCHAR(10), 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated TIMESTAMP
  );
`;

const createMealsTable = `
  CREATE TABLE IF NOT EXISTS meals(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price INTEGER NOT NULL,
    picture VARCHAR(255),
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated TIMESTAMP
  );
`;

const createOrderItemsTable = `
  CREATE TABLE IF NOT EXISTS items(
    id SERIAL PRIMARY KEY NOT NULL,
    quantity INTEGER NOT NULL,
    total_cost INTEGER NOT NULL,
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated TIMESTAMP
  );
`;
const createQuery = `${createUsersTable}${createOrdersTable}${createMealsTable}${createOrderItemsTable}`;
export default createQuery;
