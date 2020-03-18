import { Request, Response } from 'express';

/**
 * Get the users list
 */
export const users = (req: Request, res: Response) => {
    // Get users
    return res.status(200).json({});
};
