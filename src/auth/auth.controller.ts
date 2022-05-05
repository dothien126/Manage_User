import { Request, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { User } from '../user/user.entity';
import * as UserService from '../user/user.service';
import { CustomError } from '../utils/response/custom-error/CustomError';
import { CustomResponse } from 'utils/response/customSuccess';
import { JwtPayload, createJwtToken } from '../utils/createJwtToken';
import { transporter } from '../../config/email';
import { checkJwt } from '../middleware/decodeJwt';

export const register = async (
  req: Request,
  res: CustomResponse,
  next: NextFunction
) => {
  try {
    const { userName, name, email, password } = req.body;
    const user = await UserService.findUserByEmail(email);
    if (user) {
      const customError = new CustomError(
        400,
        'General',
        `Email '${user.email}' already exists`
      );
      return next(customError);
    }

    const newUser = new User();
    newUser.userName = userName;
    newUser.name = name;
    newUser.email = email;
    newUser.password = password;
    newUser.hashPassword();
    await UserService.createNewUser(newUser);

    // const jwtPayload: JwtPayload = {
    //   id: user.id,
    //   name: user.name,
    //   email: user.email,
    //   created_at: user.createdAt,
    // };
    // const token = createJwtToken(jwtPayload);
    // const options = {
    //   from: `${process.env.USER_MAIL}`,
    //   to: `dothien2601ak39@gmail.com, ${email}`,
    //   subject: 'Confirm Email Account',
    //   html: `Please enter this link: <b>http://localhost:${process.env.PORT}/verify-email/${user.id}/${token}</b>`,
    // };

    // try {
    //   await transporter.sendMail(options);
    // } catch (err) {
    //   throw err;
    // }
    return res.customSuccess(201, 'User successfully created.', newUser);
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: CustomResponse,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await UserService.findUserByEmail(email);
    if (!user) {
      const customError = new CustomError(
        404,
        'General',
        'Incorrect email or password'
      );
      return next(customError);
    }

    if (!user.checkIfPasswordMatch(password)) {
      const customError = new CustomError(
        404,
        'General',
        'Incorrect email or password'
      );
      return next(customError);
    }

    const jwtPayload: JwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.createdAt,
    };
    const token = createJwtToken(jwtPayload);
    const options = {
      from: `${process.env.USER_MAIL}`,
      to: `dothien2601ak39@gmail.com, ${email}`,
      subject: 'Confirm Email Account',
      html: `Please enter this link: <b>http://localhost:${process.env.PORT}/verify-email/${user.id}/${token}</b>`,
    };

    try {
      await transporter.sendMail(options);
    } catch (err) {
      throw err;
    }

    res.customSuccess(201, 'Token successfully created.', `Bearer ${token}`);
  } catch (err) {
    next(err);
  }
};

export const loginUserName = async (
  req: Request,
  res: CustomResponse,
  next: NextFunction
) => {
  try {
    const { userName, password } = req.body;
    const user = await UserService.findUserByUserName(userName);
    if (!user) {
      const customError = new CustomError(
        404,
        'General',
        'Incorrect email or password'
      );
      return next(customError);
    }

    if (!user.checkIfPasswordMatch(password)) {
      const customError = new CustomError(
        404,
        'General',
        'Incorrect email or password'
      );
      return next(customError);
    }

    const jwtPayload: JwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.createdAt,
    };
    const token = createJwtToken(jwtPayload);

    res.customSuccess(201, 'Token successfully created.', `Bearer ${token}`);
  } catch (err) {
    next(err);
  }
};

export const verifyEmail = async (
  req: Request,
  res: CustomResponse,
  next: NextFunction
) => {
  const { id, token } = req.body;

  try {
    const user = await UserService.findUserById(id);
    if (!user) {
      const customError = new CustomError(404, 'General', 'User not found');
      return next(customError);
    }

    if (token) {
      try {
        const isEmailVerified = await UserService.findUserByEmail(token.email);
        if (isEmailVerified) {
          return res.customSuccess(200, 'Email is been active', '');
        } else {
          const customError = new CustomError(
            404,
            'General',
            'Email is not active'
          );
          return next(customError);
        }
      } catch (err) {
        next(err);
      }
    }
  } catch (err) {
    next(err);
  }
};

export const changePassword = async (
  req: Request,
  res: CustomResponse,
  next: NextFunction
) => {
  const { password, passwordNew, passwordConfirm } = req.body;
  const { id } = req.params;

  if (passwordNew === passwordConfirm) {
    try {
      const user = await UserService.findUserById(id);
      if (!user) {
        const customError = new CustomError(
          404,
          'General',
          `User ${name} not found.`
        );
        return next(customError);
      }

      if (!user.checkIfPasswordMatch(password)) {
        const customError = new CustomError(
          400,
          'General',
          'Incorrect password'
        );
        return next(customError);
      }

      user.password = passwordNew;
      user.hashPassword();
      await UserService.updateUser(id, user);

      res.customSuccess(200, 'Password successfully changed.', null);
    } catch (err) {
      const customError = new CustomError(400, 'General', 'Error');
      return next(customError);
    }
  } else {
    const customError = new CustomError(
      400,
      'General',
      'Please enter password again!'
    );
    return next(customError);
  }
};

export const resetPassword = async (
  req: Request,
  res: CustomResponse,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const newUser: User = await UserService.findUserById(id);
    if (!newUser) {
      const customError = new CustomError(
        404,
        'General',
        `User ${name} not found.`
      );
      return next(customError);
    }
    const { newPassword, confirmPassword } = req.body;
    if (newPassword === confirmPassword) {
      newUser.password = newPassword;
      newUser.hashPassword();
      await UserService.updateUser(id, newUser);

      return res.customSuccess(200, 'Updated password successfully.', null);
    } else {
      const customError = new CustomError(
        400,
        'General',
        `Please enter password again`
      );
      return next(customError);
    }
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (
  req: Request,
  res: CustomResponse,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const user = await UserService.findUserByEmail(email);
    if (!user) {
      const customError = new CustomError(404, 'General', 'Email not found');
      return next(customError);
    }
    const jwtPayload: JwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.createdAt,
    };
    const token = createJwtToken(jwtPayload);
    const options = {
      from: `${process.env.USER_MAIL}`,
      to: `dothien2601ak39@gmail.com, ${email}`,
      subject: 'Confirm Email Account',
      html: `Please enter this link: <b>http://localhost:${process.env.PORT}/reset_pass/${user.id}/${token}</b>`,
    };

    try {
      await transporter.sendMail(options);
    } catch (err) {
      throw err;
    }
  } catch (err) {
    next(err);
  }
};
