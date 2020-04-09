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

/**
 * Check if value is a shiro-like string
 * in the form of root:sub:* or root:*
 * @todo: improve regex
 * @param value string
 */
export const isShiroRootLvl = (value: string) => {
    const regEx = /^\w+(:\w+)?:\*$/;
    return regEx.test(value);
};

/**
 * Check if value is a shiro-like string
 * in the form of root:sub:sub or root:sub
 * @todo: improve regex
 * @param value string
 */
export const isShiro = (value: string) => {
    const regEx = /^\w+(:\w+)?:\w+$/;
    return regEx.test(value);
};
