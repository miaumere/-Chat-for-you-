import { RoomService } from 'src/app/core/services/room.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ChatRoomResolver implements Resolve<any> {
  constructor(private _roomService: RoomService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params['id'];
    if (!id) {
      return false;
    }
    return this._roomService.getRoomById(id);
  }
}
