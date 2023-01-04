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

  isOpen !: boolean;
  friendsIds ?: number[] = this.users.getUserInfo(0).friends;
  searchBody: string = '';

  ngOnInit(): void {
    this.isOpen = this.chat.isOpen;
  }

  loginCheck(){return this.users.loginCheck(0);}
  toggleChat(){this.isOpen = this.chat.toggleChatList();}
  getFriendInfo(id: number){return this.users.getUserInfo(id)}

  search(){
    this.users.filterSearch(this.searchBody)}
  searchContent(event: any){
    this.searchBody = event.target.value;
    console.log("I'm searchContent " + this.searchBody)
  }
}
