import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private readonly _baseUrl = 'chatHub';

  public messages: string[] = [];

  public connection = new signalR.HubConnectionBuilder()
    .withUrl(this._baseUrl)
    .build();

  constructor() {}

  async startConnection() {
    await this.connection.stop();
    await this.connection.onclose;
    await this.connection.start();

    await this.connection.on('ProcessMessage', (msg: string) => {
      this.messages.push(msg);
    });
  }

  async sendMessage(message: string) {
    await this.connection.invoke('ProcessMessage', message);
  }
}
