// Original file: ../back-rpc/server/api/party/party.proto


export interface CreatePartyRequest {
  'name'?: (string);
  'description'?: (string);
  'location'?: (string);
  'date'?: (string);
  'userId'?: (number);
}

export interface CreatePartyRequest__Output {
  'name': (string);
  'description': (string);
  'location': (string);
  'date': (string);
  'userId': (number);
}
