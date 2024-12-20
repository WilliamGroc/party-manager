// Original file: ../back-rpc/server/api/tchat/tchat.proto

import type { Message as _tchat_Message, Message__Output as _tchat_Message__Output } from '../tchat/Message';

export interface GetMessagesResponse {
  'messages'?: (_tchat_Message)[];
}

export interface GetMessagesResponse__Output {
  'messages': (_tchat_Message__Output)[];
}
