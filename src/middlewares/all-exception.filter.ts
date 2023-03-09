import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import chalk from 'chalk';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    console.log(chalk.red('==================ERROR:', exception));
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let reponsePayload = {
      errors: null,
      message: 'INTERNAL_SERVER_ERROR',
      status: 500,
      data: null,
    };

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const res: any = exception.getResponse();
      reponsePayload = Object.assign(reponsePayload, {
        status: statusCode,
        message: typeof res === 'string' ? res : res.message,
      });
      response.status(statusCode).json(reponsePayload);
      return;
    }

    if (exception instanceof Error) {
      reponsePayload = Object.assign(reponsePayload, {
        errors: exception.stack,
      });
    }
    response.status(statusCode).json(reponsePayload);
  }
}
