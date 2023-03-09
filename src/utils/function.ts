import { plainToClass } from 'class-transformer';

function transformData<T>(dto: new (...args: any[]) => T, obj): T {
  return plainToClass(dto, obj, { excludeExtraneousValues: true });
}

function response(status = 200, message, data = null, error = null) {
  return {
    status,
    message,
    data,
    error,
  };
}

export { transformData, response };
