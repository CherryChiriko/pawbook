import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor( private users: UserService){}
  loginCheck(){return this.users.loginCheck(0);
    // console.log("I'm executing"); return false
    // console.log(this.users.loginCheck(0))
    // console.log(0)
    // return 0;
  }
}
