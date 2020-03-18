import express from 'express';
import * as userController from '../controller/userController';
import { jwtAuth } from '../../../config/passport';
import { asyncWrapper } from '../../../shared/utils/utils';

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
api.get('/users', jwtAuth(), userController.users);

export = api;
