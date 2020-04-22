import dotenv from 'dotenv';
dotenv.config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Trusted origins
const whitelist = ['http://example1.com', 'http://example2.com'];

export default {
    environment: process.env.NODE_ENV,
    saltRounds: parseInt(process.env.SALT_ROUNDS, 10),
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT,
    mongo_path: process.env.NODE_ENV === 'production' ?
        process.env.MONGODB_PATH :
        process.env.MONGODB_LOCAL_PATH,
    corsOptions: {
        origin: (origin: string, callback: Function) => {
            if (whitelist.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                /** @todo: add an error handler for cors */
                callback(new Error('not_allowed_by_CORS'));
            }
        }
    },
    routePrefix: '/api/v1',
    agenda: {
        collection: process.env.AGENDA_COLLECTION || 'agendaJobs',
        isEnabled: process.env.AGENDA_ENABLE || false
    }
};
