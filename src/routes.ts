import { Express } from 'express';
import userRoutes from './app/routes/userRoutes';
import authRoutes from './app/routes/authRoutes';
import permissionRoutes from './app/routes/permissionRoutes';

/**
 * Config routes for the app
 * @param app Express
 */
export const configRoutes = (app: Express) => {
    app.use('/api/v1', userRoutes);
    app.use('/api/v1', authRoutes);
    app.use('/api/v1', permissionRoutes);
};
