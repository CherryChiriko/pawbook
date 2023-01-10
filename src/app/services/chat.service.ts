import { Injectable } from '@angular/core';
import { IChat, IPost } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }

  isOpen : boolean = false;
  toggleChatList(){this.isOpen = !this.isOpen; return this.isOpen;}

  chats : IChat[] = [
    {senderId: 0, receiverId: 1, content: ["Hey, how are you?"]},
    {senderId: 1, receiverId: 0, content: ["Not so well...", "I haven't eaten yet"]},
    {senderId: 5, receiverId: 0, content: ["Hi hi!", "What a nice day"]},
    {senderId: 0, receiverId: 1, content: ["I'm still waiting for lunch"]},
  ]

  posts : IPost[] = [
    { userId: 0, content: 'Another day in this prison...'},
    { userId: 1, content: 'Hop hop! :D'}
  ];

  getAllMsgs(){return this.posts; }
  addMsg(body: string){
    let newPost = {userId: 0, content: body}
    this.posts.unshift( newPost);
  }
}
