import { Express } from 'express';
import userRoutes from './app/routes/userRoutes';
import authRoutes from './app/routes/authRoutes';
import permissionRoutes from './app/routes/permissionRoutes';
import config from './config/config';

/**
 * Config routes for the app
 * @param app Express
 */
export const configRoutes = (app: Express) => {
    app.use(config.routePrefix, userRoutes);
    app.use(config.routePrefix, authRoutes);
    app.use(config.routePrefix, permissionRoutes);
};
