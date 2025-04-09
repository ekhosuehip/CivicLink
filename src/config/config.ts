import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = process.env.MONGODB

const SERVER_PORT = process.env.PORT || 3000;

const config = {
    mongo: {
        url: DATABASE_URL 
    },
    server: {
        port: SERVER_PORT
    }
};

export default config