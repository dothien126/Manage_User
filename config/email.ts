import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export const transporter = nodemailer.createTransport({
  service: 'hotmail',
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASSWORD_EMAIL,
  },
});
