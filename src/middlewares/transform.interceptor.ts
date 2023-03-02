import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IResponse } from 'src/interfaces';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, IResponse> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse> {
    return next.handle().pipe(
      map((data) => {
        const response: IResponse = {
          status: 200,
          data: null,
          message: null,
          errors: null,
        };
        if (!data) {
          context.switchToHttp().getResponse().status(500);
          return Object.assign(response, {
            status: 500,
            message: 'INTERNAL_SERVER_ERROR',
          });
        }
        if (data?.errors || (data.status && data.message)) {
          context.switchToHttp().getResponse().status(data.status);
          return Object.assign(response, data);
        }
        context.switchToHttp().getResponse().status(200);
        return Object.assign(response, { data });
      }),
    );
  }
}
