// Original file: ../back-rpc/server/api/guest/guest.proto


export interface UpdateGuestRequest {
  'partyId'?: (number);
  'guestId'?: (number);
  'present'?: (string);
  'link'?: (string);
}

export interface UpdateGuestRequest__Output {
  'partyId': (number);
  'guestId': (number);
  'present': (string);
  'link': (string);
}
