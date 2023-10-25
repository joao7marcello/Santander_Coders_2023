import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appDateGreaterThanToday]',
})
export class DateGreaterThanTodayDirective {
  @Input() Date!: Date;

  constructor(private element: ElementRef) {}

  ngOnInit() {
    const dateFormat = new Date(this.Date);
    const today = new Date();

    if (today > dateFormat) {
      this.element.nativeElement.style.color = 'red';
    }
  }
}
