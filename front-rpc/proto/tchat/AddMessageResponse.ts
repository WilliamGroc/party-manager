// Original file: ../back-rpc/server/api/tchat/tchat.proto

import type { Message as _tchat_Message, Message__Output as _tchat_Message__Output } from '../tchat/Message';

export interface AddMessageResponse {
  'message'?: (_tchat_Message | null);
}

export interface AddMessageResponse__Output {
  'message': (_tchat_Message__Output | null);
}
