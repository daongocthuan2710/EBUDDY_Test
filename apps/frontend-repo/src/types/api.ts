export type TResponse<T> = {
  code: string;
  id: number;
  status: string;
  message?: string;
  token?: string;
  data?: T;
  total_row?: number;
  [key: string]: any;
};
