import { Request, Response, NextFunction } from 'express';
import * as shiroTrie from 'shiro-trie';
import { AuthError } from './errorHandlerMiddlewares';

/**
 * Checks user's permissions to
 * access the route
 * @param permissions string[]
 */
export const checkPermissions = (permissions: string[]) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const checksArr = [];
        const userPermissions = shiroTrie.newTrie();
        userPermissions.add(...req.user.permissions);

        for (const permission of permissions) {
            checksArr.push(userPermissions.check(permission));
        }

        if (checksArr.indexOf(false) !== -1) {
            throw new AuthError('unauthorized');
        } else {
            next();
        }
    };
};
