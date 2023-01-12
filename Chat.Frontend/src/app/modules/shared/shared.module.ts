import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDirective } from './directives/error.directive';
import { ProfilePicComponent } from './components/profile-pic/profile-pic.component';
import { LoaderComponent } from './components/loader/loader.component';
import { Base64EncodePipe } from './pipes/base64-encode.pipe';

const shared = [
  ErrorDirective,
  ProfilePicComponent,
  LoaderComponent,
  Base64EncodePipe,
];
@NgModule({
  declarations: [...shared],
  imports: [CommonModule],
  exports: [...shared],
})
export class SharedModule {}
