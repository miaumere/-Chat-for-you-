import { UserDto } from './../../../../../../core/services/models/user.model';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

interface IMessage {
  author: UserDto;
  date: Date;
  content: string;
}

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent {
  // reply subject do ostatnich 10 wiadomości

  messageFormControl = new FormControl(null, Validators.minLength(1));
  messages: IMessage[] = [
    {
      author: { id: 1, username: 'uran' },
      date: new Date(),
      content: 'hiii',
    },
    {
      author: { id: 2, username: 'jean' },
      date: new Date(),
      content:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias error beatae ipsa! Suscipit facilis itaque autem dolore at dolores iusto quibusdam nihil nesciunt? Ea deleniti corrupti fugit ipsam expedita debitis? t, consectetur adipisicing elit. Molestias error beatae ipsa! Suscipit facilis itaque autem dolore at dolores iusto quibusdam nihil  t, consectetur adipisicing elit. Molestias error beatae ipsa! Suscipit facilis itaque autem dolore at dolores iusto quibusdam nihil  t, consectetur adipisicing elit. Molestias error beatae ipsa! Suscipit facilis itaque autem dolore at dolores iusto quibusdam nihil  \n \n \n \n t, consectetur adipisicing elit. Molestias error beatae ipsa! Suscipit facilis itaque autem dolore at dolores iusto quibusdam nihil ',
    },
  ];

  sendMessage() {
    console.log('sent!');
    console.log(`%c 📨 ${this.messageFormControl.value}`, 'color: cyan');

    this.messageFormControl.reset();
  }

  resize(e: any) {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  }
}
