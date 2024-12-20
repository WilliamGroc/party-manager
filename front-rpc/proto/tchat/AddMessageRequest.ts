// Original file: ../back-rpc/server/api/tchat/tchat.proto


export interface AddMessageRequest {
  'userId'?: (number);
  'partyId'?: (number);
  'content'?: (string);
}

export interface AddMessageRequest__Output {
  'userId': (number);
  'partyId': (number);
  'content': (string);
}
