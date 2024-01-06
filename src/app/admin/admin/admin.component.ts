import { Component } from '@angular/core';
import { WindowService } from '../../window.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  windowRef: any;
  phoneNumber: string = '';
  verificationCode: string = '';

  constructor(private win: WindowService, private auth: AngularFireAuth) {}

  ngOnInit() {
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    this.windowRef.recaptchaVerifier.render();
  }

  sendLoginCode() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = '+1' + this.phoneNumber; // Adjust the country code as needed

    this.auth.signInWithPhoneNumber(num, appVerifier)
      .then(result => {
        this.windowRef.confirmationResult = result;
      })
      .catch(error => console.error(error));
  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then((result: any) => {
        // Handle successful verification
        console.log('Phone number verified!', result);
      })
      .catch((error: any) => console.error(error, 'Incorrect code entered?'));
  }
}
