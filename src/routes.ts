import { Express } from 'express';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';

/**
 * Config routes for the app
 * @param app Express
 */
export const configRoutes = (app: Express) => {
    app.use('/api/v1', userRoutes);
    app.use('/api/v1', authRoutes);
};
