import { Component, Input, Output } from '@angular/core';
import { IUser } from 'src/app/interfaces/interfaces';
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
  arr = this.chat.getAllMsgs(this.friendId);
  
  ngOnInit(): void { 
    this.friend = this.users.getUserInfo(this.friendId);
    console.log(this.arr)
  }
  constructor(private chat: ChatService, private users: UserService){}
  
  addMsgContent(event: any){
    this.msgContent = event.target.value;
  }
  add(){ this.chat.addMsg(this.msgContent, this.friendId)}
  
}
