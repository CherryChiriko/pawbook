import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from '../interfaces/interfaces';
import { ChatService } from '../services/chat.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  constructor(private post: ChatService, private users: UserService, private route: ActivatedRoute){}
  
  arr = this.post.getAllPosts();
  animals = this.users;

  postContent: string = '';

  
  addPostContent(event: any){
    this.postContent = event.target.value;
  }
  add(){ this.post.addPost(this.postContent)}

  private routeSub!: Subscription;
  userId !: number;
  profile !: IUser;

  ngOnInit(): void { 
    this.routeSub = this.route.params.subscribe(params => {
      this.userId = params['id'];
      console.log(this.users.getUserInfo(this.userId))
      this.profile = this.users.getUserInfo(this.userId);
    }); 
  }
  // isLoggedIn = this.users.loginCheck(this.userId)

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
