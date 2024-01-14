import { Component, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'scroll',
  template: `
    <button (click)="scroll()">Click to scroll</button>
    <div #target>Your target</div>
  `,
  styles: [`h1 { font-family: Lato; }`, `div { margin-top: 5000px; }`]
})
export class ScrollComponent {
  @Input() targetElement!: ElementRef;

  scroll() {
    if (this.targetElement && this.targetElement.nativeElement) {
      this.targetElement.nativeElement.scrollIntoView();
    }
  }
}
