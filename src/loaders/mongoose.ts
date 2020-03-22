import mongoose from 'mongoose';
// Config promises
mongoose.Promise = global.Promise;

/**
 * Config and connect to MongoDB
 */
export default async () => {
    const mongoPath = process.env.MONGODB_PATH;

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

    // Connect
    try {
        const connection = await mongoose.connect(mongoPath, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

        return connection;
    } catch (error) {
        // tslint:disable-next-line: no-console
        console.log('MongoDB connection error: ', error);
    }
};
