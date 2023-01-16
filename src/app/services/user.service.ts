import { Injectable, OnInit } from '@angular/core';
import { IUser } from '../interfaces/interfaces';
import usersData from '../data/users.json'
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit{
  users : IUser[] = usersData;
  loginId = new BehaviorSubject(-1);

  empty : IUser = {
    id: 0,
    name: '',
    species: '',
    email: '',
    country: '',
    city: '',
    password: '',
    friends: [],
    profilePic: ''
  }

  constructor() {  }
  ngOnInit(): void {}
  
  getUserInfo(id: number){    return this.users[id];  }
  // getUserFromId(id:number): IUser{    
  //   let result = this.users.find(user => user.id === id);
  //   return typeof result === 'undefined' ? this.empty : result;   
  // }
  getLoginId(): Observable<number> { return this.loginId}

  findUserLogin(email: string, password: string) : boolean{
    let matchUser = this.users.find(user => email === user.email);
    if (matchUser?.password === password){
      this.loginId.next(matchUser.id); return true;
    }
    this.loginId.next(-1); return false;      
  }
    // return matchUser === undefined ? -1 : 
    // matchUser.password === password ? matchUser.id : -1;

  filterSearch(body: string){
    let friendsIds: number[] = this.getUserInfo(0).friends;
    let friends = this.users.filter(user => friendsIds.includes(user.id));
    
    let content = new RegExp(body, 'gi')
    let result = friends.filter(friend => friend.name.match(content));
    return result;
  }

  getUserPicture(id: number){ return this.getUserInfo(id).profilePic}
  
}
