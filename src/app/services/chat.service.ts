import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }

  isOpen : boolean = false;
  toggleChatList(){this.isOpen = !this.isOpen; return this.isOpen;}
}
