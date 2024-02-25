import {
  Component,
  NgZone,
  OnInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { WindowService } from '../../window.service';
import firebase from 'firebase/app';
import 'firebase/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'firebase/firestore';
import { Router } from '@angular/router';
import { ScrollComponent } from '../../scroll.component';
import { AuthService } from '../../services/auth/auth.service';
import { UserStateService } from '../../services/user-state.service';
import { HelperService } from '../../services/helper/helper.service';
var config = {
  apiKey: 'AIzaSyDVrlLHmklvWSbVKs-Gx6GgMTpXs-q9pFw',
  authDomain: 'spicy-sam-2ac84.firebaseapp.com',
  databaseURL: 'https://spicy-sam-2ac84-default-rtdb.firebaseio.com',
  projectId: 'spicy-sam-2ac84',
  storageBucket: 'spicy-sam-2ac84.appspot.com',
  messagingSenderId: '384023288020',
  appId: '1:384023288020:web:e960888ca568d32ab50341',
  measurementId: 'G-BCF5VE9XMV',
};
export class PhoneNumber {
  country!: string;
  area!: string;
  prefix!: string;
  line!: string;

  get e164() {
    const num = this.country + this.area + this.prefix + this.line;
    return `+${num}`;
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('targetElementRef', { static: true })
  targetElementRef!: ElementRef;
  phoneNumber: any;
  reCaptchaVerifier!: any;
  isWrapperActive: boolean = false;
  user: any;
  loginForm: FormGroup;
  tab: 'login' | 'signup' = 'signup';
  signupForm: FormGroup;
  formToggle: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private win: WindowService,
    private ngZone: NgZone,
    private router: Router,
    private userState: UserStateService,
    private helper: HelperService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      acceptTerms: [false, Validators.requiredTrue],
    });
  }

  ngOnInit() {}
  toggleForm(tab: string) {
    if (tab == 'signup') {
      this.formToggle = true;
    } else {
      this.formToggle = false;
    }
  }

  signUp() {
    console.log('this.signupForm', this.signupForm);
    if (this.signupForm.valid) {
      const fullName = this.signupForm.get('fullName')?.value ?? '';
      const email = this.signupForm.get('email')?.value ?? '';
      const phone = this.signupForm.get('phone')?.value ?? '';
      const password = this.signupForm.get('password')?.value ?? '';
      const acceptTerms = this.signupForm.get('acceptTerms')?.value ?? false;
      const data = {
        uid: '',
        name: fullName,
        email: email,
        mobileNumber: phone,
        acceptTerms: acceptTerms,
      };
      this.authService
        .signUp(email, password)
        .then((response) => {
          if (response.user) {
            const user = response.user;
            data.uid = user.uid; 
            console.log('response', response);
            this.userState.saveUserToFirestore(data);
            this.toggleForm('login');
            this.signupForm.reset();
          } else {
            console.error('Sign-up error: User object is null');
          }
        })
        .catch((error) => {
          console.error('Sign-up error:', error);
        });
    }
  }
  

  signIn() {
    if (this.loginForm.valid) {
      this.authService
        .signIn(this.loginForm.value.email, this.loginForm.value.password)
        .then((response) => {
          console.log('response',response)
          this.user = response.user;
          this.helper.showSuccess('Success', 'Sign-in successful!');
          this.userState.setUser(this.user);
          this.loginForm.reset();
          this.router.navigate(['/']);
        })
        .catch((error) => {
          this.helper.showError('Error!', 'Error while signing in');
        });
    }
  }

  signOut() {
    this.authService
      .signOut()
      .then(() => {
        this.helper.showSuccess('Success', 'Sign-out successful!');
      })
      .catch((error) => {
        this.helper.showError('Sign-out error!', error);
      });
  }
}
