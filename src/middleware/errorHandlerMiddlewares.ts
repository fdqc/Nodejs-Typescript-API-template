import { Request, Response, NextFunction } from 'express';
import { CastError } from 'mongoose';

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
        return res.status(400).json({ errors: [{ msg: error.message }] });
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
        return res.status(400).json({ errors: [{ msg: 'resource_not_found' }] });
    } else {
        next(error);
    }
};

/**
 * General error handler
 */
export const errorHandler = (_error: any, _req: Request, res: Response, _next: NextFunction) => {
    return res.status(500).json({ errors: [{ msg: 'unexpected_error' }] });
};
