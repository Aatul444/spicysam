import { Component } from '@angular/core';
import { MenuServiceService } from '../../services/menu-service.service';
import { UserStateService } from '../../services/user-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userData:any
constructor(public menuService: MenuServiceService, private user:UserStateService, private router:Router){
  user.getUser().subscribe(res=>{this.userData=res})
}

onLog(){
  if(this.userData===null){
    this.router.navigate(['login'])
  }else{
    // console.log(this.userData.user?.uid);
    this.user.setUser(null)
  }
}
}
