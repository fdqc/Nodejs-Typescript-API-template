import { Container } from 'typedi';
import { Request, Response } from 'express';
import { PermissionService } from '../../services/permissionService';
import { PermissionI } from '../../interfaces/permission';
import { validationResult, check, param } from 'express-validator';
import { isShiroRootLvl, isShiro } from '../../shared/utils/utils';

/**
 * Gets a list of all the permissions
 * in the app
 */
export const permissions = async (_req: Request, res: Response) => {
    const permissionService = Container.get(PermissionService);

    const permissionsList = await permissionService.permissionList();
    return res.status(200).json(permissionsList);
};

/**
 * Stores a new permission
 */
export const store = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const permissionDTO: PermissionI = req.body;

    const permissionService = Container.get(PermissionService);
    await permissionService.store(permissionDTO);

    return res.status(200).json({ msg: 'permission_created_successfully' });
};

/**
 * Updates a permission
 */
export const update = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const permissionDTO: PermissionI = req.body;

    const permissionService = Container.get(PermissionService);
    const didUpdate = await permissionService.update(req.params.id, permissionDTO);

    return didUpdate ? res.status(200).json({ msg: 'permission_updated_successfully' }) :
        res.status(404).json({ errors: [{ msg: 'permission_not_found' }] });
};

/**
 * Removes a permission
 */
export const remove = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const permissionService = Container.get(PermissionService);
    const didRemove = await permissionService.remove(req.params.id);

    return didRemove ? res.status(200).json({ msg: 'permission_removed_successfully' }) :
        res.status(404).json({ errors: [{ msg: 'permission_not_found' }] });
};

/**
 * Returns a validations array for the specified method
 * @param method string
 */
export function validate(method: string) {
    let validations: any[] = [];

    switch (method) {
        case 'store': {
            validations = [
                check('description').exists().withMessage('description_required')
                    .not().isEmpty().withMessage('description_cannot_be_empty'),
                check('value').exists().withMessage('value_required')
                    .not().isEmpty().withMessage('value_cannot_be_empty')
                    .custom(value => {
                        if (isShiroRootLvl(value)) {
                            return Promise.resolve();
                        } else {
                            return Promise.reject('invalid_root_level_permission');
                        }
                    }),
                check('sub_levels').isArray().withMessage('sub_levels_not_an_array')
                    .isArray({ min: 1 }).withMessage('sub_levels_min_length_1')
                    .optional(),
                check('sub_levels.*.description').exists().withMessage('description_required')
                    .not().isEmpty().withMessage('description_cannot_be_empty'),
                check('sub_levels.*.value').exists().withMessage('value_required')
                    .not().isEmpty().withMessage('value_cannot_be_empty')
                    .custom(value => {
                        if (isShiro(value)) {
                            return Promise.resolve();
                        } else {
                            return Promise.reject('invalid_sub_level_permission');
                        }
                    })
            ];
            break;
        }
        case 'update': {
            validations = [
                param('id').isMongoId().withMessage('invalid_permission_id'),
                check('description').exists().withMessage('description_required')
                    .not().isEmpty().withMessage('description_cannot_be_empty'),
                check('value').exists().withMessage('value_required')
                    .not().isEmpty().withMessage('value_cannot_be_empty')
                    .custom(value => {
                        if (isShiroRootLvl(value)) {
                            return Promise.resolve();
                        } else {
                            return Promise.reject('invalid_root_level_permission');
                        }
                    }),
                check('sub_levels').isArray().withMessage('sub_levels_not_an_array')
                    .isArray({ min: 1 }).withMessage('sub_levels_min_length_1')
                    .optional(),
                check('sub_levels.*.description').exists().withMessage('description_required')
                    .not().isEmpty().withMessage('description_cannot_be_empty'),
                check('sub_levels.*.value').exists().withMessage('value_required')
                    .not().isEmpty().withMessage('value_cannot_be_empty')
                    .custom(value => {
                        if (isShiro(value)) {
                            return Promise.resolve();
                        } else {
                            return Promise.reject('invalid_sub_level_permission');
                        }
                    })
            ];
            break;
        }
    }

    return validations;
}
