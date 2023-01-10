import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  isOpen : boolean = false;

  constructor() { }
  ngOnInit(){
    this.isOpen = false;
  }
  
  toggleSidebar(){this.isOpen = !this.isOpen; return this.isOpen;}
}
