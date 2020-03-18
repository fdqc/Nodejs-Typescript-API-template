import { Request, Response, NextFunction } from 'express';

/**
 * Mongoose error handler:
 * kind: ObjectId
 */
export const mongooseErrorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    if (error.kind === 'ObjectId') {
        res.status(400).json({ errors: [{ msg: 'resource_not_found' }] });
    } else {
        next(error);
    }
};

/**
 * General error handler
 */
export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ errors: [{ msg: 'unexpected_error' }] });
};
