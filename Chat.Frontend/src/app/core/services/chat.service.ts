import { IMessage } from 'src/app/core/services/models/message.model';
import { UserDto } from './models/user.model';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { getUserFromJWT } from '../utils/get-user-from-jwt.function';

type events = 'GetRoomWithUsers' | 'ReceiveMessage' | 'GetLastMessages';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly _baseUrl = 'chatHub';

  public messages: IMessage[] = [];

  public messages$ = new BehaviorSubject<IMessage[]>([]);
  public usersInRoom$ = new BehaviorSubject<UserDto[]>([]);

  eventsMap = new Map<events, (...args: any[]) => any>([
    [
      'GetRoomWithUsers',
      (usersInRoom: UserDto[]) => {
        this.usersInRoom$.next(usersInRoom);
      },
    ],
    [
      'GetLastMessages',
      (messages: IMessage[]) => {
        console.log('last 10 messages: ', messages);
        this.messages$.next(messages);
        this.messages.push(...messages);
      },
    ],
    [
      'ReceiveMessage',
      (msg: IMessage) => {
        this.messages.push(msg);
        this.messages$.next(this.messages);
      },
    ],
  ]);

  public connection = new signalR.HubConnectionBuilder()
    .withUrl(this._baseUrl, {
      accessTokenFactory: () => {
        const authToken = localStorage.getItem('authToken');
        return `${authToken}`;
      },
    })
    .withAutomaticReconnect()
    .build();

  constructor() {}

  async startConnection(roomId: string) {
    await this.connection.start();

    this.eventsMap.forEach((callBack, event) => {
      this.connection.on(event, callBack);
    });

    await this.connection.invoke('EnterRoom', roomId);
  }

  async sendMessage(message: string, roomId: string) {
    await this.connection.invoke('ProcessMessage', message, roomId);
  }

  async closeConnection(roomId: string) {
    await this.connection.invoke('LeaveRoom', roomId);

    this.usersInRoom$.next([]);

    await this.connection.stop();
    this.eventsMap.forEach((_, event) => {
      this.connection.off(event);
    });
  }
}
