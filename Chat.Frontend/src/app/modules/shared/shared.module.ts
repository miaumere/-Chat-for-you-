import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDirective } from './directives/error.directive';
import { ProfilePicComponent } from './components/profile-pic/profile-pic.component';

const shared = [ErrorDirective, ProfilePicComponent];
@NgModule({
  declarations: [...shared, ProfilePicComponent],
  imports: [CommonModule],
  exports: [...shared],
})
export class SharedModule {}
