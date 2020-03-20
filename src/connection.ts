import mongoose from 'mongoose';
// Config promises
mongoose.Promise = global.Promise;

/**
 * Config and connect to MongoDB
 */
export const initMongo = () => {
    const mongoPath = process.env.MONGODB_PATH;

    // Connect
    mongoose.connect(mongoPath, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
        .catch(error => {
            // tslint:disable-next-line: no-console
            console.log('MongoDB connection error: ', error);
        });

    // Event listener on connection open
    mongoose.connection.once('open', () => {
        // tslint:disable-next-line: no-console
        console.log('Connected to MongoDB');
    });

    // Event listener on error
    mongoose.connection.on('error', (error) => {
        // tslint:disable-next-line: no-console
        console.log('MongoDB error: ', error);
    });
};
