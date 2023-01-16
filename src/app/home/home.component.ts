import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPost } from '../interfaces/interfaces';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  arr !: IPost[];
  animals : UserService = this.users;
  postContent: string = '';

  loginId : number = -1;  
  loginIdSubs ?: Subscription;

  postSubject !: IPost[];  
  postSubs ?: Subscription;

  constructor(private post: PostService, private users: UserService){}

  ngOnInit(): void {
    this.users.getLoginId().subscribe(
      val => this.loginId = val
    );

    this.post.getPostsSubject().subscribe(
      val => this.arr = this.post.getFriendsPost(val, this.loginId)
    );
  }
  
  addPostContent(event: any){    this.postContent = event.target.value;  }
  add(){     this.post.addPost(this.postContent);   }

  ngOnDestroy(){
    this.loginIdSubs?.unsubscribe();
    this.postSubs?.unsubscribe();
  }
}
