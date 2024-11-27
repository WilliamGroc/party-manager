import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';
import { ProtoGrpcType as PartyGrpcType } from "proto/party";
import { AppService, handlePromise } from '../service';
import { GetSharedRequest } from 'proto/party/GetSharedRequest';
import { PartyResponse } from 'proto/party/PartyResponse';
import { CreatePartyRequest } from 'proto/party/CreatePartyRequest';
import { GetRequest } from 'proto/party/GetRequest';
import { PartiesResponse } from 'proto/party/PartiesResponse';
import { UpdatePartyRequest } from 'proto/party/UpdatePartyRequest';

const partyPackageDefinition = protoLoader.loadSync('../back-rpc/server/api/party/party.proto',
  {
    keepCase: true,
    enums: String,
    defaults: true,
    oneofs: true,
    includeDirs: ['../back-rpc']
  });
const partyPackage = (grpc.loadPackageDefinition(partyPackageDefinition) as unknown) as PartyGrpcType;
export const partyClient = new partyPackage.party.Party('localhost:1234', grpc.credentials.createInsecure());

export class PartyService extends AppService {
  async GetSharedParty(payload: GetSharedRequest): Promise<PartyResponse> {
    return new Promise((resolve, reject) => {
      partyClient.GetSharedParty(payload, this.metadata, handlePromise(resolve, reject));
    });
  }

  async CreateParty(payload: CreatePartyRequest): Promise<PartyResponse> {
    return new Promise((resolve, reject) => {
      partyClient.CreateParty(payload, this.metadata, handlePromise(resolve, reject));
    });
  }

  async DeleteParty(payload: GetRequest): Promise<void> {
    return new Promise((resolve, reject) => {
      partyClient.DeleteParty(payload, this.metadata, handlePromise(resolve, reject));
    });
  }

  async GetAllParty(): Promise<PartiesResponse> {
    return new Promise((resolve, reject) => {
      partyClient.GetAllParty({}, this.metadata, handlePromise(resolve, reject));
    });
  }

  async GetParty(payload: GetRequest): Promise<PartyResponse> {
    return new Promise((resolve, reject) => {
      partyClient.GetParty(payload, this.metadata, handlePromise(resolve, reject));
    });
  }

  async UpdateParty(payload: UpdatePartyRequest): Promise<PartyResponse> {
    return new Promise((resolve, reject) => {
      partyClient.UpdateParty(payload, this.metadata, handlePromise(resolve, reject));
    });
  }
}