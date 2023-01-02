import { UserDto } from './../../../../../../core/services/models/user.model';
import { Component } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
  readonly userList: UserDto[] = [
    {
      id: 0,
      username: 'Axel.Leschh',
    },
    {
      id: 1,
      username: 'Gladyce_Blanda',
    },
    {
      id: 2,
      username: 'Maurice_Raynor43',
    },
    {
      id: 3,
      username: 'Gino_Cronin',
    },
  ];
}
