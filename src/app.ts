import 'dotenv/config';
import fs from 'fs';
import path from 'path';

import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import helmet from 'helmet';

import { dbCreateConnection } from './orm/dbConnection';
import './utils/response/customSuccess';
import { errorHandler } from './middleware/errorHandler';

// import route
import userRoute from './user/user.route';
import authRoute from './auth/auth.route';

const app = express();

// use middle ware
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// home page
app.get('/home', (req, res, next) => {
  res
    .status(200)
    .setHeader('Content-Type', 'text/html')
    .send(`<h4>💀👻 Welcome to my project 👻💀</h4>`);
});

// routes
app.use(userRoute);
app.use(authRoute);

// catch route is not valid
app.get('*', (req, res, next) => {
  return res.status(404).json('404 Not Found');
});

// catch error
app.use(errorHandler);

const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

(async () => {
  await dbCreateConnection();
})();
