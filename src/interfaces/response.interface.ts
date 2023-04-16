export interface IResponse {
  statusCode: number;
  data: { [key: string]: any } | null;
  message: string;
}
