import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {
  cartItems: any[] = [];

  constructor(private firestore: AngularFirestore, public auth: AngularFireAuth) { 
    // Replace the following placeholder values with the actual phone number and recaptcha verifier
    const phoneNumber = '+919355337284'; // Replace with the actual phone number
    const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

    auth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
      .then(result => {
        // Handle the result, e.g., store the confirmation result
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  getMenuItems(): Observable<any[]> {
    return this.firestore.collection('spicySamMenu').valueChanges();
  }
}
