import { Component } from '@angular/core';
import { MenuServiceService } from '../../services/menu-service.service';
import { UserStateService } from '../../services/user-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  userData: any;
  cartItems: any[] | undefined;
  toggler: boolean = false;
  constructor(
    public menuService: MenuServiceService,
    private user: UserStateService,
    private router: Router
  ) {
    user.getUser().subscribe((res) => {
      this.userData = res;
    });
    this.menuService.cartItems$.subscribe((items) => {
      this.cartItems = [];
      this.cartItems = items;
    });
  }
  onLog() {
    if (this.userData === null) {
      this.router.navigate(['login']);
    } else {
      this.user.setUser(null);
    }
  }
  headToggler() {
    this.toggler = !this.toggler;
  }
}
