import { MessageWithSenderViewModel } from './MessageWithSenderViewModel';
import { User } from './user';

export interface SenderAndReceiver {
  Sender?: User;
  Receiver?: User;
  allMessagesBetween?: MessageWithSenderViewModel[];
}
