import { Injectable, OnInit } from '@angular/core';
import { IChat } from '../interfaces/interfaces';
import chatsData from '../data/chats.json'

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnInit{

  constructor() { }
  ngOnInit(){ console.log(chatsData) }

  chats : IChat[] = chatsData

  openChats : number[] = [];

  getAllMsgs(friendId : number){
    console.log(this.getChatWithFriend(friendId));
    return this.getChatWithFriend(friendId); 
  }

  getChatWithFriend(friendId : number){
    return this.chats.filter(chat => {
      let ids = [chat.senderId, chat.receiverId];
      return (ids.indexOf(friendId)> -1)
      }
      )
  }

  addMsg(body: string, friendId: number){

    let chatsWithFriend = this.getChatWithFriend(friendId);
    let lastMsg = chatsWithFriend[chatsWithFriend.length-1];
    let chatMsg = this.chats.find(msg => msg === lastMsg);
    // let chatMsg = this.chats[this.chats.indexOf(lastMsg)];

    if (chatMsg?.senderId === 0){
      chatMsg.content.push(body);
    }
    else {
      this.chats.push( {senderId: 0, receiverId: friendId, content: [body]});
    }
  }

  toggleChat(arr : boolean[], index: number){
    arr.map( (_, i) =>
    i !== index ? arr[i]=false : arr[i] = !arr[i])
    return arr[index]
  }

  openNewChat(friendId : number){
    if (this.openChats.indexOf(friendId)<= -1){
    this.openChats.length === 3 ? this.openChats.shift() : null;
    this.openChats.push(friendId);}
  }

}
