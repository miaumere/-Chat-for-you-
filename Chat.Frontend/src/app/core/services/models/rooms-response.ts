import { IRoomDto } from './room-dto.model';

export interface IRoomsResponse {
  roomsCreatedByMe: IRoomDto[];
  roomsCreatedByOthers: IRoomDto[];
}

export class RoomsResponse implements IRoomsResponse {
  roomsCreatedByMe: IRoomDto[] = [];
  roomsCreatedByOthers: IRoomDto[] = [];

  constructor(initialValues: IRoomsResponse) {
    Object.assign(this, initialValues);
  }
}
