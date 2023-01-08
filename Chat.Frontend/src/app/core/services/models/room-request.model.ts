import { IRoomDto } from './room-dto.model';

export type IRoomRequest = Omit<IRoomDto, 'isPrivate'> & { password: string };
