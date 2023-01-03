import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { ChatService } from 'src/app/core/services/chat.service';
import { IRoomDetailsDto } from 'src/app/core/services/models/room-details-dto';
import { RoomService } from 'src/app/core/services/room.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent extends BaseComponent implements OnInit {
  roomDetails: IRoomDetailsDto | null = {
    id: 1,
    name: 'Room 1 ',
  };

  messages: string[] = [];

  constructor(
    private _roomService: RoomService,
    public _chatService: ChatService
  ) {
    super();
  }

  ngOnInit(): void {
    this._chatService.startConnection();

    this._chatService.messages$.subscribe((messages) => {
      console.log('new messages', messages);
      this.messages = [...messages];
    });
  }

  getRoomDetails() {
    // this.subscriptions$.add(
    //   this._roomService.getRooms().subscribe((roomsResponse) => {
    //     this.roomsCreatedByMe = roomsResponse.roomsCreatedByMe;
    //   })
    // );
  }
}
