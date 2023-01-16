import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  isOpen : boolean = false;

  constructor() { }
  ngOnInit(){}
  
  toggleSidebar(){this.isOpen = !this.isOpen; return this.isOpen;}
  turnOffSidebar(){this.isOpen = false; return this.isOpen;}
}
