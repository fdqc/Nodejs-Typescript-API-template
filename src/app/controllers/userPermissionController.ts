import { Container } from 'typedi';
import { Request, Response } from 'express';
import { validationResult, param, check } from 'express-validator';
import { UserPermissionService } from '../../services/userPermissionService';

/**
 * Add permissions to the user
 */
export const update = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const userPermissionService = Container.get(UserPermissionService);
    const didUpdate = await userPermissionService.update(req.params.id, req.body.permissions);

    if (!didUpdate) { return res.status(400).json({ errors: [{ msg: 'could_not_add_permissions' }] }); }

    return res.status(200).json({ msg: 'permissions_updated_successfully' });
};

/**
 * Returns a validations array for the specified method
 * @param method string
 */
export function validate(method: string) {
    let validations: any[] = [];

    switch (method) {
        case 'update': {
            validations = [
                param('id').isMongoId().withMessage('invalid_id'),
                check('permissions').exists().withMessage('permissions_required')
                    .isArray({ min: 1 }).withMessage('permissions_min_length_is_1')
                /** @todo: check that permissions exists on the database */
            ];
            break;
        }
    }

    return validations;
}
