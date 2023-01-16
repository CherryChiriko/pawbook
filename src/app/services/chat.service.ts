import { Injectable, OnInit } from '@angular/core';
import { IChat, IChatBox } from '../interfaces/interfaces';
import chatsData from '../data/chats.json'
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService{
  
  chat$ = new BehaviorSubject<IChat[]>(chatsData);
  barChat$ = new BehaviorSubject<IChatBox[]>([]);

  loginId : number = -1;  
  loginIdSubs ?: Subscription;

  constructor(private users: UserService) { 
    this.loginIdSubs = this.users.getLoginId().subscribe(
      val => this.loginId = val
    );
  }

  getChatsSubject(): Observable<IChat[]> { return this.chat$}
  getBarChatsSubject(): Observable<IChatBox[]> { return this.barChat$}

  getChatWithFriend(arr: IChat[], friendId : number){
    return arr.filter(chat => {
      let ids = [chat.senderId, chat.receiverId];
      return (ids.indexOf(friendId)> -1)
      }
    )
  }

  addMsg(body: string, friendId: number){
    this.chat$.pipe(take(1)).subscribe(val =>
      {
        let chatsWithFriend = this.getChatWithFriend(val, friendId);
        let lastMsg = chatsWithFriend[chatsWithFriend.length-1];
        let chatMsg = val[val.indexOf(lastMsg)];

        if (chatMsg?.senderId === this.loginId){
          chatMsg.content.push(body);
          this.chat$.next(val);
        }
        else {
          const newMsg = {senderId: this.loginId, receiverId: friendId, content: [body]}
          this.chat$.next([...val, newMsg])
        }
      }
    )
  }

  reduceAll(){ 
    this.barChat$.subscribe(val=>
      val.map( chat => chat.isOpen = false)); 
  }
  closeChat(chat: IChatBox){ 
    // const index = this.barChats.indexOf(chat);
    // this.barChats.splice(index, 1);   
  }
  reduceChat(chat: IChatBox){
    this.reduceAll();    
    this.barChat$.pipe(take(1)).subscribe(val =>
      {
        let i = val.indexOf(chat);
        val[i].isOpen = false;
        this.barChat$.next(val)
      }
    );  
    // chat.isOpen = false;
  }
  toggleChat(chat: IChatBox){
    this.reduceAll();     
    chat.isOpen = !chat.isOpen;
    // return this.barChats;
  }

  openNewChat(friendId: number) {
    let foundCorrespondence = false;
    this.barChat$.pipe(take(1)).subscribe(val =>
      {
        val.map( chat => {
          if (chat.friendId === friendId){
            chat.isOpen = !chat.isOpen;
            foundCorrespondence = true;
            this.barChat$.next(val)
          }
        })
        if (!foundCorrespondence){
        val.length === 3 ? val.shift() : null;
        let newChat = {friendId: friendId, isOpen: true}
        this.barChat$.next([... val, newChat])}
      }
    )
  }

  ngOnDestroy(){
    this.loginIdSubs?.unsubscribe();
  }
}


  // toggleChat(arr : boolean[], index: number){
  //   arr.map( (_, i) =>
  //   i !== index ? arr[i]=false : arr[i] = !arr[i])
  //   return arr[index]
  // }

  // openNewChat(friendId : number){
    // let foundCorrespondence = false;
    // barChats.map(
    //     chat => 
    //    { 
    //        if (chat.friend === friendId) { 
    //        foundCorrespondence = true; 
    //        barChats.map( chat => chat.isOpen = false);
    //        chat.isOpen = true}
    //    }
    // )
    // if (!foundCorrespondence) { 
    //     barChats.length === 3 ? barChats.shift() : null;
    //     barChats.map( chat => chat.isOpen = false);
    //     barChats.push({friend: friendId, isOpen: true});
    // }


    // if (this.barChats.indexOf(friendId)<= -1){
    // this.barChats.length === 3 ? this.barChats.shift() : null;
    // this.barChats.push(friendId);}
  // }

  // closeChat(friendId: number){
    // const index = this.barChats.indexOf(friendId);
    // this.barChats.splice(index, 1);
  // }
  // reduceChat(arr : boolean[], friendId: number){
    // let index = this.barChats.indexOf(friendId);
    // // this.toggleChat(arr, index)
    // arr[index] = false;
    // return arr;
  // }