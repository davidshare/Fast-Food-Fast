import dotenv from 'dotenv';
import { Client } from 'pg';
import setup from '../config/config';

dotenv.config();
const connection = () => {
  let config;
  if (process.env.NODE_ENV === 'test') {
    config = setup.test.dbTestUrl;
  } else {
    config = setup.development.DATABASE_URL;
  }
  const client = new Client(config);
  return client;
};


export default connection;
