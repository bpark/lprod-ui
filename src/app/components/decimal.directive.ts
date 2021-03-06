import {Directive, DoCheck, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {DecimalPipe} from '@angular/common';

@Directive({
  selector: '[appDecimal]'
})
export class DecimalDirective implements OnInit, DoCheck {

  private static readonly locale = 'en-US';

  private el: any;

  @Input() digitsInfo = '1.2-2';

  private previousValue: any;

  constructor(private elementRef: ElementRef, private decimalPipe: DecimalPipe) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit() {
    if (this.el.value !== undefined && this.el.value !== '' && !isNaN(this.el.value)) {
      this.el.value = this.decimalPipe.transform(this.el.value, this.digitsInfo, DecimalDirective.locale);
    }
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value) {
    if (this.el.value !== undefined && this.el.value !== '' && !isNaN(this.el.value)) {
      this.el.value = this.decimalPipe.transform(value, this.digitsInfo, DecimalDirective.locale);
    }
  }

  ngDoCheck(): void {
    if (this.el.disabled) {
      if (this.el.value !== undefined && this.el.value !== '' && !isNaN(this.el.value) && this.previousValue !== this.el.value) {
        this.el.value = this.decimalPipe.transform(this.el.value, this.digitsInfo, DecimalDirective.locale);
        this.previousValue = this.el.value;
      }
    }
  }

}
