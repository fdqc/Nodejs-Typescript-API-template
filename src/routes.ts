import { Express } from 'express';
import userRoutes from './app/routes/userRoutes';
import authRoutes from './app/routes/authRoutes';

/**
 * Config routes for the app
 * @param app Express
 */
export const configRoutes = (app: Express) => {
    app.use('/api/v1', userRoutes);
    app.use('/api/v1', authRoutes);
};
