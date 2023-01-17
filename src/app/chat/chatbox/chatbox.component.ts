import { Component, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
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

  @ViewChild('input') inputText!: { nativeElement: { value: string; }; };
  constructor(private chat: ChatService, private users: UserService){}

  ngOnInit(): void { 
    this.users.getLoginId().subscribe(
      val => this.loginId = val
    );
    this.chat.getChatsSubject().subscribe(
      val => {
        this.arr = this.chat.getChatWithFriend(val, this.chatBox.friendId)
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
    if (this.msgContent !== ''){
      this.chat.addMsg(this.msgContent, this.friend.id)
    }
    // console.log(this.inputText.nativeElement.value)
    this.inputText.nativeElement.value = ' ';
  }
  
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(event.key == 'Enter'){
      this.add()
    }
  }

  close(chat: IChatBox){ this.closeBox.emit(chat) }
  reduce(chat: IChatBox){ this.reduceBox.emit(chat) }
  
  ngOnDestroy(){
    this.loginIdSubs?.unsubscribe();
    this.chatSubjSubs?.unsubscribe();
    // this.isOpenSubs?.unsubscribe();
  }
}
