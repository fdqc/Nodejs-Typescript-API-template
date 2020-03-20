import { Request, Response, NextFunction } from 'express';
import { CastError } from 'mongoose';

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
