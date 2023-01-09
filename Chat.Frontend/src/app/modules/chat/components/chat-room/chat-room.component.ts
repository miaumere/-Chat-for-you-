import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/core/base.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { ChatService } from 'src/app/core/services/chat.service';
import { IMessage } from 'src/app/core/services/models/message.model';
import { RoomDto } from 'src/app/core/services/models/room-dto.model';
import { UserDto } from 'src/app/core/services/models/user.model';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  user?: UserDto;
  messages: IMessage[] = [];

  room: RoomDto | null = null;

  constructor(
    private _chatService: ChatService,
    private _authService: AuthService,
    private _route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.room = this._route.snapshot.data['data'];
    console.log(this.room);
    if (!!this.room) {
      this._authService.user$.subscribe((user) => {
        if (user) this.user = user;
      });

      this._chatService.startConnection('' + this.room.id);

      this._chatService.messages$.subscribe((messages) => {
        this.messages = [...messages];
      });
    }
  }

  override ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
    this._chatService.closeConnection('' + this.room?.id);
  }
}
