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
  barChatSubs ?: Subscription;
  // chat : IChatBox = {friendId: 1, isOpen: true}
  link : string|null = ''

  ngOnInit(): void {
    this.barChatSubs = this.chats.getBarChatsSubject().subscribe(
      val => this.barChats = val
    );
  }

  getPicture(id: number){
    return this.users.getUserPicture(id);
  }

  toggleChat(chat : IChatBox){
    this.chats.toggleChat(chat);
  }
  closeBoxHandler(chat: IChatBox){
    this.chats.closeChat(chat)
  }
  reduceBoxHandler(chat: IChatBox){
    this.chats.reduceChat(chat);
  }

  ngOnDestroy(){
    this.barChatSubs?.unsubscribe();
  }
}
