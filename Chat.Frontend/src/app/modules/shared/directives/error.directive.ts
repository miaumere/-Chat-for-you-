import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appError]',
})
export class ErrorDirective {
  constructor(private el: ElementRef) {
    console.log(el);
    this.el.nativeElement.style.color = getComputedStyle(
      document.documentElement
    ).getPropertyValue('--error-color');
  }
}
