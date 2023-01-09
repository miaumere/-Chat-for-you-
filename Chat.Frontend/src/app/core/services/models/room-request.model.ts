import { IRoomDto } from './room-dto.model';

export type IRoomRequest = IRoomDto & { password: string };
