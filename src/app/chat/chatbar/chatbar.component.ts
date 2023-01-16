import { Component, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { IChatBox } from 'src/app/interfaces/interfaces';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chatbar',
  templateUrl: './chatbar.component.html',
  styleUrls: ['./chatbar.component.css']
})
export class ChatbarComponent implements OnInit{

  constructor(private chats: ChatService, private users : UserService){}

  barChats : IChatBox[] = []

  isOpen : boolean = false;  
  isOpenSubs ?: Subscription;

  link : string|null = ''

  // ngOnInit(): void { 
  //   this.loginIdSubs = this.users.getLoginId().subscribe(
  //     val => this.loginId = val
  //   );
  //   this.isOpenSubs = this.sidebar.getIsOpen().subscribe(
  //     val => this.isOpen = val
  //   )
  // }


  

  ngOnInit(): void {
    this.barChats = this.chats.barChats;
  }

  getPicture(id: number){
    return this.users.getUserPicture(id);
  }

  toggleChat(chat : IChatBox){
    this.barChats = this.chats.toggleChat(chat);
    console.log(this.barChats)
    return this.barChats
  }

  closeBoxHandler(chat: IChatBox){
    this.chats.closeChat(chat)
  }
  reduceBoxHandler(chat: IChatBox){
    this.chats.reduceChat(chat);
  }

  ngOnDestroy(){
    this.isOpenSubs?.unsubscribe();
  }
}
