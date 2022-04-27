import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { User } from '../user/user.entity';
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

    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { email } });

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
    await userRepository.save(newUser);

    return res.customSuccess(201, 'User successfully created.', newUser);
  } catch (err) {
    const customError = new CustomError(
      400,
      'General',
      `User can't be created`
    );
    return next(customError);
  }
};

export const login = async (
  req: Request,
  res: CustomResponse,
  next: NextFunction
) => {
  const { userName, email, password } = req.body;

  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOne({ where: { email } });

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

    try {
      const token = createJwtToken(jwtPayload);
      res.customSuccess(201, 'Token successfully created.', `Bearer ${token}`);
    } catch (err) {
      const customError = new CustomError(
        400,
        'General',
        "Token can't be created"
      );
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'General', 'Error');
    return next(customError);
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
    const userRepository = getRepository(User);
    try {
      const user = await userRepository.findOne({ where: { id } });

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
      userRepository.save(user);

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
