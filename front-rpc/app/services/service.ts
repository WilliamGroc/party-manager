import { Metadata } from "@grpc/grpc-js";

export class AppService {
  metadata: Metadata;

  constructor(token?: string) {
    this.metadata = new Metadata();

    if (token) {
      this.metadata.set('authorization', `Bearer ${token}`);
    }
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