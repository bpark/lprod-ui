import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appDigit]'
})
export class DigitDirective {

  private regex: RegExp;
  // private regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/g);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', '-', 'ArrowLeft', 'ArrowRight'];

  constructor(private el: ElementRef) {
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow Backspace, tab, end, and home keys
    console.log('key: ', event.key);
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

  @Input()
  set digitsPattern(digitsPattern: string) {
    this.regex = this.createPattern(digitsPattern);
  }

  private createPattern(digits: string): RegExp {
    const patternStr = '^\\d*\\.?\\d{0,' + digits + '}$';
    return new RegExp(patternStr, 'g');
  }
}
