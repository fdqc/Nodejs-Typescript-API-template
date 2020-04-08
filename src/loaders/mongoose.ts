import mongoose from 'mongoose';
import config from '../config/config';
import { log, metaTags } from '../shared/utils/logger';

// Config promises
mongoose.Promise = global.Promise;

/**
 * Config and connect to MongoDB
 */
export default async () => {
    const mongoPath = config.mongo_path;

    // Event listener on connection open
    mongoose.connection.once('open', () => {
        log.silly('Connected to MongoDB');

        if (config.environment === 'production') { log.info('Connected to MongoDB'); }
    });

    // Event listener on error
    mongoose.connection.on('error', (error) => {
        log.error('MongoDB error', { tag: metaTags.MONGODB, stack: error.stack});
    });

    // Connect
    try {
        const connection = await mongoose.connect(
            mongoPath,
            {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            }
        );

        return connection;
    } catch (error) {
        log.error('MongoDB connection error', { tag: metaTags.MONGODB, stack: error.stack });
    }
};
