import { Express } from 'express';
import expressLoader from './express';
import mongooseLoader from './mongoose';

export default async (app: Express) => {
    await mongooseLoader();
    await expressLoader(app);
};
