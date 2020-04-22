import { Mongoose } from 'mongoose';
import Agenda from 'agenda';
import config from '../config/config';

export default (connection: Mongoose) => {
    return new Agenda({
        mongo: connection.connection.db,
        db: { collection: config.agenda.collection }
    });
};
