import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/core/base.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { ChatService } from 'src/app/core/services/chat.service';
import { UserDto } from 'src/app/core/services/models/user.model';
import { RoomService } from 'src/app/core/services/room.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent extends BaseComponent implements OnInit {
  name: string = '';
  user?: UserDto;
  messages: string[] = [];

  constructor(
    private _chatService: ChatService,
    private _route: ActivatedRoute,
    private _roomService: RoomService,
    private _authService: AuthService
  ) {
    super();
  }

  ngOnInit(): void {
    this._authService.user$.subscribe((user) => {
      if (user) this.user = user;
    });

    this._chatService.startConnection();

    this.getRoomDetails();

    this._chatService.messages$.subscribe((messages) => {
      this.messages = [...messages];
    });
  }

  getRoomDetails() {
    const roomId = this._route.snapshot.paramMap.get('id');

    if (!!roomId) {
      this.subscriptions$.add(
        this._roomService.getRoomById(+roomId).subscribe((room) => {
          this.name = room.name;
        })
      );
    }
  }
}
