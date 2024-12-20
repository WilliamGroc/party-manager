// Original file: ../back-rpc/server/api/tchat/tchat.proto


export interface GetMessagesRequest {
  'userId'?: (number);
  'partyId'?: (number);
}

export interface GetMessagesRequest__Output {
  'userId': (number);
  'partyId': (number);
}
