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
  friend !: IUser;
  // @Output() 
  // isOpen: boolean = true;

  constructor(private chat: ChatService, private users: UserService){}
  

  arr = this.chat.getAllMsgs();
  animals = this.users;

  msgContent: string = '';

  
  addMsgContent(event: any){
    this.msgContent = event.target.value;
  }
  add(){ this.chat.addMsg(this.msgContent)}

  // private routeSub!: Subscription;
  userId !: number;
  // profile !: IUser;

  ngOnInit(): void { 
    // this.routeSub = this.route.params.subscribe(params => {
    //   this.userId = params['id'];
    //   console.log(this.users.getUserInfo(this.userId))
    //   this.profile = this.users.getUserInfo(this.userId);
    // }); 
    this.friend = this.users.getUserInfo(this.friendId);
  }

  // ngOnDestroy() {
  //   this.routeSub.unsubscribe();
  // }
}
