import { Injectable, OnInit } from '@angular/core';
import { IUser } from '../interfaces/interfaces';
import usersData from '../data/users.json'

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit{
  users : IUser[] = usersData;
  loginId !: number;

  constructor() {}
  ngOnInit(): void {
    this.loginId = -1;
  }
  
  getUserInfo(id: number){    return this.users[id];  }
  getUserFromId(id:number){    return this.users.find(user => user.id === id)  }
  getLoginId(): number { return this.loginId}

  findUserLogin(email: string, password: string) : boolean{
    let matchUser = this.users.find(user => email === user.email);
    if (matchUser?.password === password){
      this.loginId = matchUser.id; return true;
    }
    this.loginId = -1; return false;      
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

}
