import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor( private users: UserService, private bar: SidebarService){}

  isOpen : boolean = false;
  searchBody: string = '';
  friendsIds ?: number[];

  ngOnInit(): void {
    this.isOpen = this.bar.isOpen;
    this.friendsIds = this.users.getUserInfo(0).friends;
  }

  loginCheck(){ return this.users.loginCheck(0);}
  toggleBar(){ this.isOpen = this.bar.toggleSidebar();}
  
  getFriendInfo(id: number){  return this.users.getUserInfo(id)}

  search(){
    let result = this.users.filterSearch(this.searchBody);
    this.friendsIds = [... result.map(res => res.id)];
  }
  searchContent(event: any){    this.searchBody = event.target.value;  }
}
