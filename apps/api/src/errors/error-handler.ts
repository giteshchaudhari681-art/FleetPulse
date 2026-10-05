import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { AppError } from './app-error';
import { ErrorCodes } from './error-codes';

export function errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
  const reqId = request.id;

  // Log the error
  if (error.statusCode && error.statusCode >= 500) {
    request.log.error(error);
  } else if (!error.statusCode) {
    request.log.error(error);
  } else {
    request.log.info(error);
  }

  // Handle known AppErrors
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      success: false,
      error: {
        code: error.code,
        message: error.message,
      },
      requestId: reqId,
    });
  }

  // Handle Fastify Validation Errors (Zod or standard)
  if (error.validation) {
    return reply.status(400).send({
      success: false,
      error: {
        code: ErrorCodes.VALIDATION_ERROR,
        message: 'Request validation failed',
        details: error.validation,
      },
      requestId: reqId,
    });
  }

  // Unhandled / Unexpected Errors
  const isProduction = process.env.NODE_ENV === 'production';
  const statusCode = error.statusCode || 500;

  return reply.status(statusCode).send({
    success: false,
    error: {
      code: ErrorCodes.INTERNAL_ERROR,
      message: isProduction ? 'An internal server error occurred' : error.message,
    },
    requestId: reqId,
  });
}

export function notFoundHandler(request: FastifyRequest, reply: FastifyReply) {
  return reply.status(404).send({
    success: false,
    error: {
      code: ErrorCodes.NOT_FOUND,
      message: 'Route not found',
    },
    requestId: request.id,
  });
}
