import { Metadata } from "@grpc/grpc-js";

export class AppService {
  metadata: Metadata;
  baseApiUrl = process.env.VITE_BACKEND_APIURL || '';

  constructor() {
    this.metadata = new Metadata();
    this.metadata.set('api-key', process.env.VITE_BACKEND_APIKEY || '');
  }
}

export function handlePromise(resolve: (arg0: any) => void, reject: (arg0: any) => void) {
  return (err: any, res: any) => {
    if (err) {
      reject(err);
    } else {
      resolve(res);
    }
  }
}