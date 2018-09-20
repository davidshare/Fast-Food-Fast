import createQuery from './tables.create';
import destroyQuery from './db.destroy';
import connection from '../helpers/conn';

const client = connection();
client.connect();

const dbQueries = `${destroyQuery}${createQuery}`;

client.query(dbQueries, () => {
  client.end();
});
