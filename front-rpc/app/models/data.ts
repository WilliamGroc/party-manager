export interface Error {
  error?: string;
}

export type DataResponse<T> = {
  data?: T;
} & Error;