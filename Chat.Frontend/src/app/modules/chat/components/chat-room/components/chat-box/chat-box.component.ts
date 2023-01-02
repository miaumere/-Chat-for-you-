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
  messageFormControl = new FormControl('', Validators.minLength(1));
  messages: string[] = [];

  constructor(private _chatService: ChatService) {}
  // messages: IMessage[] = [
  //   {
  //     author: { id: 1, username: 'uran' },
  //     date: new Date(),
  //     content: 'hiii',
  //   },
  //   {
  //     author: { id: 2, username: 'jean' },
  //     date: new Date(),
  //     content:
  //       'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias error beatae ipsa! Suscipit facilis itaque autem dolore at dolores iusto quibusdam nihil nesciunt? Ea deleniti corrupti fugit ipsam expedita debitis? t, consectetur adipisicing elit. Molestias error beatae ipsa! Suscipit facilis itaque autem dolore at dolores iusto quibusdam nihil  t, consectetur adipisicing elit. Molestias error beatae ipsa! Suscipit facilis itaque autem dolore at dolores iusto quibusdam nihil  t, consectetur adipisicing elit. Molestias error beatae ipsa! Suscipit facilis itaque autem dolore at dolores iusto quibusdam nihil  \n \n \n \n t, consectetur adipisicing elit. Molestias error beatae ipsa! Suscipit facilis itaque autem dolore at dolores iusto quibusdam nihil ',
  //   },
  // ];

  ngOnInit(): void {
    this._chatService.startConnection();
    this.messages = this._chatService.messages;

    // this._chatService.lastMessages$.subscribe((messages) => {
    //   console.log('replay: ', messages);
    //   this.messages.push({
    //     author: { id: 1, username: 'lol' },
    //     date: new Date(),
    //     content: messages,
    //   });
    // });
  }

  resize(e: any) {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  }

  sendMessage() {
    const message = this.messageFormControl.value;
    if (!message) {
      return;
    }

    this._chatService.sendMessage(this.messageFormControl.value as string);

    this.messageFormControl.reset();

    this.messages = this._chatService.messages;
  }
}
