import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SidebarService } from '../services/sidebar.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor( private users: UserService, private sidebar: SidebarService){}

  // isOpen : boolean = this.sidebar.isOpen;
  loginId : number = -1;  
  loginIdSubs ?: Subscription;

  isOpen : boolean = false;  
  isOpenSubs ?: Subscription;

  link : string|null = ''

  ngOnInit(): void { 
    this.users.getLoginId().subscribe(
      val => this.loginId = val
    );
    this.sidebar.getIsOpen().subscribe(
      val => this.isOpen = val
    )

    // this.link = this.loginId > -1 ? '/home' : null;
    // console.log("Link ", this.link)
  }

  getPic(id: number){    return this.users.getUserPicture(id)  }
  toggleSidebar(){
    // this.sidebar.toggleSidebar();
    // this.sidebar.isOpen.next(!this.sidebar.isOpen.subscribe( val => this.isOpen = !val))
    
    
    // this.sidebar.isOpen.subscribe(
    //   val => this.isOpen = val
    // )
    // this.isOpen = !this.isOpen;
    // this.sidebar.updateData(this.isOpen);
    // console.log("Sidebar status: ", this.isOpen);

    // console.log("I start as: ", this.isOpen);
    this.isOpen = !this.isOpen;
    // console.log("Now I should be different: ", this.isOpen)
  }

  ngOnDestroy(){
    this.loginIdSubs?.unsubscribe();
    this.isOpenSubs?.unsubscribe();
  }
  
}