// Original file: ../back-rpc/server/api/party/party.proto

import type { GuestResponse as _guest_GuestResponse, GuestResponse__Output as _guest_GuestResponse__Output } from '../guest/GuestResponse';

export interface PartyResponse {
  'id'?: (number);
  'name'?: (string);
  'description'?: (string);
  'location'?: (string);
  'date'?: (string);
  'hostId'?: (number);
  'guests'?: (_guest_GuestResponse)[];
}

export interface PartyResponse__Output {
  'id': (number);
  'name': (string);
  'description': (string);
  'location': (string);
  'date': (string);
  'hostId': (number);
  'guests': (_guest_GuestResponse__Output)[];
}
