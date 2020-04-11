import { Container } from 'typedi';
import { Request, Response } from 'express';
import { validationResult, param } from 'express-validator';
import { UserService } from '../../services/userService';

/**
 * Get the users list
 */
export const users = async (_req: Request, res: Response) => {
    const userServiceInstance =  Container.get(UserService);

    const usersList = await userServiceInstance.usersList();
    return res.status(200).json(usersList);
};

/**
 * Get info from a particular user
 */
export const show = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const userServiceInstance =  Container.get(UserService);
    const user = await userServiceInstance.getUser(req.params.id);

    return user ? res.status(200).json(user) :
        res.status(404).json({ errors: [{ msg: 'user_not_found' }] });
};

/**
 * Returns a validations array for the specified method
 * @param method string
 */
export function validate(method: string) {
    let validations: any[] = [];

    switch (method) {
        case 'show': {
            validations = [
                param('id').isMongoId().withMessage('invalid_id')
            ];
            break;
        }
    }

    return validations;
}
