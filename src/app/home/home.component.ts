import { Component, OnInit } from '@angular/core';
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

  constructor(private post: PostService, private users: UserService){}

  ngOnInit(): void {
    this.arr = this.post.getFriendsPosts(0);
  }
  
  addPostContent(event: any){    this.postContent = event.target.value;  }
  add(){ this.post.addPost(this.postContent); console.log(this.post.getFriendsPosts(0))}
}
