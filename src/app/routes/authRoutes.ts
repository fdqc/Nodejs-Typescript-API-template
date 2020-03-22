import express from 'express';
import * as authController from '../controllers/authController';
import { asyncWrapper } from '../../shared/utils/utils';

const api = express.Router();

/**
 * @typedef Auth
 * @property {string} email.required
 * @property {string} password.required
 */

/**
 * Authenticates and logs in the user in the app
 * @route POST /auth/login
 * @group Authentication
 * @summary Login
 * @param {Auth.model} auth.body.required - User's credentials
 * @returns {object} 200 - token
 * @returns {Error}  default - Unexpected error
 */
api.post('/auth/login', authController.validate('login'), asyncWrapper(authController.login));


/**
 * @typedef Registration
 * @property {string} name.required
 * @property {string} email.required
 * @property {string} password.required
 */

/**
 * Registers a user in the app
 * @route POST /auth/register
 * @group Authentication
 * @summary Register
 * @param {Registration.model} registration.body.required - User's data
 * @returns {object} 201 - token
 * @returns {Error}  default - Unexpected error
 */
api.post('/auth/register', authController.validate('register'), asyncWrapper(authController.regster));

export = api;
