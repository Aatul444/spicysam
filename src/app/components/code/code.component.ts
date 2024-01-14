import { Component } from '@angular/core';
import { NgOtpInputModule } from  'ng-otp-input';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrl: './code.component.scss'
})
export class CodeComponent {
  otp!:string;
  verify:any;
  config = {
    allowNumbersOnly:true,
    length:6,
    isPasswordInput:false,
    disableAutoFocus:false,
    placeholder:'',
    inputStyles:{
      width: '50px',
      height: '50px',
    }
  }
ngOnInit(){
  this.verify = JSON.parse(localStorage.getItem('verificationId')||'{}')
  console.log(this.verify)
}
  onOtpChange($event: string) {
}
 handleClick(){
  var credentials = firebase.auth.PhoneAuthProvider.credential(
    this.verify,this.otp
  )
  firebase.auth().signInWithCredential(credentials).then(res=>{
    console.log(res)
  })
 }

}
