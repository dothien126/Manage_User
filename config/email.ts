import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'developerr126@gmail.com',
    pass: 'coder126.ic',
  },
});
