import { Client } from "pg";
import config from "../configuration";

const connectionString = config.testDB;

const client = new Client({
    connectionString
});

client.connect();

export default client;
