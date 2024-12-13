// Original file: ../back-rpc/server/api/party/party.proto


export interface UpdatePartyRequest {
  'id'?: (number);
  'name'?: (string);
  'description'?: (string);
  'location'?: (string);
  'date'?: (string);
  'userId'?: (number);
}

export interface UpdatePartyRequest__Output {
  'id': (number);
  'name': (string);
  'description': (string);
  'location': (string);
  'date': (string);
  'userId': (number);
}
