import express from 'express';
import * as permissionController from '../controllers/permissionController';
import { jwtAuth } from '../../loaders/passport';
import { asyncWrapper } from '../../shared/utils/utils';
import { checkPermissions } from '../../middleware/permissionsMiddleware';

const api = express.Router();

/**
 * Use passport authenticate on routes
 */
api.use('/permissions', jwtAuth());

/**
 * Obtains a list of the permissions in the app
 * @route GET /permissions
 * @group Permissions
 * @summary Returns a list of permissions
 * @returns {object} 200
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
api.get('/permissions', checkPermissions(['permissions:read']), asyncWrapper(permissionController.permissions));

/**
 * @typedef PermissionSubLevel
 * @property {string} description.required
 * @property {string} value.required - shiro-like string. i.e: users:read
 */

/**
 * @typedef StorePermission
 * @property {string} description.required
 * @property {string} value.required - shiro-like string. i.e: users:*
 * @property {Array<PermissionSubLevel>} sub_levels
 */

/**
 * Store a new permission
 * @route POST /permissions
 * @group Permissions
 * @summary Store a permission
 * @param {StorePermission.model} store_permission.body.required
 * @returns {object} 200
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
api.post('/permissions',
    checkPermissions(['permissions:write']),
    permissionController.validate('store'),
    asyncWrapper(permissionController.store)
);

export = api;
