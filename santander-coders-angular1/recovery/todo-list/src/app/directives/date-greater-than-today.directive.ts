import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDateGreaterThanToday]',
})
export class DateGreaterThanTodayDirective {
  @Input() Date!: Date;

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const dateFormat = new Date(this.Date);
    const today = new Date();

    if (today > dateFormat) {
      this.renderer.setStyle(this.element.nativeElement, 'color', 'red');
    }
  }
}
