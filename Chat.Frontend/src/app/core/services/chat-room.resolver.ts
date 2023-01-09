import { RoomService } from 'src/app/core/services/room.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ChatRoomResolver implements Resolve<any> {
  constructor(private _roomService: RoomService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params['id'];
    let pass = '' + route.queryParamMap.get('param');

    if (!id) {
      return false;
    }

    return this._roomService.getRoomById(id, pass);
  }
}
