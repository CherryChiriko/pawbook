import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {}
  users : IUser[] = [
    { id: 0, name: 'Pixie', species: 'cat', 
    email:'pixie@gmail.com', country: 'Thailand', city: 'Chiang Mai', 
    isLoggedIn: false, password: 'Ih8U',
    profilePic: '../assets/images/pixie.jpg',
    friends: [1,5]},

    { id: 1, name: 'Mr. Hopkins', species: 'frog', 
    email:'hop@gmail.com', country: 'Brazil', city: 'Sao Paolo', 
    isLoggedIn: false, password: 'ComeBackSoon39',
    profilePic: '../assets/images/hopkins.jpg'},

    { id: 2, name: 'Freddy', species: 'penguin', 
    email:'pen@gmail.com', country: 'Argentina', city: 'Rio Grande', 
    isLoggedIn: false, password: 'IceCreamSanta123'},

    { id: 3, name: 'Juan', species: 'monkey', 
    email:'jungle@gmail.com', country: 'Costa Rica', city: 'Manuel Antonio', 
    isLoggedIn: false, password: 'Banana'},

    { id: 4, name: 'Federico', species: 'dog', 
    email:'FEDuX22@gmail.com', country: 'Italy', city: 'Urbino', 
    isLoggedIn: false, password: 'MorsTuaVitaMea'},

    { id: 5, name: 'Harvey', species: 'rabbit', 
    email:'harvey_edna@gmail.com', country: 'Germany', city: 'Berlin', 
    isLoggedIn: false, password: 'Edna',
    profilePic: '../assets/images/harvey.jpg'},
  ];

  pswCheck(psw : string): (number|null) {
    let result = this.users.filter(user => psw === user.password);
    return result.length? result[0].id : null;
  }
  loginCheck(id : number): boolean{
    return this.users[id].isLoggedIn;
  }
  getUserInfo(id: number){
    return this.users[id];
  }
  getAllUsers(){return this.users}
  filterSearch(body: string){
    let content = new RegExp(body, 'gi')
    let result = this.users.filter(user => user.name.match(content));
    return result.length? result : null;
  }

}
