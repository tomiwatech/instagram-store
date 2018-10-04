import dotenv from 'dotenv';

dotenv.config();

const config = {
    testDB: process.env.TEST_DB,
};

export default config;