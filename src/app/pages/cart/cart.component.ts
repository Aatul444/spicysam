import { Component } from '@angular/core';
import { MenuServiceService } from '../../services/menu-service.service';
import Razorpay from 'razorpay';
import { RazorpayService } from '../../services/razorpay.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserStateService } from '../../services/user-state.service';
import { Router } from '@angular/router';
import { HelperService } from '../../services/helper/helper.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cartItems: any[] = [];
  totalAmount = 0;
  userData: any = {};
  constructor(
    public menuService: MenuServiceService,
    private firestore: AngularFirestore,
    private razorpayApiService: RazorpayService,
    private user: UserStateService,
    private router: Router,
    private helper : HelperService
  ) {}
  ngOnInit() {
    this.user.getUser().subscribe((res) => (this.userData = res));
    this.menuService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.totalAmount = this.calculateTotalAmount();
      this.updateTotalAmount();
    });
  }
  clearCart() {
    this.cartItems = [];
    this.updateTotalAmount();
  }
  updateTotalAmount() {
    this.totalAmount = this.calculateTotalAmount();
  }
  onChangeQuantity(food: any, operand: string, index: number) {
    if (this.menuService.cartItems[index].selection.quantity >= 1) {
      switch (operand) {
        case 'dec':
          if (this.menuService.cartItems[index].selection.quantity != 1) {
            this.menuService.cartItems[index].selection.quantity--;
          }
          break;
        case 'up':
          this.menuService.cartItems[index].selection.quantity++;
          break;
        default:
          break;
      }
    }
    this.totalAmount = this.calculateTotalAmount();
  }

  onRemoveFromCart(food: any, index: number) {
    this.menuService.cartItems.splice(index, 1);
    this.totalAmount = this.calculateTotalAmount();
    console.log('food', food);
  }
  getPrice(food: any): string {
    const { selection, fullPrice, halfPrice } = food;
    const quantity = selection?.quantity || 1;
    const fhPlate = selection?.fhPlate || 'full';

    if (fhPlate === 'full') {
      return (quantity * fullPrice).toFixed(2); // You can format the price as needed
    } else if (fhPlate === 'half') {
      return (quantity * halfPrice).toFixed(2); // You can format the price as needed
    }

    return '0.00';
  }
  submitOrder(
    userUid: string,
    order: any,
    customerDetails: any
  ): Promise<void> {
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const fullDate = `${day}-${month}-${year}`;
    const orderId = month + '-' + year;
    const orderIds = this.firestore.createId();

    const orderRef = this.firestore
      .collection(`orders_${userUid}`)
      .doc(orderId);

    return orderRef.set(
      {
        [fullDate]: {
          [orderIds]: {
            order: order,
            customer: customerDetails,
          },
        },
      },
      { merge: true }
    );
  }

  onOrder() {
    if (this.userData?.uid) {
      this.submitOrder(
        this.userData?.uid,
        this.cartItems,
        this.userData?.uid
      ).then((res) => {
        this.helper.showSuccess('Order Placed!','Wait for Restaurant Confirmation.');
        this.clearCart();
        setTimeout(() => {
          this.router.navigate(['/']);  
        }, 2000);
      });
    } else {
      this.router.navigate(['/login']);
      this.helper.showSuccess('User Needed!','Please login to continue...')
    }
  }

  calculateTotalAmount(): number {
    let totalAmount = 0;

    this.cartItems.forEach((item) => {
      const { selection, fullPrice, halfPrice } = item;
      const quantity = selection?.quantity || 1;
      const fhPlate = selection?.fhPlate || 'full';

      if (fhPlate === 'full') {
        totalAmount += quantity * fullPrice;
      } else if (fhPlate === 'half') {
        totalAmount += quantity * halfPrice;
      }
    });

    return totalAmount;
  }

  openRazorpayCheckout(orderId: string) {
    const options = {
      key: 'rzp_test_qENiaEZ9b49OxL', // Replace with your Razorpay API key
      amount: 100, // Replace with your actual amount
      currency: 'INR', // Replace with your actual currency
      order_id: orderId,
      name: 'Your Company Name',
      description: 'Payment for Order #1234ww',
      image: 'path-to-your-company-logo.png',
      handler: (response: any) => {
        console.log('Razorpay Response:', response);
        // Handle the response as needed (e.g., update order status, show confirmation, etc.)
      },
      prefill: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        contact: '9876543210',
      },
      theme: {
        color: '#F37254',
      },
    };

    const rzp = new (window as any)['Razorpay'](options);
    rzp.open();
  }
}
