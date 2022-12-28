import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDirective } from './directives/error.directive';

const shared = [ErrorDirective];
@NgModule({
  declarations: [...shared],
  imports: [CommonModule],
  exports: [...shared],
})
export class SharedModule {}
