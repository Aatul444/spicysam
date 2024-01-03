import { Component, HostListener  } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'restaurant';
  isScrolledUp: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Check if the user has scrolled beyond a certain threshold (e.g., 100px from the top)
    if (window.pageYOffset > 100) {
      this.isScrolledUp = true;
    } else {
      this.isScrolledUp = false;
    }
  }
}
