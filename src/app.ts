import 'dotenv/config';
import fs from 'fs';
import path from 'path';

import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import helmet from 'helmet';
import swaggerUI from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerOptions from '../config/swagger'

import { dbCreateConnection } from './orm/dbConnection';
import './utils/response/customSuccess';
import { errorHandler } from './middleware/errorHandler';

// import route
import userRoute from './user/user.route';
import authRoute from './auth/auth.route';
import photoRoute from './photo/photo.route';
import albumRoute from './album/album.route'

const app = express();
const swaggerDocs = swaggerJsDoc(swaggerOptions)
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
    .send(`💀👻 Welcome to my project 👻💀`);
});

// routes
app.use(userRoute);
app.use(authRoute);
app.use(photoRoute);
app.use(albumRoute);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

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

export default app
