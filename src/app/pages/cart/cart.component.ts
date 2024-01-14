import { Component } from '@angular/core';
import { MenuServiceService } from '../../services/menu-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  constructor(public menuService: MenuServiceService) {}

  onChangeQuantity(food: any, operand: string, index: number) {
    switch (operand) {
      case 'dec':
        this.menuService.cartItems[index].selection.quantity--;
        break;
      case 'up':
        this.menuService.cartItems[index].selection.quantity++;
        break;
      default:
        break;
    }
  }

  onRemoveFromCart(food: any, index: number) {
    this.menuService.cartItems.splice(index, 1);
    console.log('food', food);
  }
}
