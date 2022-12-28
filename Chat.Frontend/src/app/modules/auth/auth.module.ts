import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HeaderComponent } from 'src/app/core/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    HeaderComponent,
    SharedModule,
  ],
})
export class AuthModule {}
