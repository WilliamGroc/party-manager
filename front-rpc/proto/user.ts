import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { UserClient as _user_UserClient, UserDefinition as _user_UserDefinition } from './user/User';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  user: {
    LoginRequest: MessageTypeDefinition
    LoginResponse: MessageTypeDefinition
    MeRequest: MessageTypeDefinition
    User: SubtypeConstructor<typeof grpc.Client, _user_UserClient> & { service: _user_UserDefinition }
    UserResponse: MessageTypeDefinition
  }
}

