import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Razorpay from 'razorpay';
import RazorpayOptions from 'razorpay';
import RazorpayOrder from 'razorpay';
@Injectable({
  providedIn: 'root',
})
export class RazorpayService {
  // private razorpay!: Razorpay;
  private apiUrl = 'https://api.razorpay.com/v1'; // Replace with the correct API version
  private apiKey = 'rzp_test_qENiaEZ9b49OxL'; // Replace with your Razorpay API key
  private apiSecret = 'GkMh8dLAmg5VB4GVAnU70mNa'; // Replace with your Razorpay API secret

  constructor(private http: HttpClient) {}
  createOrder(amount: number, currency: string): Promise<any> {
    const endpoint = `${this.apiUrl}/orders`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${btoa(`${this.apiKey}:${this.apiSecret}`)}`
    });

    const receiptId = this.generateReceiptId();

    const data = {
      amount: amount * 100,
      currency: currency,
      receipt: receiptId
    };

    return this.http.post(endpoint, data, { headers })
      .toPromise()
      .then(response => response as any)
      .catch(error => Promise.reject(error.error));
  }

  generateReceiptId(): string {
    const timestamp = new Date().getTime();
    const randomString = Math.random().toString(36).substring(7);
    return `receipt_${timestamp}_${randomString}`;
  }
  //   this.razorpay = new Razorpay({
  //     key_id: 'rzp_test_qENiaEZ9b49OxL',
  //     key_secret: 'GkMh8dLAmg5VB4GVAnU70mNa',
  //   });
  // }

  // createOrder(amount: number, currency: string) {
  //   const options: any & { amount: number } = {
  //     amount: amount * 100,
  //     currency,
  //     receipt: 'receipt_id',
  //     payment_capture: 1,
  //   };

  //   return new Promise<RazorpayOrder>((resolve, reject) => {
  //     this.razorpay.orders.create(options, (error: any, order: any) => {
  //       if (error) {
  //         reject(error);
  //       } else {
  //         resolve(order);
  //       }
  //     });
  //   });
  // }
}
