import { Directive, ElementRef, HostBinding, inject } from '@angular/core';

@Directive({
  selector: 'input',
  standalone: true,
})
export class BsInvalidFieldDirective {

  element = inject(ElementRef)

  @HostBinding('class')
  get elementClass(): string {
    return this.element.nativeElement.classList.contains('ng-invalid') ? 'is-invalid' : '';
  }
}
