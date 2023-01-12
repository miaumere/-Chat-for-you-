import { UserDto } from './user.model';

export interface IMessage {
  sentBy: UserDto;
  sentDate: Date;

  content: string | null;
}
