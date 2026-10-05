import { ErrorCode, ErrorCodes } from './error-codes';

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;

  constructor(message: string, code: ErrorCode = ErrorCodes.INTERNAL_ERROR, statusCode = 500) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string) {
    return new AppError(message, ErrorCodes.BAD_REQUEST, 400);
  }

  static notFound(message = 'The requested resource was not found') {
    return new AppError(message, ErrorCodes.NOT_FOUND, 404);
  }

  static internal(message = 'An internal server error occurred') {
    return new AppError(message, ErrorCodes.INTERNAL_ERROR, 500);
  }
}
