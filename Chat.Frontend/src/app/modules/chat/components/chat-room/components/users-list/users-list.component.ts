import { UserDto } from './../../../../../../core/services/models/user.model';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BehaviorSubject, filter, map, tap } from 'rxjs';
import { ChatService } from 'src/app/core/services/chat.service';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/core/base.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent extends BaseComponent {
  public users$ = new BehaviorSubject<UserDto[]>([]);

  constructor(
    private _chatService: ChatService,
    private _route: ActivatedRoute
  ) {
    super();
    this.users$ = this._chatService.usersInRoom$;
  }
}
