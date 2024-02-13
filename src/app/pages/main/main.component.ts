import { Component, OnInit } from '@angular/core';
import { MenuServiceService } from '../../services/menu-service.service';
import { Router } from '@angular/router';
import { HelperService } from '../../services/helper/helper.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  menuItems: any = [];
  tabs: string[] = [];
  filteredMenu: any = [];
  menuTab: string = 'all';

  constructor(
    private menuItemService: MenuServiceService,
    private router: Router,
    private helper: HelperService
  ) {}
  ngOnInit(): void {
    this.menuItemService.getMenuItems().subscribe((res) => {
      this.menuItems = res;
      this.tabs = this.menuItems.map((item: {}) => Object.keys(item)[0]);
      this.menuItems.forEach((item: any) => {
        Object.values(item).forEach((e: any) => {
          e.forEach((elm: any) => {
            elm.selection = {
              quantity: 1,
              fhPlate: 'full',
            };
          });
        });
      });
      this.onMenuSelect('all');
    });
  }

  onMenuSelect(tab: string) {
    this.menuTab = tab;
    this.filteredMenu = [];
    switch (tab) {
      case 'all':
        this.menuItems.forEach((food: any) => {
          Object.values(food).forEach((e: any) => {
            this.filteredMenu.push(...e);
          });
        });
        break;
      case 'Chapati & Rice':
        this.filteredMenu = this.menuItems[0].Chapati;
        break;

      case 'Chickens':
        this.filteredMenu = this.menuItems[1].Chickens;
        break;

      case 'moton':
        this.filteredMenu = this.menuItems[2].moton;
        break;

      default:
        const selectedTabArray =
          this.menuItems.find(
            (menuGroup: any) => menuGroup[tab] !== undefined
          )?.[tab] || [];
        this.filteredMenu = selectedTabArray.slice();
        break;
    }
  }

  onFoodSelection(food: any, selection: string) {
    food.selection.fhPlate = selection;
  }

  addToCart(food: any) {
    this.menuItemService.cartItems.push(food);
    this.helper.showSuccess('Success', 'Added to cart');
  }
  onChangeQuantity(food: any, operand: string) {
    if (food.selection.quantity >= 1) {
      switch (operand) {
        case 'dec':
          food.selection.quantity--;
          break;
        case 'up':
          food.selection.quantity++;
          break;
        default:
          break;
      }
    }
  }
  orderFast(food: any) {
    this.menuItemService.cartItems.push(food);
    this.router.navigate(['cart']);
  }
}
