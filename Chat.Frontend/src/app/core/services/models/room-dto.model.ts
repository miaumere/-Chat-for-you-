import { ColorsString } from '../enums/color.enum';

export interface IRoomDto {
  id: number | null;
  name: string;
  color: ColorsString;
  isPrivate?: boolean;
  username?: string;
}

export class RoomDto implements IRoomDto {
  id = 0;
  name: string = '';
  color: ColorsString = 'Transparent';

  constructor(initialValues: IRoomDto) {
    Object.assign(this, initialValues);
  }
}
