import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import { UserSchema } from '../../user/schema/userSchema';
import bcrypt from 'bcrypt';
import * as jwt from 'jwt-simple';

/**
 * Authenticates and logs in the user in the app
 */
export const login = async (req: Request, res: Response) => {
    // Get errors from express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const foundUserDoc = await UserSchema.find({ email: req.body.email });

    if (foundUserDoc.length > 0) {
        const match = await bcrypt.compare(req.body.password, foundUserDoc[0].get('password'));

        if (match) {
            const payload = { id: foundUserDoc[0].id };
            const token = jwt.encode(payload, process.env.JWT_SECRET);

            return res.status(200).json({ token: token });
        } else {
            return res.status(400).json({ errors: [{ mgs: 'invalid_credentials' }] });
        }
    } else {
        return res.status(400).json({ errors: [{ mgs: 'user_not_found' }] });
    }
};

/**
 * Registers a user in the app
 */
export const regster = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    await UserSchema.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        status: true
    });

    return res.status(201).json({ msg: 'registered_successfully' });
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
