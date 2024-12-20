// Original file: ../back-rpc/server/api/tchat/tchat.proto


export interface Message {
  'id'?: (number);
  'userId'?: (number);
  'userName'?: (string);
  'content'?: (string);
  'createdAt'?: (string);
}

export interface Message__Output {
  'id': (number);
  'userId': (number);
  'userName': (string);
  'content': (string);
  'createdAt': (string);
}
