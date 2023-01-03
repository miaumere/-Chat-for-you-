import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly _baseUrl = 'chatHub';

  public messages: string[] = [];

  public messages$ = new BehaviorSubject<string[]>([]);

  public connection = new signalR.HubConnectionBuilder()
    .withUrl(this._baseUrl)
    .build();

  constructor() {}

  async startConnection() {
    await this.connection.stop();
    await this.connection.onclose;
    await this.connection.start();

    this.connection.on('ReceiveMessage', (msg: string) => {
      console.log('ReceiveMessage', msg);
      this.messages.push(msg);
      this.messages$.next(this.messages);
    });
  }

  async sendMessage(message: string) {
    await this.connection.invoke('ProcessMessage', message);
  }
}
