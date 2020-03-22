import dotenv from 'dotenv';
dotenv.config();

import loaders from './loaders';
import express from 'express';

const port = process.env.PORT || 3000;
const environtment = process.env.NODE_ENV || 'development';

const startServer = async () => {
    // Create Express app
    const app = express();

    // Startup process
    await loaders(app);

    // Start the server
    app.listen(port, () => {
        // tslint:disable-next-line: no-console
        console.log(`Server running at http://localhost:${port} in ${environtment} mode`);
        // tslint:disable-next-line: no-console
        console.log(`API Docs at: http://localhost:${port}/api-docs\n`);
    });
};

startServer();
