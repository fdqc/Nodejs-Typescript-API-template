import dotenv from 'dotenv';
dotenv.config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default {
    environment: process.env.NODE_ENV,
    saltRounds: parseInt(process.env.SALT_ROUNDS, 10),
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT,
    mongo_path: process.env.NODE_ENV === 'production' ?
        process.env.MONGODB_PATH :
        process.env.MONGODB_LOCAL_PATH
};
