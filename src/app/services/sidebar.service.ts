import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  isOpen = new BehaviorSubject(false);

  constructor() { }
  ngOnInit(){}
  
  getIsOpen(): Observable<boolean> { return this.isOpen}

  toggleSidebar(){
    console.log("I'm executing")
    this.isOpen.next(!this.isOpen);}
  turnOffSidebar(){
    this.isOpen.next(false);}

  updateData(val: boolean){
    this.isOpen.next(val);
  }
}
