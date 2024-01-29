import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {
  private _cartItems: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  // Expose an observable property to the outside world
  public cartItems$ = this._cartItems.asObservable();

  // Getter for getting the current value of cartItems
  get cartItems(): any[] {
    return this._cartItems.getValue();
  }

  // Setter for updating the value of cartItems
  set cartItems(value: any[]) {
    this._cartItems.next(value);
  }

  // Example method to add an item to the cart
  addItemToCart(item: any): void {
    const currentItems = this.cartItems;
    currentItems.push(item);
    this.cartItems = [...currentItems]; // Trigger the update
  }

  // Example method to clear the cart
  clearCart(): void {
    this.cartItems = [];
  }
  constructor(private firestore: AngularFirestore, public auth: AngularFireAuth) { 
    // Replace the following placeholder values with the actual phone number and recaptcha verifier
    // const phoneNumber = '+919355337284'; // Replace with the actual phone number
    // const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

    // auth.signInWithPhoneNumber('+917042471751')
    //   .then(result => {
    //     // Handle the result, e.g., store the confirmation result
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
  }
  
  getMenuItems(): Observable<any[]> {
    return this.firestore.collection('spicySamMenu').valueChanges();
  }
}
