import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private userSubject: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);

  constructor(private firestore: AngularFirestore) { }

  setUser(user: any): void {
    this.userSubject.next(user);
  }

  getUser(): Observable<any | null> {
    return this.userSubject.asObservable();
  }

  saveUserToFirestore(user: any) {
    const userCollection = this.firestore.collection('users');
    userCollection.add(user)
      .then(docRef => {
        console.log('User document added with ID:', docRef.id);
      })
      .catch(error => {
        console.error('Error adding user document:', error);
      });
  }
}
