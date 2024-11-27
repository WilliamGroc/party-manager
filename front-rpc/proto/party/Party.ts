// Original file: ../back-rpc/server/api/party/party.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreatePartyRequest as _party_CreatePartyRequest, CreatePartyRequest__Output as _party_CreatePartyRequest__Output } from '../party/CreatePartyRequest';
import type { CreatePartyResponse as _party_CreatePartyResponse, CreatePartyResponse__Output as _party_CreatePartyResponse__Output } from '../party/CreatePartyResponse';
import type { Empty as _google_protobuf_Empty, Empty__Output as _google_protobuf_Empty__Output } from '../google/protobuf/Empty';
import type { GetRequest as _party_GetRequest, GetRequest__Output as _party_GetRequest__Output } from '../party/GetRequest';
import type { GetSharedRequest as _party_GetSharedRequest, GetSharedRequest__Output as _party_GetSharedRequest__Output } from '../party/GetSharedRequest';
import type { PartiesResponse as _party_PartiesResponse, PartiesResponse__Output as _party_PartiesResponse__Output } from '../party/PartiesResponse';
import type { PartyResponse as _party_PartyResponse, PartyResponse__Output as _party_PartyResponse__Output } from '../party/PartyResponse';
import type { UpdatePartyRequest as _party_UpdatePartyRequest, UpdatePartyRequest__Output as _party_UpdatePartyRequest__Output } from '../party/UpdatePartyRequest';

export interface PartyClient extends grpc.Client {
  CreateParty(argument: _party_CreatePartyRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_party_CreatePartyResponse__Output>): grpc.ClientUnaryCall;
  CreateParty(argument: _party_CreatePartyRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_party_CreatePartyResponse__Output>): grpc.ClientUnaryCall;
  CreateParty(argument: _party_CreatePartyRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_party_CreatePartyResponse__Output>): grpc.ClientUnaryCall;
  CreateParty(argument: _party_CreatePartyRequest, callback: grpc.requestCallback<_party_CreatePartyResponse__Output>): grpc.ClientUnaryCall;
  createParty(argument: _party_CreatePartyRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_party_CreatePartyResponse__Output>): grpc.ClientUnaryCall;
  createParty(argument: _party_CreatePartyRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_party_CreatePartyResponse__Output>): grpc.ClientUnaryCall;
  createParty(argument: _party_CreatePartyRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_party_CreatePartyResponse__Output>): grpc.ClientUnaryCall;
  createParty(argument: _party_CreatePartyRequest, callback: grpc.requestCallback<_party_CreatePartyResponse__Output>): grpc.ClientUnaryCall;
  
  DeleteParty(argument: _party_GetRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  DeleteParty(argument: _party_GetRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  DeleteParty(argument: _party_GetRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  DeleteParty(argument: _party_GetRequest, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  deleteParty(argument: _party_GetRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  deleteParty(argument: _party_GetRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  deleteParty(argument: _party_GetRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  deleteParty(argument: _party_GetRequest, callback: grpc.requestCallback<_google_protobuf_Empty__Output>): grpc.ClientUnaryCall;
  
  GetAllParty(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_party_PartiesResponse__Output>): grpc.ClientUnaryCall;
  GetAllParty(argument: _google_protobuf_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_party_PartiesResponse__Output>): grpc.ClientUnaryCall;
  GetAllParty(argument: _google_protobuf_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_party_PartiesResponse__Output>): grpc.ClientUnaryCall;
  GetAllParty(argument: _google_protobuf_Empty, callback: grpc.requestCallback<_party_PartiesResponse__Output>): grpc.ClientUnaryCall;
  getAllParty(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_party_PartiesResponse__Output>): grpc.ClientUnaryCall;
  getAllParty(argument: _google_protobuf_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_party_PartiesResponse__Output>): grpc.ClientUnaryCall;
  getAllParty(argument: _google_protobuf_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_party_PartiesResponse__Output>): grpc.ClientUnaryCall;
  getAllParty(argument: _google_protobuf_Empty, callback: grpc.requestCallback<_party_PartiesResponse__Output>): grpc.ClientUnaryCall;
  
  GetParty(argument: _party_GetRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_party_PartyResponse__Output>): grpc.ClientUnaryCall;
  GetParty(argument: _party_GetRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_party_PartyResponse__Output>): grpc.ClientUnaryCall;
  GetParty(argument: _party_GetRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_party_PartyResponse__Output>): grpc.ClientUnaryCall;
  GetParty(argument: _party_GetRequest, callback: grpc.requestCallback<_party_PartyResponse__Output>): grpc.ClientUnaryCall;
  getParty(argument: _party_GetRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_party_PartyResponse__Output>): grpc.ClientUnaryCall;
  getParty(argument: _party_GetRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_party_PartyResponse__Output>): grpc.ClientUnaryCall;
  getParty(argument: _party_GetRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_party_PartyResponse__Output>): grpc.ClientUnaryCall;
  getParty(argument: _party_GetRequest, callback: grpc.requestCallback<_party_PartyResponse__Output>): grpc.ClientUnaryCall;
  
  GetSharedParty(argument: _party_GetSharedRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_party_PartyResponse__Output>): grpc.ClientUnaryCall;
  GetSharedParty(argument: _party_GetSharedRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_party_PartyResponse__Output>): grpc.ClientUnaryCall;
  GetSharedParty(argument: _party_GetSharedRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_party_PartyResponse__Output>): grpc.ClientUnaryCall;
  GetSharedParty(argument: _party_GetSharedRequest, callback: grpc.requestCallback<_party_PartyResponse__Output>): grpc.ClientUnaryCall;
  getSharedParty(argument: _party_GetSharedRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_party_PartyResponse__Output>): grpc.ClientUnaryCall;
  getSharedParty(argument: _party_GetSharedRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_party_PartyResponse__Output>): grpc.ClientUnaryCall;
  getSharedParty(argument: _party_GetSharedRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_party_PartyResponse__Output>): grpc.ClientUnaryCall;
  getSharedParty(argument: _party_GetSharedRequest, callback: grpc.requestCallback<_party_PartyResponse__Output>): grpc.ClientUnaryCall;
  
  UpdateParty(argument: _party_UpdatePartyRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_party_PartyResponse__Output>): grpc.ClientUnaryCall;
  UpdateParty(argument: _party_UpdatePartyRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_party_PartyResponse__Output>): grpc.ClientUnaryCall;
  UpdateParty(argument: _party_UpdatePartyRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_party_PartyResponse__Output>): grpc.ClientUnaryCall;
  UpdateParty(argument: _party_UpdatePartyRequest, callback: grpc.requestCallback<_party_PartyResponse__Output>): grpc.ClientUnaryCall;
  updateParty(argument: _party_UpdatePartyRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_party_PartyResponse__Output>): grpc.ClientUnaryCall;
  updateParty(argument: _party_UpdatePartyRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_party_PartyResponse__Output>): grpc.ClientUnaryCall;
  updateParty(argument: _party_UpdatePartyRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_party_PartyResponse__Output>): grpc.ClientUnaryCall;
  updateParty(argument: _party_UpdatePartyRequest, callback: grpc.requestCallback<_party_PartyResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface PartyHandlers extends grpc.UntypedServiceImplementation {
  CreateParty: grpc.handleUnaryCall<_party_CreatePartyRequest__Output, _party_CreatePartyResponse>;
  
  DeleteParty: grpc.handleUnaryCall<_party_GetRequest__Output, _google_protobuf_Empty>;
  
  GetAllParty: grpc.handleUnaryCall<_google_protobuf_Empty__Output, _party_PartiesResponse>;
  
  GetParty: grpc.handleUnaryCall<_party_GetRequest__Output, _party_PartyResponse>;
  
  GetSharedParty: grpc.handleUnaryCall<_party_GetSharedRequest__Output, _party_PartyResponse>;
  
  UpdateParty: grpc.handleUnaryCall<_party_UpdatePartyRequest__Output, _party_PartyResponse>;
  
}

export interface PartyDefinition extends grpc.ServiceDefinition {
  CreateParty: MethodDefinition<_party_CreatePartyRequest, _party_CreatePartyResponse, _party_CreatePartyRequest__Output, _party_CreatePartyResponse__Output>
  DeleteParty: MethodDefinition<_party_GetRequest, _google_protobuf_Empty, _party_GetRequest__Output, _google_protobuf_Empty__Output>
  GetAllParty: MethodDefinition<_google_protobuf_Empty, _party_PartiesResponse, _google_protobuf_Empty__Output, _party_PartiesResponse__Output>
  GetParty: MethodDefinition<_party_GetRequest, _party_PartyResponse, _party_GetRequest__Output, _party_PartyResponse__Output>
  GetSharedParty: MethodDefinition<_party_GetSharedRequest, _party_PartyResponse, _party_GetSharedRequest__Output, _party_PartyResponse__Output>
  UpdateParty: MethodDefinition<_party_UpdatePartyRequest, _party_PartyResponse, _party_UpdatePartyRequest__Output, _party_PartyResponse__Output>
}
