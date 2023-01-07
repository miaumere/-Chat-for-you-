import { ColorsString } from '../enums/color.enum';

export interface IRoomDto {
  id: number;
  name: string;
  color: ColorsString;
}

export class RoomDto implements IRoomDto {
  id = 0;
  name: string = '';
  color: ColorsString = 'Transparent';

  constructor(initialValues: IRoomDto) {
    Object.assign(this, initialValues);
  }
}
