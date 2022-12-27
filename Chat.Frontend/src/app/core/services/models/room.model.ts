export interface IRoom {
  id: number;
  name: string;
  author: string;
}

export class Room implements IRoom {
  id = 0;
  name: string = '';
  author: string = '';

  constructor(initialValues: IRoom) {
    Object.assign(this, initialValues);
  }
}
