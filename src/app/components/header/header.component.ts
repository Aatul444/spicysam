import { Component } from '@angular/core';
import { MenuServiceService } from '../../services/menu-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
constructor(public menuService: MenuServiceService){
}
}
