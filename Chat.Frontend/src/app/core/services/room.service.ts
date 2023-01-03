import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { IRoomRequest } from './models/room-request.model';
import { RoomsResponse, IRoomsResponse } from './models/rooms-response';
import { IRoomDto, RoomDto } from './models/room-dto.model';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private _baseUrl = '/api/Room';

  constructor(private http: HttpClient) {}

  getRooms() {
    return this.http.get<RoomsResponse>(`${this._baseUrl}`).pipe(
      map((response: IRoomsResponse) => {
        const mappedResponse = new RoomsResponse(response);
        return mappedResponse;
      })
    );
  }

  getRoomById(roomId: number) {
    return this.http.get<RoomDto>(`${this._baseUrl}/${roomId}`).pipe(
      map((response: IRoomDto) => {
        const mappedResponse = new RoomDto(response);
        return mappedResponse;
      })
    );
  }

  createRoom(request: IRoomRequest) {
    return this.http.post<boolean>(`${this._baseUrl}`, request);
  }

  deleteRoom(roomId: number) {
    return this.http.delete<void>(`${this._baseUrl}`, { params: { roomId } });
  }
}
