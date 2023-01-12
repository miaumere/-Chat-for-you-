import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appError]',
})
export class ErrorDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.color = getComputedStyle(
      document.documentElement
    ).getPropertyValue('--error-color');
  }
}
