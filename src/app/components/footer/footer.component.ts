import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserStateService } from '../../services/user-state.service';
import { Router } from '@angular/router';
import { HelperService } from '../../services/helper/helper.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  userData: any = {};
  bookingForm!: FormGroup<any>;
  constructor(
    private firestore: AngularFirestore,
    private fb: FormBuilder,
    private user: UserStateService,
    private router: Router,
    private helper: HelperService
  ) {
    this.bookingForm = this.fb.group({
      full_name: ['', Validators.required],
      email_address: ['', [Validators.required, Validators.email]],
      mobile_number: [
        '',
        [Validators.required, Validators.pattern('[0-9]{10}')],
      ],
      booking_time: ['', Validators.required],
      total_person: [1, Validators.required],
      booking_date: ['', Validators.required],
      message: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.user.getUser().subscribe((res) => (this.userData = res));
  }
  submitForm() {
    if (this.userData?.uid && this.bookingForm.valid) {
      this.submitBooking(
        this.userData?.uid,
        this.bookingForm.value,
        this.userData?.uid
      ).then((res) => {
        this.helper.showSuccess(
          'Table Booked!',
          'Wait for Restaurant Confirmation.'
        );
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      });
      this.bookingForm.reset();
    } else {
      this.router.navigate(['/login']);
      this.helper.showSuccess('User Needed!', 'Please login to continue...');
    }
  }

  async submitBooking(
    userUid: string,
    order: any,
    customerDetails: any
  ): Promise<void> {
    try {
      const currentDate = new Date();
      const year = currentDate.getFullYear().toString();
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      const day = currentDate.getDate().toString().padStart(2, '0');
      const fullDate = `${day}-${month}-${year}`;
      const orderId = month + '-' + year;
      const orderIds = this.firestore.createId();
  
      const userDoc = await this.firestore.collection('users').doc(userUid).get().toPromise();
  
      if (userDoc?.exists) {
        const userData = userDoc.data();
        const admin_bookings = this.firestore.collection(`admin_tableBookings`).doc(orderId);
        await admin_bookings.set(
          {
            [order.booking_date]: {
              [orderIds]: {
                order: order,
                customer: userData,
                createdDate: fullDate,
              },
            },
          },
          { merge: true }
        );
  
        const orderRef = this.firestore.collection(`tableBooking_${userUid}`).doc(orderId);
        await orderRef.set(
          {
            [order.booking_date]: {
              [orderIds]: {
                order: order,
                customer: userData,
                createdDate: fullDate,
              },
            },
          },
          { merge: true }
        );
      } else {
        console.error('User document not found');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      throw error; // Rethrow error for handling by the caller
    }
  }
  
}
