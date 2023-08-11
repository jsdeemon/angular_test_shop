// scroll-end-root.directive.ts
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[scrollEndRoot]',
})
export class ScrollEndRootDirective {
  constructor(
    public el: ElementRef,
  ) {
  }
}