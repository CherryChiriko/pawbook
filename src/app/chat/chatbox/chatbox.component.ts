import { Component, Input, Output } from '@angular/core';
import { IChat, IUser } from 'src/app/interfaces/interfaces';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent {
  @Input() friendId !: number;
  // @Output() isOpen: boolean = true;

  friend !: IUser;
  msgContent: string = '';
  arr !: IChat[];

  constructor(private chat: ChatService, private users: UserService){}

  ngOnInit(): void { 
    this.friend = this.users.getUserInfo(this.friendId);
    this.arr = this.chat.getChatWithFriend(this.friendId);
  }
  getPicture(id: number){
    return this.users.getUserInfo(id).profilePic
  }
  addMsgContent(event: any){
    this.msgContent = event.target.value;
  }
  add(){ this.chat.addMsg(this.msgContent, this.friendId)}
  
}
