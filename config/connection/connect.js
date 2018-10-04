import { Client } from 'pg';
import config from '../configuration';
console.log(config);

const connectionString = config.testDB;

const client = new Client({
  connectionString,
});

client.connect();

export default client;