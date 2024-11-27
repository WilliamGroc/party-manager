// Original file: ../back-rpc/server/api/guest/guest.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AddGuestRequest as _guest_AddGuestRequest, AddGuestRequest__Output as _guest_AddGuestRequest__Output } from '../guest/AddGuestRequest';
import type { Empty as _google_protobuf_Empty, Empty__Output as _google_protobuf_Empty__Output } from '../google/protobuf/Empty';
import type { GetAllGuestFromRequest as _guest_GetAllGuestFromRequest, GetAllGuestFromRequest__Output as _guest_GetAllGuestFromRequest__Output } from '../guest/GetAllGuestFromRequest';
import type { GuestRequest as _guest_GuestRequest, GuestRequest__Output as _guest_GuestRequest__Output } from '../guest/GuestRequest';
import type { GuestResponse as _guest_GuestResponse, GuestResponse__Output as _guest_GuestResponse__Output } from '../guest/GuestResponse';
import type { GuestsResponse as _guest_GuestsResponse, GuestsResponse__Output as _guest_GuestsResponse__Output } from '../guest/GuestsResponse';
import type { LinkQuery as _guest_LinkQuery, LinkQuery__Output as _guest_LinkQuery__Output } from '../guest/LinkQuery';
import type { UpdateGuestRequest as _guest_UpdateGuestRequest, UpdateGuestRequest__Output as _guest_UpdateGuestRequest__Output } from '../guest/UpdateGuestRequest';

export interface GuestClient extends grpc.Client {
  AddGuestToParty(argument: _guest_AddGuestRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_guest_GuestsResponse__Output>): grpc.ClientUnaryCall;
  AddGuestToParty(argument: _guest_AddGuestRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_guest_GuestsResponse__Output>): grpc.ClientUnaryCall;
  AddGuestToParty(argument: _guest_AddGuestRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_guest_GuestsResponse__Output>): grpc.ClientUnaryCall;
  AddGuestToParty(argument: _guest_AddGuestRequest, callback: grpc.requestCallback<_guest_GuestsResponse__Output>): grpc.ClientUnaryCall;
  addGuestToParty(argument: _guest_AddGuestRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_guest_GuestsResponse__Output>): grpc.ClientUnaryCall;
  addGuestToParty(argument: _guest_AddGuestRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_guest_GuestsResponse__Output>): grpc.ClientUnaryCall;
  addGuestToParty(argument: _guest_AddGuestRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_guest_GuestsResponse__Output>): grpc.ClientUnaryCall;
  addGuestToParty(argument: _guest_AddGuestRequest, callback: grpc.requestCallback<_guest_GuestsResponse__Output>): grpc.ClientUnaryCall;
  
  AddGuestWithLink(argument: _guest_LinkQuery, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_guest_GuestResponse__Output>): grpc.ClientUnaryCall;
  AddGuestWithLink(argument: _guest_LinkQuery, metadata: grpc.Metadata, callback: grpc.requestCallback<_guest_GuestResponse__Output>): grpc.ClientUnaryCall;
  AddGuestWithLink(argument: _guest_LinkQuery, options: grpc.CallOptions, callback: grpc.requestCallback<_guest_GuestResponse__Output>): grpc.ClientUnaryCall;
  AddGuestWithLink(argument: _guest_LinkQuery, callback: grpc.requestCallback<_guest_GuestResponse__Output>): grpc.ClientUnaryCall;
  addGuestWithLink(argument: _guest_LinkQuery, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_guest_GuestResponse__Output>): grpc.ClientUnaryCall;
  addGuestWithLink(argument: _guest_LinkQuery, metadata: grpc.Metadata, callback: grpc.requestCallback<_guest_GuestResponse__Output>): grpc.ClientUnaryCall;
  addGuestWithLink(argument: _guest_LinkQuery, options: grpc.CallOptions, callback: grpc.requestCallback<_guest_GuestResponse__Output>): grpc.ClientUnaryCall;
  addGuestWithLink(argument: _guest_LinkQuery, callback: grpc.requestCallback<_guest_GuestResponse__Output>): grpc.ClientUnaryCall;
  
  DeleteGuestFromParty(argument: _guest_GuestRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  DeleteGuestFromParty(argument: _guest_GuestRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  DeleteGuestFromParty(argument: _guest_GuestRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  DeleteGuestFromParty(argument: _guest_GuestRequest, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  deleteGuestFromParty(argument: _guest_GuestRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  deleteGuestFromParty(argument: _guest_GuestRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  deleteGuestFromParty(argument: _guest_GuestRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  deleteGuestFromParty(argument: _guest_GuestRequest, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  
  GetAllGuestFromParty(argument: _guest_GetAllGuestFromRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_guest_GuestsResponse__Output>): grpc.ClientUnaryCall;
  GetAllGuestFromParty(argument: _guest_GetAllGuestFromRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_guest_GuestsResponse__Output>): grpc.ClientUnaryCall;
  GetAllGuestFromParty(argument: _guest_GetAllGuestFromRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_guest_GuestsResponse__Output>): grpc.ClientUnaryCall;
  GetAllGuestFromParty(argument: _guest_GetAllGuestFromRequest, callback: grpc.requestCallback<_guest_GuestsResponse__Output>): grpc.ClientUnaryCall;
  getAllGuestFromParty(argument: _guest_GetAllGuestFromRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_guest_GuestsResponse__Output>): grpc.ClientUnaryCall;
  getAllGuestFromParty(argument: _guest_GetAllGuestFromRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_guest_GuestsResponse__Output>): grpc.ClientUnaryCall;
  getAllGuestFromParty(argument: _guest_GetAllGuestFromRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_guest_GuestsResponse__Output>): grpc.ClientUnaryCall;
  getAllGuestFromParty(argument: _guest_GetAllGuestFromRequest, callback: grpc.requestCallback<_guest_GuestsResponse__Output>): grpc.ClientUnaryCall;
  
  GetShareLink(argument: _guest_GuestRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_guest_LinkQuery__Output>): grpc.ClientUnaryCall;
  GetShareLink(argument: _guest_GuestRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_guest_LinkQuery__Output>): grpc.ClientUnaryCall;
  GetShareLink(argument: _guest_GuestRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_guest_LinkQuery__Output>): grpc.ClientUnaryCall;
  GetShareLink(argument: _guest_GuestRequest, callback: grpc.requestCallback<_guest_LinkQuery__Output>): grpc.ClientUnaryCall;
  getShareLink(argument: _guest_GuestRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_guest_LinkQuery__Output>): grpc.ClientUnaryCall;
  getShareLink(argument: _guest_GuestRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_guest_LinkQuery__Output>): grpc.ClientUnaryCall;
  getShareLink(argument: _guest_GuestRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_guest_LinkQuery__Output>): grpc.ClientUnaryCall;
  getShareLink(argument: _guest_GuestRequest, callback: grpc.requestCallback<_guest_LinkQuery__Output>): grpc.ClientUnaryCall;
  
  UpdateGuest(argument: _guest_UpdateGuestRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_guest_GuestResponse__Output>): grpc.ClientUnaryCall;
  UpdateGuest(argument: _guest_UpdateGuestRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_guest_GuestResponse__Output>): grpc.ClientUnaryCall;
  UpdateGuest(argument: _guest_UpdateGuestRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_guest_GuestResponse__Output>): grpc.ClientUnaryCall;
  UpdateGuest(argument: _guest_UpdateGuestRequest, callback: grpc.requestCallback<_guest_GuestResponse__Output>): grpc.ClientUnaryCall;
  updateGuest(argument: _guest_UpdateGuestRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_guest_GuestResponse__Output>): grpc.ClientUnaryCall;
  updateGuest(argument: _guest_UpdateGuestRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_guest_GuestResponse__Output>): grpc.ClientUnaryCall;
  updateGuest(argument: _guest_UpdateGuestRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_guest_GuestResponse__Output>): grpc.ClientUnaryCall;
  updateGuest(argument: _guest_UpdateGuestRequest, callback: grpc.requestCallback<_guest_GuestResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface GuestHandlers extends grpc.UntypedServiceImplementation {
  AddGuestToParty: grpc.handleUnaryCall<_guest_AddGuestRequest__Output, _guest_GuestsResponse>;
  
  AddGuestWithLink: grpc.handleUnaryCall<_guest_LinkQuery__Output, _guest_GuestResponse>;
  
  DeleteGuestFromParty: grpc.handleUnaryCall<_guest_GuestRequest__Output, _google_protobuf_Empty>;
  
  GetAllGuestFromParty: grpc.handleUnaryCall<_guest_GetAllGuestFromRequest__Output, _guest_GuestsResponse>;
  
  GetShareLink: grpc.handleUnaryCall<_guest_GuestRequest__Output, _guest_LinkQuery>;
  
  UpdateGuest: grpc.handleUnaryCall<_guest_UpdateGuestRequest__Output, _guest_GuestResponse>;
  
}

export interface GuestDefinition extends grpc.ServiceDefinition {
  AddGuestToParty: MethodDefinition<_guest_AddGuestRequest, _guest_GuestsResponse, _guest_AddGuestRequest__Output, _guest_GuestsResponse__Output>
  AddGuestWithLink: MethodDefinition<_guest_LinkQuery, _guest_GuestResponse, _guest_LinkQuery__Output, _guest_GuestResponse__Output>
  DeleteGuestFromParty: MethodDefinition<_guest_GuestRequest, _google_protobuf_Empty, _guest_GuestRequest__Output, _google_protobuf_Empty__Output>
  GetAllGuestFromParty: MethodDefinition<_guest_GetAllGuestFromRequest, _guest_GuestsResponse, _guest_GetAllGuestFromRequest__Output, _guest_GuestsResponse__Output>
  GetShareLink: MethodDefinition<_guest_GuestRequest, _guest_LinkQuery, _guest_GuestRequest__Output, _guest_LinkQuery__Output>
  UpdateGuest: MethodDefinition<_guest_UpdateGuestRequest, _guest_GuestResponse, _guest_UpdateGuestRequest__Output, _guest_GuestResponse__Output>
}
