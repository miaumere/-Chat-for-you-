import { SharedModule } from './modules/shared/shared.module';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './core/footer/footer.component';
import { AuthGuard } from './core/services/auth/auth-guard.service';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './core/services/interceptor';

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

    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
})
export class AppModule {}
