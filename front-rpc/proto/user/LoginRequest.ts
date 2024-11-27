// Original file: ../back-rpc/server/api/user/user.proto


export interface LoginRequest {
  'email'?: (string);
  'password'?: (string);
  'username'?: (string);
  'isSSO'?: (boolean);
  'idSSO'?: (string);
  'typeSSO'?: (string);
}

export interface LoginRequest__Output {
  'email': (string);
  'password': (string);
  'username': (string);
  'isSSO': (boolean);
  'idSSO': (string);
  'typeSSO': (string);
}
