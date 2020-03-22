import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { UserSchema } from '../../models/userSchema';
import { AuthService } from '../../services/authService';
import { UserRegisterI } from '../../interfaces/user';

/**
 * Authenticates and logs in the user in the app
 */
export const login = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const authServiceInstance = new AuthService();
    const token = await authServiceInstance.authenticate(email, password);

    return res.status(200).json({ token: token });
};

/**
 * Registers a user in the app
 */
export const regster = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const userDTO: UserRegisterI = req.body;

    const authServiceInstance = new AuthService();
    const token = await authServiceInstance.register(userDTO);

    return res.status(201).json({ token: token });
};

/**
 * Returns a validations array for the specified method
 * @param method string
 */
export function validate(method: string) {
    let validations: any[] = [];

    switch (method) {
        case 'login': {
            validations = [
                check('email').exists().withMessage('email_required')
                    .not().isEmpty().withMessage('email_can_not_be_empty')
                    .isEmail().withMessage('invalid_email'),
                check('password').exists().withMessage('password_required')
                    .not().isEmpty().withMessage('password_can_not_be_empty')
                    .isLength({ min: 5 }).withMessage('password_min_length_5')
            ];
            break;
        }
        case 'register': {
            validations = [
                check('email').exists().withMessage('email_required')
                    .not().isEmpty().withMessage('email_can_not_be_empty')
                    .isEmail().withMessage('invalid_email')
                    .custom(async value => {
                        try {
                            const foundUserDoc = await UserSchema.find({
                                email: value
                            });

                            if (foundUserDoc.length > 0) {
                                return Promise.reject('email_already_taken');
                            } else {
                                return Promise.resolve();
                            }
                        } catch (error) {
                            return Promise.reject('unexpexted_error');
                        }
                    }),
                check('password').exists().withMessage('password_required')
                    .not().isEmpty().withMessage('password_can_not_be_empty')
                    .isLength({ min: 5 }).withMessage('password_min_length_5')
            ];
            break;
        }
    }

    return validations;
}
