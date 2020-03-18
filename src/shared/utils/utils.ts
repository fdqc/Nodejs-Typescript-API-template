import { Request, Response, NextFunction } from 'express';

/**
 * Async function wrapper to catch errors and hand them
 * to the error handling middleware
 * @param foo Function
 */
export const asyncWrapper = (foo: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        foo(req, res, next).catch(next);
    };
};
