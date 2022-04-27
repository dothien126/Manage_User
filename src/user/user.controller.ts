import { Request, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { User } from './user.entity';
import { CustomError } from '../utils/response/custom-error/CustomError';
import { CustomResponse } from 'utils/response/customSuccess';
import e from 'cors';

export const userList = async (req: Request, res: CustomResponse, next: NextFunction) => {
  const userRepository = getRepository(User);

  try {
    const users = await userRepository.find({
      select: ['id', 'userName', 'name', 'email', 'createdAt', 'updatedAt'],
    });
    res.customSuccess(200, 'List of users.', users);
  } catch (err) {
    const customError = new CustomError(400, 'General', `Can't retrieve list of users.`);
    return next(customError);
  }
};

export const userId = async (req: Request, res: CustomResponse, next: NextFunction) => {
  const id = req.params.id;

  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOne({where: {id}});

    if (!user) {
      const customError = new CustomError(404, 'General', `User with id:${id} not found.`);
      return next(customError);
    }
    res.customSuccess(200, 'User information', user);
  } catch (err) {
    const customError = new CustomError(400, 'General', 'Error');
    return next(customError);
  }
};

export const userUpdate = async (req: Request, res: CustomResponse, next: NextFunction) => {
  const id = req.params.id;
  const { userName, name, email, password } = req.body;

  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      const customError = new CustomError(404, 'General', `User with id:${id} not found.`);
      return next(customError);
    }

    user.userName = userName;
    user.name = name;
    user.email = email;
    user.password = password;

    try {
      await userRepository.save(user);
      res.customSuccess(200, 'User successfully saved.', '');
    } catch (err) {
      const customError = new CustomError(409, 'General', `User '${user.email}' can't be saved.`);
      return next(customError);
    }
  } catch (err) {
    const customError = new CustomError(400, 'General', 'Error');
    return next(customError);
  }
};

export const userDelete = async (req: Request, res: CustomResponse, next: NextFunction) => {
  const id = req.params.id;

  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      const customError = new CustomError(404, 'General', `User with id:${id} doesn't exists.`);
      return next(customError);
    }
    userRepository.delete(id);

    res.customSuccess(200, 'User successfully deleted.', { id: user.id, name: user.name, email: user.email });
  } catch (err) {
    const customError = new CustomError(400, 'General', 'Error');
    return next(customError);
  }
};
