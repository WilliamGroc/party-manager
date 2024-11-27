import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';
import { ProtoGrpcType as UserGrpcType } from "proto/user";
import { AppService, handlePromise } from "../service";
import { LoginRequest } from 'proto/user/LoginRequest';
import { RegisterRequest } from 'proto/user/RegisterRequest';
import { UpdateRequest } from 'proto/user/UpdateRequest';
import { UserResponse } from 'proto/user/UserResponse';
import { LoginResponse } from 'proto/user/LoginResponse';

const userPackageDefinition = protoLoader.loadSync('../back-rpc/server/api/user/user.proto',
  {
    keepCase: true,
    enums: String,
    defaults: true,
    oneofs: true
  });
const userPackage = (grpc.loadPackageDefinition(userPackageDefinition) as unknown) as UserGrpcType;
export const userClient = new userPackage.user.User('localhost:1234', grpc.credentials.createInsecure());

export class UserService extends AppService {
  async GetMe(): Promise<UserResponse> {
    return new Promise((resolve, reject) => {
      userClient.GetMe({}, this.metadata, handlePromise(resolve, reject));
    });
  }

  async Login(payload: LoginRequest): Promise<LoginResponse> {
    return new Promise((resolve, reject) => {
      userClient.Login(payload, handlePromise(resolve, reject));
    });
  }

  async Register(payload: RegisterRequest): Promise<LoginResponse> {
    return new Promise((resolve, reject) => {
      userClient.Register(payload, handlePromise(resolve, reject));
    });
  }

  async UpdateMe(payload: UpdateRequest): Promise<UserResponse> {
    return new Promise((resolve, reject) => {
      userClient.UpdateMe(payload, this.metadata, handlePromise(resolve, reject));
    });
  }
}