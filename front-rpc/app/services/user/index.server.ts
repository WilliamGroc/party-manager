import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';
import { ProtoGrpcType as UserGrpcType } from "proto/user";
import { AppService, handlePromise } from "../service";
import { LoginRequest } from 'proto/user/LoginRequest';
import { UserResponse } from 'proto/user/UserResponse';
import { LoginResponse } from 'proto/user/LoginResponse';
import { MeRequest } from 'proto/user/MeRequest';

const userPackageDefinition = protoLoader.loadSync('../back-rpc/server/api/user/user.proto',
  {
    keepCase: true,
    enums: String,
    defaults: true,
    oneofs: true
  });
const userPackage = (grpc.loadPackageDefinition(userPackageDefinition) as unknown) as UserGrpcType;

export class UserService extends AppService {
  userClient = new userPackage.user.User(this.baseApiUrl, grpc.credentials.createInsecure());

  async GetMe(payload: MeRequest): Promise<UserResponse> {
    return new Promise((resolve, reject) => {
      this.userClient.GetMe(payload, this.metadata, handlePromise(resolve, reject));
    });
  }

  async Login(payload: LoginRequest): Promise<LoginResponse> {
    return new Promise((resolve, reject) => {
      this.userClient.Login(payload, this.metadata, handlePromise(resolve, reject));
    });
  }
}