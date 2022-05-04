import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { createJwtToken } from '../utils/createJwtToken';
import { CustomError } from '../utils/response/custom-error/CustomError';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  type JwtPayload = {
    id: string;
    name: string;
    email: string;
    created_at: Date;
  };

  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const customError = new CustomError(
      400,
      'General',
      'Authorization header not provided'
    );
    return next(customError);
  }
  interface customReq extends Request {
    jwtPayload: { [key: string]: any }
  }
  const token = authHeader.split(' ')[1];
  let jwtPayload: { [key: string]: any };
  try {
    jwtPayload = jwt.verify(token, process.env.JWT_SECRET as string) as { [key: string]: any};
    ['iat', 'exp'].forEach((keyToRemove) => delete jwtPayload[keyToRemove]);
    (req as customReq).jwtPayload = jwtPayload as JwtPayload
  } catch (err) {
    const customError = new CustomError(401, 'General', 'JWT error');
    return next(customError);
  }

  try {
    // Refresh and send a new token on every request
    const newToken = createJwtToken(jwtPayload as JwtPayload);
    res.setHeader('token', `Bearer ${newToken}`);
    return next();
  } catch (err) {
    const customError = new CustomError(
      400,
      'General',
      "Token can't be created",
    );
    return next(customError);
  }
};
