import express from 'express';
import * as userController from '../controllers/userController';
import * as userPermissionController from '../controllers/userPermissionController';
import { jwtAuth } from '../../loaders/passport';
import { asyncWrapper } from '../../shared/utils/utils';
import { checkPermissions } from '../../middleware/permissionsMiddleware';

const api = express.Router();

/**
 * Use passport authenticate on routes
 */
api.use('/users', jwtAuth());

/**
 * Obtains a list of the registered users
 * @route GET /users
 * @group Users
 * @summary Returns a list of users
 * @param {number} page.query - default: 0
 * @param {number} page_size.query - default: 10
 * @returns {object} 200
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
api.get('/users',
    checkPermissions(['users:read']),
    userController.validate('usersList'),
    asyncWrapper(userController.users));

/**
 * Obtains info about a particular user
 * @route GET /users/{id}
 * @group Users
 * @summary Returns a user
 * @param {string} id.path.required - provide a user Id
 * @returns {object} 200
 * @returns {Error}  default - Unexpected error
 * @security JWT
 *
 */
api.get('/users/:id',
    checkPermissions(['users:read']),
    userController.validate('show'),
    asyncWrapper(userController.show)
);

/**
 * @typedef StorePermissions
 * @property {Array<string>} permissions.required
 */

/**
 * Updates user's permissions
 * @route PUT /users/{id}/permissions
 * @group Users
 * @summary Updates permissions
 * @param {string} id.path.required - provide a user Id
 * @param {StorePermissions.model} store_permissions.body.required - List of permissions
 * @returns {object} 200
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
api.put('/users/:id/permissions',
    checkPermissions(['users:write']),
    userPermissionController.validate('update'),
    asyncWrapper(userPermissionController.update)
);

export = api;
