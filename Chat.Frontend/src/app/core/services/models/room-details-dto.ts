import { RoomDto } from './room-dto.model';

export interface IRoomDetailsDto {}

export class IRoomDetailsDto extends RoomDto implements IRoomDetailsDto {
  constructor(initialValues: IRoomDetailsDto) {
    super({ id: initialValues.id, name: initialValues.name });
    Object.assign(this, initialValues);
  }
}
