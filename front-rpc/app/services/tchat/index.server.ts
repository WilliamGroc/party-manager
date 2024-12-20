import { AppService, handlePromise } from "../service";
import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';
import { ProtoGrpcType as TchatGrpcType } from "proto/tchat";
import { GetMessagesRequest } from "proto/tchat/GetMessagesRequest";
import { GetMessagesResponse } from "proto/tchat/GetMessagesResponse";
import { AddMessageRequest } from "proto/tchat/AddMessageRequest";
import { AddMessageResponse } from "proto/tchat/AddMessageResponse";

const tchatPackageDefinition = protoLoader.loadSync('../back-rpc/server/api/tchat/tchat.proto',
  {
    keepCase: true,
    enums: String,
    defaults: true,
    oneofs: true
  });
const tchatPackage = (grpc.loadPackageDefinition(tchatPackageDefinition) as unknown) as TchatGrpcType;

export class TchatService extends AppService {
  tchatClient = new tchatPackage.tchat.Tchat(this.baseApiUrl, grpc.credentials.createInsecure());

  async GetMessages(payload: GetMessagesRequest): Promise<GetMessagesResponse> {
    return new Promise((resolve, reject) => {
      this.tchatClient.GetMessages(payload, this.metadata, handlePromise(resolve, reject));
    });
  }

  async AddMessage(payload: AddMessageRequest): Promise<AddMessageResponse> {
    return new Promise((resolve, reject) => {
      this.tchatClient.AddMessage(payload, this.metadata, handlePromise(resolve, reject));
    });
  }
}