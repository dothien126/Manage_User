import { Request, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { User } from './user.entity';
import { CustomError } from '../utils/response/custom-error/CustomError';
import { CustomResponse } from 'utils/response/customSuccess';
import * as UserService from './user.service';

export const userList = async (
  req: Request,
  res: CustomResponse,
  next: NextFunction
) => {
  try {
    const users = await UserService.getAllUser({});
    if (!users) {
      const customError = new CustomError(
        400,
        'General',
        `Can't retrieve list of users.`
      );
      return next(customError);
    }
    res.customSuccess(200, 'List of users.', users);
  } catch (err) {
    next(err);
  }
};

export const userId = async (
  req: Request,
  res: CustomResponse,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const user = await UserService.findUserById(id);

    if (!user) {
      const customError = new CustomError(
        404,
        'General',
        `User with id:${id} not found.`
      );
      return next(customError);
    }
    res.customSuccess(200, 'User information', user);
  } catch (err) {
    next(err);
  }
};

export const userUpdate = async (
  req: Request,
  res: CustomResponse,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const user = await UserService.findUserById(id);
    if (!user) {
      const customError = new CustomError(
        404,
        'General',
        `User with id:${id} not found.`
      );
      return next(customError);
    }

    await UserService.updateUser(id, req.body);
    res.customSuccess(200, 'User successfully saved.', user);
  } catch (err) {
    next(err);
  }
};

export const userDelete = async (
  req: Request,
  res: CustomResponse,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const user = await UserService.findUserById(id);
    if (!user) {
      const customError = new CustomError(
        404,
        'General',
        `User with id:${id} doesn't exists.`
      );
      return next(customError);
    }

    await UserService.deleteUserById(id);
  } catch (err) {
    next(err);
  }
};
