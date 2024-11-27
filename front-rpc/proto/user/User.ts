// Original file: ../back-rpc/server/api/user/user.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Empty as _google_protobuf_Empty, Empty__Output as _google_protobuf_Empty__Output } from '../google/protobuf/Empty';
import type { LoginRequest as _user_LoginRequest, LoginRequest__Output as _user_LoginRequest__Output } from '../user/LoginRequest';
import type { LoginResponse as _user_LoginResponse, LoginResponse__Output as _user_LoginResponse__Output } from '../user/LoginResponse';
import type { RegisterRequest as _user_RegisterRequest, RegisterRequest__Output as _user_RegisterRequest__Output } from '../user/RegisterRequest';
import type { UpdateRequest as _user_UpdateRequest, UpdateRequest__Output as _user_UpdateRequest__Output } from '../user/UpdateRequest';
import type { UserResponse as _user_UserResponse, UserResponse__Output as _user_UserResponse__Output } from '../user/UserResponse';

export interface UserClient extends grpc.Client {
  GetMe(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  GetMe(argument: _google_protobuf_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  GetMe(argument: _google_protobuf_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  GetMe(argument: _google_protobuf_Empty, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  getMe(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  getMe(argument: _google_protobuf_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  getMe(argument: _google_protobuf_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  getMe(argument: _google_protobuf_Empty, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  
  Login(argument: _user_LoginRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
  Login(argument: _user_LoginRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
  Login(argument: _user_LoginRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
  Login(argument: _user_LoginRequest, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
  login(argument: _user_LoginRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
  login(argument: _user_LoginRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
  login(argument: _user_LoginRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
  login(argument: _user_LoginRequest, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
  
  Register(argument: _user_RegisterRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
  Register(argument: _user_RegisterRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
  Register(argument: _user_RegisterRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
  Register(argument: _user_RegisterRequest, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
  register(argument: _user_RegisterRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
  register(argument: _user_RegisterRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
  register(argument: _user_RegisterRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
  register(argument: _user_RegisterRequest, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
  
  UpdateMe(argument: _user_UpdateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  UpdateMe(argument: _user_UpdateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  UpdateMe(argument: _user_UpdateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  UpdateMe(argument: _user_UpdateRequest, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  updateMe(argument: _user_UpdateRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  updateMe(argument: _user_UpdateRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  updateMe(argument: _user_UpdateRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  updateMe(argument: _user_UpdateRequest, callback: grpc.requestCallback<_user_UserResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface UserHandlers extends grpc.UntypedServiceImplementation {
  GetMe: grpc.handleUnaryCall<_google_protobuf_Empty__Output, _user_UserResponse>;
  
  Login: grpc.handleUnaryCall<_user_LoginRequest__Output, _user_LoginResponse>;
  
  Register: grpc.handleUnaryCall<_user_RegisterRequest__Output, _user_LoginResponse>;
  
  UpdateMe: grpc.handleUnaryCall<_user_UpdateRequest__Output, _user_UserResponse>;
  
}

export interface UserDefinition extends grpc.ServiceDefinition {
  GetMe: MethodDefinition<_google_protobuf_Empty, _user_UserResponse, _google_protobuf_Empty__Output, _user_UserResponse__Output>
  Login: MethodDefinition<_user_LoginRequest, _user_LoginResponse, _user_LoginRequest__Output, _user_LoginResponse__Output>
  Register: MethodDefinition<_user_RegisterRequest, _user_LoginResponse, _user_RegisterRequest__Output, _user_LoginResponse__Output>
  UpdateMe: MethodDefinition<_user_UpdateRequest, _user_UserResponse, _user_UpdateRequest__Output, _user_UserResponse__Output>
}
