import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/interfaces';
import usersData from '../data/users.json'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {}
  users : IUser[] = usersData;

  emailCheck(email : string): (number|null) {
    let result = this.users.filter(user => email === user.email);
    return result.length? result[0].id : null;
  }
  loginCheck(id : number): boolean{
    return this.users[id].isLoggedIn;
  }
  getUserInfo(id: number){
    return this.users[id];
  }
  getAllUsers(){return this.users}
  getUserFromId(id:number){
    return this.users.filter(user => user.id === id)
  }

  findUser(email: string, password: string){
    let matchId = this.emailCheck(email);
    if (matchId === null) return false;
    return this.getUserInfo(matchId).password === password;
    // return this.getUserInfo(matchId).password === password ? null : {notFound: true};
  }


  filterSearch(body: string){
    let friendsIds: number[] = this.getUserInfo(0).friends;
    let friends = this.users.filter(user => friendsIds.includes(user.id));
    
    let content = new RegExp(body, 'gi')
    let result = friends.filter(friend => friend.name.match(content));
    return result;
  }

}
