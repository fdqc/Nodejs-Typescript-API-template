import { Container } from 'typedi';
import { Request, Response } from 'express';
import { validationResult, param, query } from 'express-validator';
import { UserService } from '../../services/userService';

/**
 * Get the users list
 */
export const users = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const userServiceInstance =  Container.get(UserService);

    const page = req.query.page ? req.query.page.toString() : '0';
    const page_size = req.query.page_size ? req.query.page_size.toString() : '0';

    const usersList = await userServiceInstance.usersList(page, page_size);
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
        case 'usersList': {
            validations = [
                query('page').isInt().withMessage('page_must_be_an_integer')
                    .isInt({ min: 0 }).withMessage('page_min_value_is_0')
                    .optional(),
                query('page_size').isInt().withMessage('page_size_must_be_an_integer')
                    .isInt({ min: 1 }).withMessage('page_min_value_is_1')
                    .optional()
            ];
            break;
        }
    }

    return validations;
}
