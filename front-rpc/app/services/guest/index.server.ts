import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';
import { ProtoGrpcType as GuestGrpcType } from "proto/guest";
import { AppService, handlePromise } from "../service";
import { AddGuestRequest } from 'proto/guest/AddGuestRequest';
import { GuestsResponse } from 'proto/guest/GuestsResponse';
import { LinkQuery } from 'proto/guest/LinkQuery';
import { GuestRequest } from 'proto/guest/GuestRequest';
import { GetAllGuestFromRequest } from 'proto/guest/GetAllGuestFromRequest';
import { UpdateGuestRequest } from 'proto/guest/UpdateGuestRequest';
import { GuestResponse } from 'proto/guest/GuestResponse';


const guestPackageDefinition = protoLoader.loadSync('./proto/guest.proto',
  {
    keepCase: true,
    enums: String,
    defaults: true,
    oneofs: true,
  });
const guestPackage = (grpc.loadPackageDefinition(guestPackageDefinition) as unknown) as GuestGrpcType;

export class GuestService extends AppService {
  guestClient = new guestPackage.guest.Guest(this.baseApiUrl, grpc.credentials.createInsecure());

  async AddGuestToParty(payload: AddGuestRequest): Promise<GuestsResponse> {
    return new Promise((resolve, reject) => {
      this.guestClient.AddGuestToParty(payload, this.metadata, handlePromise(resolve, reject));
    });
  }

  async AddGuestWithLink(payload: LinkQuery): Promise<GuestResponse> {
    return new Promise((resolve, reject) => {
      this.guestClient.AddGuestWithLink(payload, this.metadata, handlePromise(resolve, reject));
    });
  }

  async DeleteGuestFromParty(payload: GuestRequest): Promise<void> {
    return new Promise((resolve, reject) => {
      this.guestClient.DeleteGuestFromParty(payload, this.metadata, handlePromise(resolve, reject));
    });
  }

  async GetAllGuestFromParty(payload: GetAllGuestFromRequest): Promise<GuestsResponse> {
    return new Promise((resolve, reject) => {
      this.guestClient.GetAllGuestFromParty(payload, this.metadata, handlePromise(resolve, reject));
    });
  }

  async GetShareLink(payload: GuestRequest): Promise<LinkQuery> {
    return new Promise((resolve, reject) => {
      this.guestClient.GetShareLink(payload, this.metadata, handlePromise(resolve, reject));
    });
  }

  async UpdateGuest(payload: UpdateGuestRequest): Promise<GuestResponse> {
    return new Promise((resolve, reject) => {
      this.guestClient.UpdateGuest(payload, this.metadata, handlePromise(resolve, reject));
    });
  }
}