import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InitialPageComponent } from './components/initial-page/initial-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatIndexComponent } from './components/chat-index.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';

@NgModule({
  declarations: [InitialPageComponent, ChatIndexComponent, ChatRoomComponent],
  imports: [CommonModule, ReactiveFormsModule, ChatRoutingModule],
})
export class ChatModule {}
