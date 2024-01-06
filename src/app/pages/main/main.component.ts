import { Component, OnInit } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { MenuServiceService } from '../../services/menu-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  menuItems: any = [];
  tabs: string[] = [];
  filteredMenu: any = [];

  constructor(private menuItemService: MenuServiceService) {}
  
  ngOnInit(): void {
    this.menuItemService.getMenuItems().subscribe((res) => {
      this.menuItems = res;
      this.tabs = this.menuItems.map((item: {}) => Object.keys(item)[0]);
      this.menuItems.forEach((item:any) => {
        Object.values(item).forEach((e: any) => {
          e.forEach((elm:any) => {
            elm.selection={
              quantity:1,fhPlate:''
            }
          });
        });
      });
      this.onMenuSelect('all');
    });
  }
  
  onMenuSelect(tab: string) {
    this.filteredMenu=[];
    switch (tab) {
      case 'all':
        this.menuItems.forEach((food: any) => {
          Object.values(food).forEach((e: any) => {
            this.filteredMenu.push(...e);
          });
        });
        break;
      case 'Chapati':
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

  onFoodSelection(food:any,selection:string){
    food.selection.fhPlate=selection
  }

  addToCart(food:any){
  this.menuItemService.cartItems.push(food);
  console.log(this.menuItemService.cartItems)
  }
  onChangeQuantity(food:any,operand:string){
    switch (operand) {
      case 'dec':
        food.selection.quantity--
        break;
        case 'up':
          food.selection.quantity++
        break;
      default:
        break;
    }
   
  }
}
