import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor( private users: UserService, private chat: ChatService){}

  isOpen : boolean = false;
  searchBody: string = '';
  friendsIds ?: number[];

  ngOnInit(): void {
    this.isOpen = this.chat.isOpen;
    this.friendsIds = this.users.getUserInfo(0).friends;
  }

  loginCheck(){ return this.users.loginCheck(0);}
  toggleChat(){ this.isOpen = this.chat.toggleChatList();}
  
  getFriendInfo(id: number){  return this.users.getUserInfo(id)}

  search(){
    let result = this.users.filterSearch(this.searchBody);
    this.friendsIds = [... result.map(res => res.id)];
  }
  searchContent(event: any){    this.searchBody = event.target.value;  }
}
