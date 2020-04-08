import config from '../../config/config';
import { createLogger, format, transports} from 'winston';
const { combine, timestamp, printf, json } = format;

// tslint:disable-next-line: no-shadowed-variable
const consoleFormat = printf(({ level, message, stack }) => {
    return `${level}: ${message} ${stack ? stack : ''}`;
});

export const log = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        json()
    ),
    transports: [
        // - Write all logs with level `error` and below to `error.log`
        new transports.File({ filename: './storage/logs/error.log', level: 'error' }),
        // - Write all logs with level `info` and below to `combined.log`
        new transports.File({ filename: './storage/logs/combined.log' })
    ]
});

if (config.environment !== 'production') {
    log.add(new transports.Console({
        level: 'silly',
        format: combine(
            format.simple(),
            consoleFormat
        )
    }));
}

/**
 * Meta tags
 */
export enum metaTags {
    MONGODB = 'MONGODB',
    AUTHENTICATION = 'AUTHENTICATION',
    UNEXPECTED = 'UNEXPECTED'
}
