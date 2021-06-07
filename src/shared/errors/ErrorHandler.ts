import { Request, Response, NextFunction } from 'express';
import AppError from './AppError';

const ErrorHandler = (
  err: Error,
  _request: Request,
  response: Response,
  _: NextFunction,
) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
};

export default ErrorHandler;
