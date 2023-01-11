import { Injectable } from '@angular/core';
import { IChat, IPost } from '../interfaces/interfaces';
import * as chatsData from '../data/chats.json'

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }

  chats : IChat[] = chatsData;

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
    let chatIndex = this.chats.findIndex(msg => msg === lastMsg)
    if (chatMsg?.senderId === 0){
      this.chats[chatIndex].content.push(body);
    }
    else {
      // console.log(this.chats, friendId , {senderId: 0, receiverId: friendId, content: [body]})
      this.chats.push( {senderId: 0, receiverId: friendId, content: [body]});
    }
  }

  toggleChat(arr : boolean[], index: number){
    arr.map( (_, i) =>
    i !== index ? arr[i]=false : arr[i] = !arr[i])
    return arr[index]
  }

  openNewChat(friendId : number){
    this.openChats.length === 3 ? this.openChats.shift() : null;
    this.openChats.push(friendId);
  }

}
