import { ColorsString } from './../../../../core/services/enums/color.enum';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/core/base.component';
import { IRoomDto, RoomDto } from 'src/app/core/services/models/room-dto.model';
import { RoomService } from 'src/app/core/services/room.service';
import { Colors } from 'src/app/core/services/enums/color.enum';
import { IRoomRequest } from 'src/app/core/services/models/room-request.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { UserDto } from 'src/app/core/services/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-choose-room',
  templateUrl: './choose-room.component.html',
  styleUrls: ['./choose-room.component.scss'],
})
export class ChooseRoomComponent extends BaseComponent implements OnInit {
  readonly Colors = Colors;
  readonly availableColorsMap = [
    { colorName: 'Red', value: '🔴' },
    { colorName: 'Orange', value: '🟠' },
    { colorName: 'Yellow', value: '🟡' },
    { colorName: 'Green', value: '🟢' },
    { colorName: 'Blue', value: '🔵' },
    { colorName: 'Purple', value: '🟣' },
    { colorName: 'Transparent', value: '⭕' },
  ];

  room: IRoomRequest = {
    id: 0,
    name: '',
    password: '',
    color: 'Transparent',
  };
  rooms: RoomDto[] = [];

  public user$ = new BehaviorSubject<UserDto | null>(null);

  constructor(
    private _roomService: RoomService,
    private _authService: AuthService,
    private _toastrService: ToastrService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getChatRooms();
    this.user$ = this._authService.user$;
  }

  getChatRooms() {
    this.subscriptions$.add(
      this._roomService.getRooms().subscribe((rooms) => {
        this.rooms = rooms;
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

  upsertRoom(form: NgForm, roomId: number | null) {
    if (!form.valid) {
      return;
    }
    const request: IRoomRequest = {
      id: roomId ?? null,
      name: '' + form.value.name,
      color: form.value.color as ColorsString,
      password: form.value.password,
    };

    this.subscriptions$.add(
      this._roomService.UpsertRoom(request).subscribe(() => {
        this.getChatRooms();
        form.reset();
        this._toastrService.success(
          roomId ? 'Sucessfully updated room' : 'Sucessfully added room'
        );
      })
    );
  }
}
