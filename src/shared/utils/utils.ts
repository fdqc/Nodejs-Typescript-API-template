import { Request, Response, NextFunction } from 'express';
import { AsyncFunction } from '../../types/common';

/**
 * Async function wrapper to catch errors and hand them
 * to the error handling middleware
 * @param foo AsyncFunction
 */
export const asyncWrapper = (foo: AsyncFunction) => {
    return (req: Request, res: Response, next: NextFunction) => {
        foo(req, res, next).catch(next);
    };
};
