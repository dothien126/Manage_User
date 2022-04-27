import { response, Response } from 'express';

export interface CustomResponse extends Response {
  customSuccess(httpStatusCode: number, message: string, data: any): any;
}

(response as CustomResponse).customSuccess = function (
  httpStatusCode: number,
  message: string,
  data: any = null
) {
  return this.status(httpStatusCode).json({ message, data });
};

// response.custumSuccess = function(httpStatusCode: number,
//   message: string,
//   data: any = null):Response {
//   return this.status(httpStatusCode).json({message, data})
// }