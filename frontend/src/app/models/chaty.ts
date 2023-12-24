import { Message } from './Message';

export interface Chaty {
  senderId: number;
  receiverId: number;
  message?: Message;
}
