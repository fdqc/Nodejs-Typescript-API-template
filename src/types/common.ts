import { Request, Response, NextFunction } from 'express';

/**
 * Type of async functions asyncWrapper accepts
 */
export type AsyncFunction = (req: Request, res: Response, next: NextFunction ) => Promise<Response>;
