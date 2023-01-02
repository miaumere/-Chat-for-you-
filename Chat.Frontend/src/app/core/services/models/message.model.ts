import { UserDto } from './user.model';

export interface IMessage {
  author: UserDto;
  date: Date;
  content: string | null;
}
