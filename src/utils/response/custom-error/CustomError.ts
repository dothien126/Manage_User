import { ErrorType, ErrorResponse } from './types';

export class CustomError extends Error {
  private httpStatusCode: number;
  private errorType: ErrorType;
  private errors: string[] | null;


  constructor(
    httpStatusCode: number,
    errorType: ErrorType,
    message: string,
    errors: string[] | null = null,
  ) {
    super(message);

    this.name = this.constructor.name;

    this.httpStatusCode = httpStatusCode;
    this.errorType = errorType;
    this.errors = errors;
  }

  get HttpStatusCode() {
    return this.httpStatusCode;
  }

  get JSON(): ErrorResponse {
    return {
      errorType: this.errorType,
      errorMessage: this.message,
      errors: this.errors,
    };
  }
}