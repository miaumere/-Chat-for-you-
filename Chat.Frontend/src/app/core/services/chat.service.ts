import { UserDto } from './models/user.model';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { getUserFromJWT } from '../utils/get-user-from-jwt.function';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly _baseUrl = 'chatHub';

  public messages: string[] = [];

  public messages$ = new BehaviorSubject<string[]>([]);

  public connection = new signalR.HubConnectionBuilder()
    .withUrl(this._baseUrl, {
      accessTokenFactory: () => {
        const authToken = localStorage.getItem('authToken');
        return `${authToken}`;
      },
    })
    .build();

  constructor() {}

  async startConnection() {
    await this.connection.stop();
    await this.connection.onclose;
    await this.connection.start();

    this.connection.on('ReceiveMessage', (msg: string) => {
      this.messages.push(msg);
      this.messages$.next(this.messages);
      console.log('messages: ', this.messages);
    });
  }

  async sendMessage(message: string, user: UserDto | undefined) {
    if (!user) {
      console.error('no user');
      return;
    }

    await this.connection.invoke('ProcessMessage', message, user.id);
  }
}
