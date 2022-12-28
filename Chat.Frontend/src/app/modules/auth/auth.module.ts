import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatService } from 'src/app/core/services/chat/chat.service';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HeaderComponent } from 'src/app/core/header/header.component';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    HttpClientModule,
    AuthRoutingModule,
    HeaderComponent,
  ],
  providers: [ChatService],
})
export class AuthModule {}
