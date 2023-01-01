export interface IRoomDto {
  id: number;
  name: string;
  author: string;
}

export class RoomDto implements IRoomDto {
  id = 0;
  name: string = '';
  author: string = '';

  constructor(initialValues: IRoomDto) {
    Object.assign(this, initialValues);
  }
}
