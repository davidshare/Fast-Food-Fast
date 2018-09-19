import createQuery from './tables.create';
import destroyQuery from './db.destroy';
import connection from '../helpers/conn';

const client = connection();
client.connect();

const dbQueries = `${destroyQuery}${createQuery}`;
console.log(dbQueries);

client.query(dbQueries, (error) => {
  console.log(error);
  client.end();
});
