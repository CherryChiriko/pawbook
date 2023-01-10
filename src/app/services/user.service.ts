import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {}
  users : IUser[] = [
    { id: 0, name: 'Pixie', species: 'cat', 
    email:'pixie@gmail.com', country: 'Thailand', city: 'Chiang Mai (เชียงใหม่)', 
    isLoggedIn: false, password: 'Ih8U',
    profilePic: '../assets/images/pixie.jpg',
    friends: [1,5]},

    { id: 1, name: 'Mr. Hopkins', species: 'frog', 
    email:'hop@gmail.com', country: 'Brazil', city: 'São Paulo', 
    isLoggedIn: false, password: 'ComeBackSoon39',
    profilePic: '../assets/images/hopkins.jpg',
    friends: [1,5]},

    { id: 2, name: 'Freddy', species: 'penguin', 
    email:'pen@gmail.com', country: 'Argentina', city: 'Rio Grande', 
    isLoggedIn: false, password: 'IceCreamSanta123',
    profilePic: '../assets/images/freddy.jpg',
    friends: [1,5]},

    { id: 3, name: 'Juan', species: 'monkey', 
    email:'jungle@gmail.com', country: 'Costa Rica', city: 'Manuel Antonio', 
    isLoggedIn: false, password: 'Banana',
    profilePic: '../assets/images/juan.jpg',
    friends: [1,5]},

    { id: 4, name: 'Federico', species: 'dog', 
    email:'FEDuX22@gmail.com', country: 'Italy', city: 'Urbino', 
    isLoggedIn: false, password: 'MorsTuaVitaMea',
    profilePic: '../assets/images/federico.jpg',
    friends: [1,5]},

    { id: 5, name: 'Harvey', species: 'rabbit', 
    email:'harvey_edna@gmail.com', country: 'Germany', city: 'Berlin', 
    isLoggedIn: false, password: 'Edna',
    profilePic: '../assets/images/harvey.jpg',
    friends: [0,1,2,3,4]},
  ];

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
