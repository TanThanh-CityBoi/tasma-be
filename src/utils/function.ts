import { HttpStatus } from '@nestjs/common';
import { IResponse } from 'src/interfaces';

function _response({
  statusCode = HttpStatus.OK,
  data = null,
  message = 'Success',
}): IResponse {
  return {
    statusCode,
    message,
    data,
  };
}

export { _response };
