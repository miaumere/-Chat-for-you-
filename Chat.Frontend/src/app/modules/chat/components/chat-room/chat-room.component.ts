import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/base.component';
import { IRoomDetailsDto } from 'src/app/core/services/models/room-details-dto';
import { RoomService } from 'src/app/core/services/room/room.service';

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

  constructor(private _roomService: RoomService) {
    super();
  }

  ngOnInit(): void {}

  getRoomDetails() {
    // this.subscriptions$.add(
    //   this._roomService.getRooms().subscribe((roomsResponse) => {
    //     this.roomsCreatedByMe = roomsResponse.roomsCreatedByMe;
    //   })
    // );
  }
}
