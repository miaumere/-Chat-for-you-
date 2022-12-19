import { InitialPageComponent } from './components/initial-page/initial-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatIndexComponent } from './components/chat-index.component';

const routes: Routes = [
  {
    path: '',
    component: ChatIndexComponent,
    children: [{ path: '', component: InitialPageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatRoutingModule {}
