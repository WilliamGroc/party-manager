// Original file: ../back-rpc/server/api/tchat/tchat.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AddMessageRequest as _tchat_AddMessageRequest, AddMessageRequest__Output as _tchat_AddMessageRequest__Output } from '../tchat/AddMessageRequest';
import type { AddMessageResponse as _tchat_AddMessageResponse, AddMessageResponse__Output as _tchat_AddMessageResponse__Output } from '../tchat/AddMessageResponse';
import type { GetMessagesRequest as _tchat_GetMessagesRequest, GetMessagesRequest__Output as _tchat_GetMessagesRequest__Output } from '../tchat/GetMessagesRequest';
import type { GetMessagesResponse as _tchat_GetMessagesResponse, GetMessagesResponse__Output as _tchat_GetMessagesResponse__Output } from '../tchat/GetMessagesResponse';

export interface TchatClient extends grpc.Client {
  AddMessage(argument: _tchat_AddMessageRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_tchat_AddMessageResponse__Output>): grpc.ClientUnaryCall;
  AddMessage(argument: _tchat_AddMessageRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_tchat_AddMessageResponse__Output>): grpc.ClientUnaryCall;
  AddMessage(argument: _tchat_AddMessageRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_tchat_AddMessageResponse__Output>): grpc.ClientUnaryCall;
  AddMessage(argument: _tchat_AddMessageRequest, callback: grpc.requestCallback<_tchat_AddMessageResponse__Output>): grpc.ClientUnaryCall;
  addMessage(argument: _tchat_AddMessageRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_tchat_AddMessageResponse__Output>): grpc.ClientUnaryCall;
  addMessage(argument: _tchat_AddMessageRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_tchat_AddMessageResponse__Output>): grpc.ClientUnaryCall;
  addMessage(argument: _tchat_AddMessageRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_tchat_AddMessageResponse__Output>): grpc.ClientUnaryCall;
  addMessage(argument: _tchat_AddMessageRequest, callback: grpc.requestCallback<_tchat_AddMessageResponse__Output>): grpc.ClientUnaryCall;
  
  GetMessages(argument: _tchat_GetMessagesRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_tchat_GetMessagesResponse__Output>): grpc.ClientUnaryCall;
  GetMessages(argument: _tchat_GetMessagesRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_tchat_GetMessagesResponse__Output>): grpc.ClientUnaryCall;
  GetMessages(argument: _tchat_GetMessagesRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_tchat_GetMessagesResponse__Output>): grpc.ClientUnaryCall;
  GetMessages(argument: _tchat_GetMessagesRequest, callback: grpc.requestCallback<_tchat_GetMessagesResponse__Output>): grpc.ClientUnaryCall;
  getMessages(argument: _tchat_GetMessagesRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_tchat_GetMessagesResponse__Output>): grpc.ClientUnaryCall;
  getMessages(argument: _tchat_GetMessagesRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_tchat_GetMessagesResponse__Output>): grpc.ClientUnaryCall;
  getMessages(argument: _tchat_GetMessagesRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_tchat_GetMessagesResponse__Output>): grpc.ClientUnaryCall;
  getMessages(argument: _tchat_GetMessagesRequest, callback: grpc.requestCallback<_tchat_GetMessagesResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface TchatHandlers extends grpc.UntypedServiceImplementation {
  AddMessage: grpc.handleUnaryCall<_tchat_AddMessageRequest__Output, _tchat_AddMessageResponse>;
  
  GetMessages: grpc.handleUnaryCall<_tchat_GetMessagesRequest__Output, _tchat_GetMessagesResponse>;
  
}

export interface TchatDefinition extends grpc.ServiceDefinition {
  AddMessage: MethodDefinition<_tchat_AddMessageRequest, _tchat_AddMessageResponse, _tchat_AddMessageRequest__Output, _tchat_AddMessageResponse__Output>
  GetMessages: MethodDefinition<_tchat_GetMessagesRequest, _tchat_GetMessagesResponse, _tchat_GetMessagesRequest__Output, _tchat_GetMessagesResponse__Output>
}
