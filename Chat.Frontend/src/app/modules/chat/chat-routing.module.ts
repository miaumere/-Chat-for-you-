import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/services/auth/auth-guard.service';
import { ChatIndexComponent } from './components/chat-index.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { ChooseRoomComponent } from './components/choose-room/choose-room.component';

const routes: Routes = [
  {
    path: '',
    component: ChatIndexComponent,
    children: [
      { path: '', component: ChooseRoomComponent },
      {
        path: ':id',
        component: ChatRoomComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
