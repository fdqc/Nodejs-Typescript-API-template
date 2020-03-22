import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import './config/passport';
import { configRoutes } from './routes';
import { mongooseErrorHandler, errorHandler, authErrorHandler } from './middleware/errorHandlerMiddlewares';
import { initMongo } from './connection';

// Connect to MongoDB
initMongo();

// Create Express app
const app = express();

// Config Express app
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

// Config app's routes
configRoutes(app);

// Attach error handlers to the app
app.use(authErrorHandler);
app.use(mongooseErrorHandler);
app.use(errorHandler);

// Config express-swagger-generator
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
    files: ['./routes/*.js'] // Path to the API handle folder
};

expressSwagger(options);

export default app;
