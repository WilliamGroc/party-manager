import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { GuestClient as _guest_GuestClient, GuestDefinition as _guest_GuestDefinition } from './guest/Guest';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  google: {
    protobuf: {
      Empty: MessageTypeDefinition
    }
  }
  guest: {
    AddGuestRequest: MessageTypeDefinition
    GetAllGuestFromRequest: MessageTypeDefinition
    Guest: SubtypeConstructor<typeof grpc.Client, _guest_GuestClient> & { service: _guest_GuestDefinition }
    GuestRequest: MessageTypeDefinition
    GuestResponse: MessageTypeDefinition
    GuestsResponse: MessageTypeDefinition
    LinkQuery: MessageTypeDefinition
    UpdateGuestRequest: MessageTypeDefinition
  }
}

