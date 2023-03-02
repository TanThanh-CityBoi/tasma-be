export interface IResponse {
  status: number;
  data: { [key: string]: any } | null;
  message: string;
  errors: { [key: string]: any } | null;
}
