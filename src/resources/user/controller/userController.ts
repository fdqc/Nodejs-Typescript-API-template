import { Request, Response } from 'express';

/**
 * Get the users list
 */
export const users = (_req: Request, res: Response) => {
    // Get users
    return res.status(200).json({});
};
