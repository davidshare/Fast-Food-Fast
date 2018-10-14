const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY NOT NULL,
    firstname VARCHAR (40) NOT NULL,
    lastname VARCHAR (40) NOT NULL,
    email VARCHAR(30) NOT NULL,
    password VARCHAR(255),
    role INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE DEFAULT now()
  );
`;

const createRecipientTable = `
  CREATE TABLE IF NOT EXISTS recipient(
    id SERIAL PRIMARY KEY NOT NULL,
    firstname VARCHAR (40) NOT NULL,
    lastname VARCHAR (40) NOT NULL,
    email VARCHAR(30) NOT NULL,
    phone BIGINT,
    address TEXT,
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE DEFAULT now()
  );
`;

const createOrdersTable = `
  CREATE TABLE IF NOT EXISTS orders(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER REFERENCES users(id),
    recipient_id INTEGER REFERENCES users(id),
    items INTEGER NOT NULL,
    quantity INTEGER,
    total_cost INTEGER,
    status VARCHAR(10) DEFAULT 'Pending', 
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE DEFAULT now()
  );
`;

const createMealsTable = `
  CREATE TABLE IF NOT EXISTS meals(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL UNIQUE,
    description VARCHAR(255) NOT NULL UNIQUE,
    price INTEGER NOT NULL,
    picture TEXT,
    user_id INTEGER REFERENCES users(id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE DEFAULT now()
  );
`;

const createOrderItemsTable = `
  CREATE TABLE IF NOT EXISTS items(
    id SERIAL PRIMARY KEY NOT NULL,
    item VARCHAR(100) NOT NULL,
    quantity INTEGER NOT NULL,
    price INTEGER NOT NULL,
    total INTEGER NOT NULL,
    order_id INTEGER REFERENCES orders(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated TIMESTAMP WITH TIME ZONE DEFAULT now()
  );
`;
const createQuery = `${createUsersTable}${createRecipientTable}${createOrdersTable}${createMealsTable}${createOrderItemsTable}`;
export default createQuery;
