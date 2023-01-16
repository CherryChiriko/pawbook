import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
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

  loginId : number = -1;  
  loginIdSubs ?: Subscription;

  chatSubj !: IChat[];  
  chatSubjSubs ?: Subscription;

  constructor(private chat: ChatService, private users: UserService){}

  ngOnInit(): void { 
    this.users.getLoginId().subscribe(
      val => this.loginId = val
    );
    this.chat.getChatsSubject().subscribe(
      val => {
        this.arr = this.chat.getChatWithFriends(val, this.chatBox.friendId)
      }
    );

    this.friend = this.users.getUserInfo(this.chatBox.friendId);
    // this.arr = this.chat.getChatWithFriend(this.friend.id);
  }
  getPicture(id: number){
    return this.users.getUserPicture(id)
  }
  addMsgContent(event: any){
    this.msgContent = event.target.value;
  }
  add(){ 
    this.chat.addMsg(this.msgContent, this.friend.id)
  }

  close(chat: IChatBox){ this.closeBox.emit(chat) }
  reduce(chat: IChatBox){ this.reduceBox.emit(chat) }
  
  ngOnDestroy(){
    this.loginIdSubs?.unsubscribe();
    this.chatSubjSubs?.unsubscribe();
    // this.isOpenSubs?.unsubscribe();
  }
}
