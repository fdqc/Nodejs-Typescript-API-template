import { Express } from 'express';
import expressLoader from './express';
import mongooseLoader from './mongoose';
import dependencyInjectionLoader from './dependencyInjection';
import agendaLoader from './agenda';
import jobsLoader from './jobProcessors';

export default async (app: Express) => {
    const connection = await mongooseLoader();

    const agenda = agendaLoader(connection);
    jobsLoader(agenda);

    dependencyInjectionLoader(agenda);

    await expressLoader(app);
};
