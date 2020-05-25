import 'reflect-metadata';
import config from './config/config';

import loaders from './loaders';
import express from 'express';
import { log } from './shared/utils/logger';
import { getNetInterfaces } from './shared/utils/utils';

const startServer = async () => {
    // Create Express app
    const app = express();

    // Startup process
    await loaders(app);

    const netInterfaces = getNetInterfaces();

    // Start the server
    app.listen(config.port, () => {
        log.silly(`Server running at http://localhost:${config.port} in ${config.environment} mode`);
        log.silly(`API Docs at: http://localhost:${config.port}/api-docs`);
        log.silly(`API Docs also at: http://${netInterfaces[0]}:${config.port}/api-docs\n`);

        if (config.environment === 'production') { log.info('Server is up'); }
    });
};

startServer();
