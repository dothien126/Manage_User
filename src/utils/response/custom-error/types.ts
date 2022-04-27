export type ErrorResponse = {
  errorType: ErrorType;
  errorMessage: string;
  errors: string[] | null;
};

export type ErrorType = 'General' | 'Unauthorized';
