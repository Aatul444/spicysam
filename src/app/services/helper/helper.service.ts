import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private toastr: ToastrService) {}
  showSuccess(msg:string,desc:string) {
    this.toastr.success(msg, desc);
  }
  showError(msg:string,desc:string) {
    this.toastr.error(msg, desc);
  }
}
