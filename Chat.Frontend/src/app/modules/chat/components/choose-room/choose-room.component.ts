import { IRoomRequest } from './../../../../core/services/models/room-request.model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/core/base.component';
import { RoomDto } from 'src/app/core/services/models/room-dto.model';
import { RoomService } from 'src/app/core/services/room.service';

@Component({
  selector: 'app-choose-room',
  templateUrl: './choose-room.component.html',
  styleUrls: ['./choose-room.component.scss'],
})
export class ChooseRoomComponent extends BaseComponent implements OnInit {
  readonly availableColorsMap = [
    { colorName: 'Red', value: '🔴' },
    { colorName: 'Orange', value: '🟠' },
    { colorName: 'Yellow', value: '🟡' },
    { colorName: 'Green', value: '🟢' },
    { colorName: 'Blue', value: '🔵' },
    { colorName: 'Purple', value: '🟣' },
    { colorName: 'Transparent', value: '⭕' },
  ];

  createNewForm = new FormGroup({
    chatRoomName: new FormControl(null, [
      Validators.minLength(3),
      Validators.maxLength(30),
    ]),
  });

  roomsCreatedByMe: RoomDto[] = [];
  roomsCreatedByOthers: RoomDto[] = [];

  constructor(private _roomService: RoomService) {
    super();
  }

  ngOnInit(): void {
    this.getChatRooms();
  }

  getChatRooms() {
    this.subscriptions$.add(
      this._roomService.getRooms().subscribe((roomsResponse) => {
        this.roomsCreatedByMe = roomsResponse.roomsCreatedByMe;
        this.roomsCreatedByOthers = roomsResponse.roomsCreatedByOthers;
      })
    );
  }

  deleteRoom(roomId: number) {
    this.subscriptions$.add(
      this._roomService.deleteRoom(roomId).subscribe(() => {
        this.getChatRooms();
      })
    );
  }

  createRoom() {
    if (!this.createNewForm.valid) {
      return;
    }
    const request: IRoomRequest = {
      name: '' + this.createNewForm.value.chatRoomName,
    };

    this.subscriptions$.add(
      this._roomService.createRoom(request).subscribe(() => {
        this.getChatRooms();
        this.createNewForm.reset();
      })
    );
  }
}
