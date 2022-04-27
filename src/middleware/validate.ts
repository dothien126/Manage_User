import { RequestHandler } from 'express';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { sanitize, Trim } from 'class-sanitizer';
import { CustomError } from '../utils/response/custom-error/CustomError';

function dtoValidationMiddleware(
  type: any,
  skipMissingProperties = false
): RequestHandler {
  return (req, res, next) => {
    const dtoObj = plainToClass(type, req.body);
    validate(dtoObj, { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const dtoErrors = errors
            .map((error: ValidationError) =>
              (Object as any).values(error.constraints)
            )
            .join(', ');
          next(new CustomError(400, 'General', dtoErrors));
        } else {
          //sanitize the object and call the next middleware
          sanitize(dtoObj);
          req.body = dtoObj;
          next();
        }
      }
    );
  };
}

export default dtoValidationMiddleware;
