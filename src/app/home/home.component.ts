import { Component } from '@angular/core';
import { IPost } from '../interfaces/interfaces';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  constructor(private post: PostService, private users: UserService){}
  arr = this.post.getAllPosts();
  animals = this.users;

  postContent: string = '';

  
  addPostContent(event: any){
    this.postContent = event.target.value;
  }
  add(){ this.post.addPost(this.postContent)}
}
