import { Router } from 'express';

import {
  register,
  login,
  changePassword,
  verifyEmail,
  resetPassword,
  loginUserName,
} from './auth.controller';
import dtoValidation from '../middleware/validate';
import {
  UserRegisterDto,
  UserLoginDto,
  UserChangePasswordDto,
  UserResetPasswordDto,
  UserLoginUserNameDto
} from './auth.repository';
import {checkJwt} from '../middleware/decodeJwt'

const router = Router();

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a new user.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: body
 *         name: body
 *            schema
 *         required: true
 *         description: Login a new user with email and password
 *     responses:
 *       201:
 *         description: Login successfully
 *       400:
 *          description: Login fail ... Please again !
 */
router.post('/login', dtoValidation(UserLoginDto), login);

/**
 * @swagger
 * /users/login_username:
 *   post:
 *     summary: Login a new user.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         description: Login a new user with email and password
 *     responses:
 *       201:
 *         description: Login successfully
 *       400:
 *          description: Login fail ... Please again !
 */
router.post('/login_username', dtoValidation(UserLoginUserNameDto), loginUserName);

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         description: Register a new user with user-data
 *     responses:
 *       201:
 *         description: Register successfully
 *       400:
 *          description: Register fail ... Please again !
 */
router.post('/register', dtoValidation(UserRegisterDto), register);

/**
 * @swagger
 * /verify:
 *   post:
 *     summary: Verify Email with Token
 *     tags:
 *       - Authentication
 *     parameters:
 *      parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         description: Register a new user with user-data
 *     responses:
 *       200:
 *         description: Email Verified.
 *       400:
 *         description:  ID or Token not found.
 *
 *
 */
router.post('/verify-email/:id', checkJwt, verifyEmail);

/**
 * @swagger
 * /verify-email/{token}:
 *   put:
 *     summary: Fill new password to reset password
 *     tags:
 *       - Authentication
 *     parameters:
 *      parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         description: Register a new user with user-data
 *     responses:
 *       200:
 *         description: Reset password successfully.
 *       400:
 *         description: Bad request
 */
router.put(
  '/change-password/:id', checkJwt,
  dtoValidation(UserChangePasswordDto),
  changePassword
);

/**
 * @swagger
 * /reset_pass:
 *   post:
 *     summary: click forgot pass and get token to the email address
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         description: Register a new user with user-data
 *     responses:
 *       200:
 *         description: Sended reset password link to email.
 *       400:
 *         description:  Can not send link to email.
 *
 *
 */
router.post('/reset_pass/:id', checkJwt, dtoValidation(UserResetPasswordDto), resetPassword);

export default router;
