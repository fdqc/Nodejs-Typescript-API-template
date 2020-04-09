import { Express } from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from 'cors';
import './passport';
import { configRoutes } from '../routes';
import { mongooseErrorHandler, errorHandler,
    authErrorHandler, mongoErrorHandler } from '../middleware/errorHandlerMiddlewares';
import config from '../config/config';

export default async (app: Express) => {
    // Config Express app
    app.set('port', config.port || 3000);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(passport.initialize());

    // Config CORS
    const corsOpts = config.environment === 'production' ? config.corsOptions : {};
    app.use(cors(corsOpts));

    // Enabling CORS Pre-Flight
    app.options('*', cors());

    // Config app's routes
    configRoutes(app);

    // Attach error handlers to the app
    app.use(authErrorHandler);
    app.use(mongooseErrorHandler);
    app.use(mongoErrorHandler);
    app.use(errorHandler);

    // Config express-swagger-generator
    if (config.environment === 'development') {
        // Serve the Docs only in development
        const expressSwagger = require('express-swagger-generator')(app);
        const options = {
            swaggerDefinition: {
                info: {
                    description: 'API Docs',
                    title: 'Typescript Node API',
                    version: '1.0.0',
                },
                basePath: '/api/v1',
                produces: [
                    'application/json',
                    'application/xml'
                ],
                schemes: ['http', 'https'],
                securityDefinitions: {
                    JWT: {
                        type: 'apiKey',
                        in: 'header',
                        name: 'Authorization',
                        description: 'Value: bearer TOKEN',
                    }
                }
            },
            basedir: __dirname, // app absolute path
            files: ['../app/routes/*.js'] // Path to the API handle folder
        };

        expressSwagger(options);
    }
};
