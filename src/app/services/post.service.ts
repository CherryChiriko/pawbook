import { Injectable } from '@angular/core';
import { IPost } from '../interfaces/interfaces';
import * as postsData from '../data/posts.json'

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }

  posts : IPost[] = postsData;

  getAllPosts(){return this.posts; }
  addPost(body: string){
    let newPost = {userId: 0, content: body}
    this.posts.unshift( newPost);
  }
}
