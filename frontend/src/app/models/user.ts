import { mainPhoto } from './mainPhoto';

export interface User {
  id?: number;
  name: string;
  gender: boolean;
  dateOfBirth: Date;
  dateOfCreation: Date;
  lastTimeActive: Date;
  token?: string;
  mainPhoto?: mainPhoto;
  chatsLength?: number;
}
