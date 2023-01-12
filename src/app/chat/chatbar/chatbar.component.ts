import { Component, OnInit, Output } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chatbar',
  templateUrl: './chatbar.component.html',
  styleUrls: ['./chatbar.component.css']
})
export class ChatbarComponent implements OnInit{
 
  @Output() friendId !: number;

  constructor(private chats: ChatService, private users : UserService){}

  openChats : number[] = []
  isOpen : boolean[] = []

  ngOnInit(): void {
    this.openChats = this.chats.openChats;
    this.isOpen = [false,false,false];
  }

  getPicture(id: number){
    return this.users.getUserInfo(id).profilePic
  }

  toggleChat(index: number){
    return this.chats.toggleChat(this.isOpen, index)
  }

  closeBoxHandler(friendId: number){
    this.chats.closeChat(friendId)
  }
  reduceBoxHandler(friendId: number){
    this.isOpen = this.chats.reduceChat(this.isOpen, friendId);
  }
}
