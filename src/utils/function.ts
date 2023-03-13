import { plainToClass } from 'class-transformer';
import { IResponse } from 'src/interfaces';

function transformData<T>(dto: new (...args: any[]) => T, obj): T {
  return plainToClass(dto, obj, { excludeExtraneousValues: true });
}

function response({
  status = 200,
  message = 'message reponse',
  data = null,
  errors = null,
}): IResponse {
  return {
    status,
    message,
    data,
    errors,
  };
}

export { transformData, response };
