import { IRoom, Room } from './../models/room.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private _baseUrl = '/api/Chat';

  constructor(private http: HttpClient) {}

  getRooms() {
    return this.http.get<IRoom[]>(`${this._baseUrl}/rooms`).pipe(
      map((response: IRoom[]) => {
        const mappedResponse = response.map((r) => new Room(r));
        return mappedResponse;
      })
    );
  }

  addNewRoom() {
    return this.http.get<IRoom[]>(`${this._baseUrl}/rooms`).pipe(
      map((response: IRoom[]) => {
        const mappedResponse = response.map((r) => new Room(r));
        return mappedResponse;
      })
    );
  }
}
