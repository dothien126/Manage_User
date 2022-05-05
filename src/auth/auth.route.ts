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
  UserLoginUserNameDto,
} from './auth.repository';
import { checkJwt } from '../middleware/decodeJwt';

const router = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a new user with email
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *         description: Login a new user with email and password
 *     responses:
 *       201:
 *         description: Login successfully
 *       400:
 *         description: Login fail ... Please again !
 *       409:
 *         description: Conflict !
 */
router.post('/login', dtoValidation(UserLoginDto), login);

/**
 * @swagger
 * /login_username:
 *   post:
 *     summary: Login a new user with userName.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userName:
 *               type: string
 *             password:
 *               type: string
 *         description: Login a new user with userName and password
 *     responses:
 *       201:
 *         description: Login successfully
 *       400:
 *         description: Login fail ... Please again !
 *       409:
 *         description: Conflict !
 */
router.post(
  '/login_username',
  dtoValidation(UserLoginUserNameDto),
  loginUserName
);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user.
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userName:
 *               type: string
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *         description: Register a new user with user-data
 *     responses:
 *       201:
 *         description: Register successfully
 *       400:
 *          description: Register fail ... Please again !
 *       409:
 *          description: Conflict
 */
router.post('/register', dtoValidation(UserRegisterDto), register);

/**
 * @swagger
 * /verify-email:
 *   post:
 *     summary: Verify Email with Token
 *     tags:
 *       - Authentication
 *     parameters:
 *      parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             id:
 *                type: string
 *             token:
 *                type: string
 *         description: Verify email when user login
 *     responses:
 *       200:
 *         description: Email Verified.
 *       400:
 *         description:  ID or Token not found.
 */
router.post('/verify-email/:id', checkJwt, verifyEmail);

/**
 * @swagger
 * /change-password/:id:
 *   put:
 *     summary: Fill new password to confirm password
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             old password:
 *               type: string
 *             new password:
 *               type: string
 *             confirm password:
 *               type: string
 *         description: User change password
 *     responses:
 *       200:
 *         description: change password successfully.
 *       400:
 *         description: Bad request
 */
router.put(
  '/change-password/:id',
  checkJwt,
  dtoValidation(UserChangePasswordDto),
  changePassword
);

/**
 * @swagger
 * /reset_pass:id:
 *   post:
 *     summary: click forgot pass and get token to the email address
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             new password:
 *               type: string
 *             confirm password:
 *               type: string
 *         description: User change password when forgot password
 *     responses:
 *       200:
 *         description: Sended reset password link to email.
 *       400:
 *         description:  Can not send link to email.
 */
router.post(
  '/reset_pass/:id',
  checkJwt,
  dtoValidation(UserResetPasswordDto),
  resetPassword
);

export default router;
