export interface IRoomDto {
  id: number;
  name: string;
}

export class RoomDto implements IRoomDto {
  id = 0;
  name: string = '';

  constructor(initialValues: IRoomDto) {
    Object.assign(this, initialValues);
  }
}
