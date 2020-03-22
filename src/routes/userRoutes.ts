import express from 'express';
import * as userController from '../controllers/userController';
import { jwtAuth } from '../config/passport';
import { asyncWrapper } from '../shared/utils/utils';

const api = express.Router();

/**
 * Obtains a list of the registered users
 * @route GET /users
 * @group Users
 * @summary Returns a list of users
 * @returns {object} 200
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
api.get('/users', jwtAuth(), asyncWrapper(userController.users));

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
 * @todo: try to find other way of handling auth and validate middleware
 * as they are optionals
 */
api.get('/users/:id', [jwtAuth(), userController.validate('show'), asyncWrapper(userController.show)]);

export = api;
