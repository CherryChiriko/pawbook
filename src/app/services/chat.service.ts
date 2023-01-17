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

  closeChat(chat: IChatBox){ 
    this.barChat$.pipe(take(1)).subscribe(val=>
      {
        let i = val.indexOf(chat);
        val.splice(i, 1);
        console.log("val ", val)
        this.barChat$.next(val);
      })  
  }
  reduceChat(chat: IChatBox){
    this.barChat$.pipe(take(1)).subscribe(
      val => {
        let i = val.indexOf(chat);
        val[i].isOpen = false;
        this.barChat$.next(val);
      }
    )
  }
  toggleChat(chat: IChatBox){

    this.barChat$.pipe(take(1)).subscribe(
      val => {
        let i = val.indexOf(chat);
        if (val[i].isOpen === false){
          val.map(chat => chat.isOpen = false)
          val[i].isOpen = true; 
          this.barChat$.next(val);
        }
        else { val[i].isOpen = false; }
        this.barChat$.next(val);
      }
    )
  }

  openNewChat(friendId: number) {
    let foundCorrespondence = false;
    this.barChat$.pipe(take(1)).subscribe(val =>
      {
        val.map( chat => {
          chat.isOpen = false;
          if (chat.friendId === friendId){
            foundCorrespondence = true;
            chat.isOpen = !chat.isOpen;
            this.barChat$.next(val)
          }
        })
        if (!foundCorrespondence){
        val.length === 3 ? val.shift() : null;
        let newChat = {friendId: friendId, isOpen: true};
        this.barChat$.next([... val, newChat])}
      }
    )
  }

  ngOnDestroy(){
    this.loginIdSubs?.unsubscribe();
  }
}