import { SharedModule } from './modules/shared/shared.module';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './core/footer/footer.component';
import { AuthGuard } from './core/services/auth/auth-guard.service';
import { HeaderComponent } from './core/header/header.component';
import { ErrorDirective } from './modules/shared/directives/error.directive';
import { AuthService } from './core/services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';

function initializeApp(): void {}

@NgModule({
  declarations: [AppComponent, FooterComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule, HttpClientModule],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => initializeApp,
      multi: true,
    },
    AuthGuard,
    AuthService,
  ],
})
export class AppModule {}
