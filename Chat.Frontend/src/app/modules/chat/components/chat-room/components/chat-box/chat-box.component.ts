import { UserDto } from './../../../../../../core/services/models/user.model';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ChatService } from 'src/app/core/services/chat.service';
import { IMessage } from 'src/app/core/services/models/message.model';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent {
  messageFormControl = new FormControl('', [Validators.min(1)]);
  messages: string[] = [];

  constructor(private _chatService: ChatService) {}
  // messages: IMessage[] = [
  //   {
  //     author: { id: 1, username: 'uran' },
  //     date: new Date(),
  //     content: 'hiii',
  //   },
  // ];

  ngOnInit(): void {
    this._chatService.startConnection();
    this.messages = this._chatService.messages;
  }

  resize(e: any) {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  }

  sendMessage() {
    const value = '' + this.messageFormControl.value;
    if (!this.messageFormControl.valid || !value) {
      return;
    }

    this._chatService.sendMessage(value);

    this.messageFormControl.reset();

    this.messages = this._chatService.messages;

    console.log('messages: ', this.messages);
  }
}
