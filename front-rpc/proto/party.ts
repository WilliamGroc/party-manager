import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { GuestClient as _guest_GuestClient, GuestDefinition as _guest_GuestDefinition } from './guest/Guest';
import type { PartyClient as _party_PartyClient, PartyDefinition as _party_PartyDefinition } from './party/Party';

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
  party: {
    CreatePartyRequest: MessageTypeDefinition
    CreatePartyResponse: MessageTypeDefinition
    GetAllRequest: MessageTypeDefinition
    GetRequest: MessageTypeDefinition
    GetSharedRequest: MessageTypeDefinition
    PartiesResponse: MessageTypeDefinition
    Party: SubtypeConstructor<typeof grpc.Client, _party_PartyClient> & { service: _party_PartyDefinition }
    PartyResponse: MessageTypeDefinition
    UpdatePartyRequest: MessageTypeDefinition
  }
}

