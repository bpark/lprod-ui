import {Directive, ElementRef, HostListener, OnInit} from '@angular/core';
import {DecimalPipe} from './decimal.pipe';

@Directive({
  selector: '[appDecimal]'
})
export class DecimalDirective implements OnInit {

  private el: any;

  constructor(
    private elementRef: ElementRef,
    private decimalPipe: DecimalPipe
  ) {
    this.el = this.elementRef.nativeElement;

  }

  ngOnInit() {
    this.el.value = this.decimalPipe.transform(this.el.value);
  }

  @HostListener('focus', ['$event.target.value'])
  onFocus(value) {
    // this.el.value = this.decimalPipe.parse(value); // opossite of transform
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value) {
    this.el.value = this.decimalPipe.transform(value);
  }

}
