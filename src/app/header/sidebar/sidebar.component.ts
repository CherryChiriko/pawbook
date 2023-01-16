import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { SidebarService } from '../../services/sidebar.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor( private users: UserService, private sidebar: SidebarService, 
    private eRef: ElementRef, private chats: ChatService
    ){}

  loginId : number = -1;   
  loginIdSubs ?: Subscription; 
  searchBody: string = '';
  friendsIds ?: number[];

  ngOnInit(): void {
    this.users.getLoginId().subscribe(
      val => this.loginId = val
    );
    this.friendsIds = this.users.getUserInfo(this.loginId).friends;
  }

  public text!: String;
  hostElem = this.eRef.nativeElement;

  // ngAfterViewInit() {
    
  //   console.log(this.hostElem.children);
  //   console.log(this.hostElem.parentNode);
  // }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if(!this.eRef.nativeElement.contains(event.target) && 
    !this.hostElem.parentNode.contains(event.target) ) {
      // console.log("clicking outside?")
      this.turnOff();}
  }

  turnOff(){ 
    this.sidebar.turnOffSidebar();
  }
  
  getFriendInfo(id: number){  return this.users.getUserInfo(id)}

  search(){
    let result = this.users.filterSearch(this.searchBody);
    this.friendsIds = [... result.map(res => res.id)];
  }
  searchContent(event: any){    this.searchBody = event.target.value;  }

  openNewChat(friendId : number){
    this.chats.openNewChat(friendId)
  }

  ngOnDestroy(){
    this.loginIdSubs?.unsubscribe();
  }
}
