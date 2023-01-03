import { UserDto } from './../../../../../../core/services/models/user.model';
import {
  Component,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ChatService } from 'src/app/core/services/chat.service';
import { IMessage } from 'src/app/core/services/models/message.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent {
  messageFormControl = new FormControl('', [Validators.min(1)]);
  isUserAtTheBottom = true;

  @Input() messages: string[] = [];

  @ViewChild('messageBox', { static: true }) messageBox: ElementRef | undefined;

  @ViewChild('lastMessage') set content(content: ElementRef) {
    const box = this.messageBox?.nativeElement as HTMLElement | undefined;

    if (!!box) {
      if (this.isUserAtTheBottom) {
        const scrollHeight = box.scrollHeight;
        box.scroll({ top: scrollHeight });
      }
    }
  }

  constructor(public _chatService: ChatService) {}

  ngOnInit(): void {
    const box = this.messageBox?.nativeElement as any;
  }

  onScroll(event: any) {
    this.isUserAtTheBottom =
      event.target.offsetHeight + event.target.scrollTop ===
      event.target.scrollHeight;
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
    // this.messages = this._chatService.messages;

    // console.log('messages: ', this.messages);
  }
}
