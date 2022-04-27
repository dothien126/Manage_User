import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { User } from './user.entity';
import { CustomError } from '../utils/response/custom-error/CustomError';
import { CustomResponse } from 'utils/response/customSuccess';

export const userList = async (req: Request, res: CustomResponse, next: NextFunction) => {
  const userRepository = getRepository(User);
  try {
    const users = await userRepository.find({
      select: ['id', 'userName', 'name', 'email', 'created_at', 'updated_at'],
    });
    res.customSuccess(200, 'List of users.', users);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', `Can't retrieve list of users.`, null, err);
    return next(customError);
  }
};
