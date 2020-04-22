import Agenda from 'agenda';
import config from '../config/config';

export default (agenda: Agenda) => {
    /**
     * Job Processors
     */
    agenda.define('some long running job', async _job => {
        await new Promise((resolve, _reject) => {
            setTimeout(() => {
                return resolve();
            }, 3000);
        });
    });

    if (config.agenda.isEnabled === 'true') { agenda.start(); }
};
