import dotenv from 'dotenv';

dotenv.config();

const config = {
    testDB: process.env.DATABASE_URL,
};

export default config;