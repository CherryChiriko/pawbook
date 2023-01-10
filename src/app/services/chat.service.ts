import { Injectable } from '@angular/core';
import { IChat, IPost } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }

  chats : IChat[] = [
    {senderId: 1, receiverId: 0, content: ["Hey, how are you?"]},
    {senderId: 0, receiverId: 1, content: ["Not so well...", "I haven't eaten yet"]},
    {senderId: 5, receiverId: 0, content: ["Hi hi!", "What a nice day"]},
    {senderId: 0, receiverId: 1, content: ["I'm still waiting for lunch"]},
  ]

  posts : IPost[] = [
    { userId: 0, content: 'Another day in this prison...'},
    { userId: 1, content: 'Hop hop! :D'}
  ];

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

  // updateChat(body: string, friendId: number){

  // }

  // updateMsg(){

  // }
  addMsg(body: string, friendId: number){
    let chatsWithFriend = this.getChatWithFriend(friendId);
    let lastMsg = chatsWithFriend[chatsWithFriend.length-1];
    let chatMsg = this.chats.find(msg => msg === lastMsg);
    let chatIndex = this.chats.findIndex(msg => msg === lastMsg)
    if (chatMsg?.senderId === 0){
      this.chats[chatIndex].content.push(body);
    }
    else {
      this.chats.unshift( {senderId: 0, receiverId: friendId, content: [body]});
    }
    // console.log(chatMsg)
    // console.log(chatsWithFriend[chatsWithFriend.length-1].content)
    // if (chatsWithFriend[chatsWithFriend.length-1].senderId === 0){
    //   this.chats[this.chats.length-1].content.push(body);
    // }


    // else{
    //   this.chats.unshift( {senderId: 0, receiverId: friendId, content: [body]});
    // }
  }
}
