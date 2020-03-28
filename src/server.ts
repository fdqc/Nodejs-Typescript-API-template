import 'reflect-metadata';
import config from './config/config';

import loaders from './loaders';
import express from 'express';

const startServer = async () => {
    // Create Express app
    const app = express();

    // Startup process
    await loaders(app);

    // Start the server
    app.listen(config.port, () => {
        // tslint:disable-next-line: no-console
        console.log(`Server running at http://localhost:${config.port} in ${config.environment} mode`);
        // tslint:disable-next-line: no-console
        console.log(`API Docs at: http://localhost:${config.port}/api-docs\n`);
    });
};

startServer();
