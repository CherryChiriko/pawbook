import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor( private users: UserService, private sidebar: SidebarService, private eRef: ElementRef){}

  // isOpen : boolean = false;
  searchBody: string = '';
  friendsIds ?: number[];

  ngOnInit(): void {
    // this.isOpen = this.sidebar.isOpen;
    this.friendsIds = this.users.getUserInfo(0).friends;
  }

  public text!: String;

  // @HostListener('document:click', ['$event'])
  // clickout(event: any) {
  //   if(!this.eRef.nativeElement.contains(event.target)) {
  //     this.turnOff();}
  // }

  loginCheck(){ return this.users.loginCheck(0);}
  // toggleBar(){ this.isOpen = this.sidebar.toggleSidebar();}
  // toggleBar(){ this.isOpen = false;}
  turnOff(){ this.sidebar.turnOffSidebar(); console.log("I should be off")}
  
  getFriendInfo(id: number){  return this.users.getUserInfo(id)}

  search(){
    let result = this.users.filterSearch(this.searchBody);
    this.friendsIds = [... result.map(res => res.id)];
  }
  searchContent(event: any){    this.searchBody = event.target.value;  }
}
