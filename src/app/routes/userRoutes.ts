import express from 'express';
import * as userController from '../controllers/userController';
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
 * @returns {object} 200
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
api.get('/users', checkPermissions(['users:read']), asyncWrapper(userController.users));

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

export = api;
