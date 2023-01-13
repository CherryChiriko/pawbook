import { Injectable } from '@angular/core';
import { IPost } from '../interfaces/interfaces';
import postsData from '../data/posts.json'
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor( private users : UserService) { }

  posts : IPost[] = postsData;

  getAllPosts(){return this.posts; }

  getFriendsPosts(userId: number){
      let friendIds = this.users.getUserFromId(userId)?.friends;
      return this.posts.filter(post => {
        return (
          post.userId === 0 || (
          typeof friendIds !== 'undefined' &&
          friendIds.indexOf(post.userId)> -1)
          )
        }
      )
  }

  addPost(body: string){
    let newPost = {userId: 0, content: body}
    this.posts.unshift( newPost);
  }

}
