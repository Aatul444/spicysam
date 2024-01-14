import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private userSubject: BehaviorSubject<any | null> = new BehaviorSubject<any | null>(null);

  constructor( private snackBar: MatSnackBar) { }

  setUser(user: any): void {
    this.userSubject.next(user);
  }

  getUser(): Observable<any | null> {
    return this.userSubject.asObservable();
  }

  showSnackBar(msg:string){
    this.snackBar.open(msg, 'Close', {
      duration: 3000,
    });
  }

}
