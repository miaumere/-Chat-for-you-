import { SharedModule } from './../shared/shared.module';
import { HeaderComponent } from 'src/app/core/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatIndexComponent } from './components/chat-index.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { UsersListComponent } from './components/chat-room/components/users-list/users-list.component';
import { ChatBoxComponent } from './components/chat-room/components/chat-box/chat-box.component';
import { RoomService } from 'src/app/core/services/room/room.service';
import { HttpClientModule } from '@angular/common/http';
import { ChooseRoomComponent } from './components/choose-room/choose-room.component';

@NgModule({
  declarations: [
    ChatIndexComponent,
    ChatRoomComponent,
    UsersListComponent,
    ChatBoxComponent,
    ChooseRoomComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatRoutingModule,
    HttpClientModule,
    HeaderComponent,
    SharedModule,
  ],
  providers: [RoomService],
})
export class ChatModule {}
