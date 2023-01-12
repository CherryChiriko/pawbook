import { Component, Input, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor( private users: UserService, private sidebar: SidebarService){}

  isOpen : boolean = this.sidebar.isOpen;
  loginId : number = -1;  
  // friendsIds ?: number[] = this.users.getUserInfo(this.loginId).friends;

  ngOnInit(): void { 
    this.loginId = this.users.getLoginId();
    console.log(this.loginId)
  }


  // loginCheck(id?:number){return 0}
  // loginCheck(){return this.users.loginCheck();}

  toggleSidebar(){
    // console.log("I am header: ", this.isOpen)
    this.isOpen = this.sidebar.toggleSidebar();
    console.log(this.loginId);
  }
}