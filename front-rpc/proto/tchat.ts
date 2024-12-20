import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { TchatClient as _tchat_TchatClient, TchatDefinition as _tchat_TchatDefinition } from './tchat/Tchat';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  tchat: {
    AddMessageRequest: MessageTypeDefinition
    AddMessageResponse: MessageTypeDefinition
    GetMessagesRequest: MessageTypeDefinition
    GetMessagesResponse: MessageTypeDefinition
    Message: MessageTypeDefinition
    Tchat: SubtypeConstructor<typeof grpc.Client, _tchat_TchatClient> & { service: _tchat_TchatDefinition }
  }
}

