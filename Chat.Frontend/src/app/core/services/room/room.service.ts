import { IRoomDto, RoomDto } from '../models/room.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { IRoomRequest } from '../models/room-request.model';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private _baseUrl = '/api/Room';

  constructor(private http: HttpClient) {}

  getRooms() {
    return this.http.get<IRoomDto[]>(`${this._baseUrl}`).pipe(
      map((response: IRoomDto[]) => {
        const mappedResponse = response.map((r) => new RoomDto(r));
        return mappedResponse;
      })
    );
  }

  createRoom(request: IRoomRequest) {
    return this.http.post<boolean>(`${this._baseUrl}`, request);
  }
}
