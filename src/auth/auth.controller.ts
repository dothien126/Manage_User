import { Request, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { User } from '../user/user.entity';
import * as UserService from '../user/user.service';
import { CustomError } from '../utils/response/custom-error/CustomError';
import { CustomResponse } from 'utils/response/customSuccess';
import { JwtPayload, createJwtToken } from '../utils/createJwtToken';

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
      id: Number(user.id),
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

export const changePassword = async (
  req: Request,
  res: CustomResponse,
  next: NextFunction
) => {
  const { password, passwordNew, passwordConfirm } = req.body;
  const { id } = req.params;

  if (passwordNew === passwordConfirm) {
    try {
      const user = await UserService.findUserById(id)
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
      await UserService.updateUser(id, user)

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
