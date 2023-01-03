import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor( private users: UserService, private chat: ChatService){}

  isOpen !: boolean;
  friendsIds = this.users.getUserInfo(0).friends;

  ngOnInit(): void {
    this.isOpen = this.chat.isOpen;
  }

  loginCheck(){return this.users.loginCheck(0);}
  toggleChat(){this.isOpen = this.chat.toggleChatList();}
}
