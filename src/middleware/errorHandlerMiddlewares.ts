import { Request, Response, NextFunction } from 'express';
import { CastError } from 'mongoose';
import { log, metaTags } from '../shared/utils/logger';

/**
 * @todo: find a better place to hold this class
 */
export class AuthError extends Error {
    public readonly name = 'auth';

    constructor(...args: string[]) {
        super(...args);
        Error.captureStackTrace(this, AuthError);
    }
}

/**
 * Auth error handler
 */
export const authErrorHandler = (error: AuthError, _req: Request, res: Response, next: NextFunction) => {
    if (error.name === 'auth') {
        log.error('Authentication error', { tag: metaTags.AUTHENTICATION, stack: error.stack });
        return res.status(401).json({ errors: [{ msg: error.message }] });
    } else {
        next(error);
    }
};

/**
 * Mongoose error handler:
 * kind: ObjectId
 */
export const mongooseErrorHandler = (error: CastError, _req: Request, res: Response, next: NextFunction) => {
    if (error.kind === 'ObjectId') {
        log.error('MongoDB error ', { tag: metaTags.MONGODB, stack: error.stack });
        return res.status(400).json({ errors: [{ msg: 'resource_not_found' }] });
    } else {
        next(error);
    }
};

/**
 * General error handler
 */
export const errorHandler = (error: any, _req: Request, res: Response, _next: NextFunction) => {
    log.error('Unexpected error ', { tag: metaTags.UNEXPECTED, stack: error.stack });
    return res.status(500).json({ errors: [{ msg: 'unexpected_error' }] });
};
