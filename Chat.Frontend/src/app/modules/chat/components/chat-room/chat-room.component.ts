import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/core/base.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { ChatService } from 'src/app/core/services/chat.service';
import { IMessage } from 'src/app/core/services/models/message.model';
import { RoomDto } from 'src/app/core/services/models/room-dto.model';
import { UserDto } from 'src/app/core/services/models/user.model';
import { RoomService } from 'src/app/core/services/room.service';

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

  roomId: string = '';

  room: RoomDto | null = null;

  constructor(
    private _chatService: ChatService,
    private _route: ActivatedRoute,
    private _roomService: RoomService,
    private _authService: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    this.roomId = '' + this._route.snapshot.paramMap.get('id');
    if (!!this.roomId) {
      this._authService.user$.subscribe((user) => {
        if (user) this.user = user;
      });

      this.getRoomDetails(+this.roomId);
      this._chatService.startConnection(this.roomId);

      this._chatService.messages$.subscribe((messages) => {
        this.messages = [...messages];
      });
    }
  }

  getRoomDetails(roomId: number) {
    this.subscriptions$.add(
      this._roomService.getRoomById(roomId).subscribe((room) => {
        this.room = room;
      })
    );
  }

  override ngOnDestroy(): void {
    this.subscriptions$.unsubscribe();
    this._chatService.closeConnection(this.roomId);
  }
}
