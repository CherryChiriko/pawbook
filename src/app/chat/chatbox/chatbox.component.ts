import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IChat, IChatBox, IUser } from 'src/app/interfaces/interfaces';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent {
  @Input() chatBox !: IChatBox;
  @Output() closeBox: EventEmitter<IChatBox> = new EventEmitter();
  @Output() reduceBox: EventEmitter<IChatBox> = new EventEmitter();

  friend !: IUser;
  msgContent: string = '';
  arr !: IChat[];

  constructor(private chat: ChatService, private users: UserService){}

  ngOnInit(): void { 
    this.friend = this.users.getUserInfo(this.chatBox.friendId);
    this.arr = this.chat.getChatWithFriend(this.friend.id);
  }
  getPicture(id: number){
    return this.users.getUserInfo(id).profilePic
  }
  addMsgContent(event: any){
    this.msgContent = event.target.value;
  }
  add(){ 
    this.chat.addMsg(this.msgContent, this.friend.id)
  }

  close(chat: IChatBox){ this.closeBox.emit(chat) }
  reduce(chat: IChatBox){ this.reduceBox.emit(chat) }
  
}
