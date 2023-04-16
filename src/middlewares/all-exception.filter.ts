import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as chalk from 'chalk';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    console.log(chalk.redBright('===============ERROR:', exception));
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let reponsePayload = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'INTERNAL_SERVER_ERROR',
    };

    if (exception instanceof HttpException) {
      const res: any = exception.getResponse();
      statusCode = exception.getStatus();
      reponsePayload = Object.assign(reponsePayload, {
        statusCode,
        message: typeof res === 'string' ? res : res.message,
      });
    }
    response.status(statusCode).json(reponsePayload);
  }
}
