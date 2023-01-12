import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatIndexComponent } from '../chat/components/chat-index.component';
import { ChooseRoomComponent } from '../chat/components/choose-room/choose-room.component';
import { LoginPageComponent } from './components/login-page/login-page.component';

const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
