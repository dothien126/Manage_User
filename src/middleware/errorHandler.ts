import { Request, Response, NextFunction } from 'express';

import { CustomError } from '../utils/response/custom-error/CustomError';

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const status = err.HttpStatusCode || 500
  return res.status(status).json({message: err.message});
};