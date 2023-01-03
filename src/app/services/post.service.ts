import { Injectable } from '@angular/core';
import { IPost } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }

  posts : IPost[] = [
    { userId: 0, content: 'Another day in this prison...'},
    { userId: 1, content: 'Hop hop! :D'}
  ];

  getAllPosts(){return this.posts; }
  addPost(body: string){
    let newPost = {userId: 0, content: body}
    this.posts.unshift( newPost);
  }
}
