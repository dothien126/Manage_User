import jwt from 'jsonwebtoken';

export type JwtPayload = {
  id: string;
  name: string;
  email: string;
  created_at: Date;
};

export const createJwtToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};
