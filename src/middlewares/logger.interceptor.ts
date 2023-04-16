import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Request } from 'express';
import { tap } from 'rxjs/operators';

/** TODO Log request info */
@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private logger = new Logger('HTTP');
  intercept(context: ExecutionContext, next: CallHandler) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '-';
    const startTime = Date.now();

    const loggerStr = (status: number) => {
      const endTime = Date.now();
      const resTime = endTime - startTime;
      return `[Method]:${method} [Url]:${originalUrl} [StatusCode]:${status} [UserAgent]:${userAgent} | ${ip} +${resTime}ms`;
    };

    return next.handle().pipe(
      tap({
        next: (res) => this.logger.verbose(loggerStr(res?.statusCode)),
        error: (res) => this.logger.verbose(loggerStr(res?.status)),
      }),
    );
  }
}
