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
  friendsIds ?: number[] = this.users.getUserInfo(0).friends;

  ngOnInit(): void {  }

  loginCheck(){return this.users.loginCheck(0);}
  toggleSidebar(){
    console.log("I am header: ", this.isOpen)
    this.isOpen = this.sidebar.toggleSidebar();
  }
}