import { BaseComponent } from 'src/app/core/base.component';
import { UserDto } from './../../../../../../core/services/models/user.model';
import {
  Component,
  ElementRef,
  Input,
  Pipe,
  PipeTransform,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ChatService } from 'src/app/core/services/chat.service';
import { IMessage } from 'src/app/core/services/models/message.model';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Pipe({ name: 'plusOne', standalone: true })
export class PlusOnePipe implements PipeTransform {
  transform(value: number): number {
    return value + 1;
  }
}

@Component({
  selector: 'app-chat-box [user] [messages]',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent {
  messageFormControl = new FormControl('', [Validators.min(1)]);
  isUserAtTheBottom = true;

  @Input() messages: IMessage[] = [];
  @Input() user?: UserDto;

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

  count = 0;

  constructor(
    private _chatService: ChatService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

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
    const roomId = this._route.snapshot.paramMap.get('id');

    if (roomId) {
      this._chatService.sendMessage(value, roomId);
      this.messageFormControl.reset();
    }
  }

  hasTheSameAuthorAsLastMessage(i: number): boolean {
    if (!Array.isArray(this.messages) || this.messages.length <= 0) {
      return true;
    }

    const lastMessage = this.messages[i - 1];
    const currentMessage = this.messages[i];

    if (!lastMessage) {
      // console.warn('no last');
      return true;
    }

    return lastMessage.sentBy.username !== currentMessage.sentBy.username;
  }
}
