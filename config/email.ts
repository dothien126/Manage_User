import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

async function main() {
  const hostname = 'hostname from account page';
  const username = 'username from account page';
  const password = 'password from account page';

  const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.PASSWORD_EMAIL,
    },
    logger: true,
  });

  const info = await transporter.sendMail({
    from: '"Sender Name" <from@example.net>',
    to: "to@example.com",
    subject: "Hello from node",
    text: "Hello world?",
    html: "<strong>Hello world?</strong>",
    headers: { 'x-myheader': 'test header' }
  });

  console.log("Message sent: %s", info.response);
}
