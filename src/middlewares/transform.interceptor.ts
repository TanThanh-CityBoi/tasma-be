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
      map((response) => {
        context.switchToHttp().getResponse().status(response?.statusCode);
        return <IResponse>{
          statusCode: response?.statusCode,
          data: response?.data,
          message: response?.message,
        };
      }),
    );
  }
}
