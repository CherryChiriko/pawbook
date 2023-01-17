import { Injectable } from '@angular/core';
import { IPost } from '../interfaces/interfaces';
import postsData from '../data/posts.json'
import { UserService } from './user.service';
import { BehaviorSubject, map, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor( private users : UserService) { 
    this.loginIdSubs = this.users.getLoginId().subscribe(
      val => this.loginId = val
    );
  }

  posts : IPost[] = postsData;  
  postsSubject = new BehaviorSubject(this.posts);

  loginId : number = -1;  
  loginIdSubs ?: Subscription;

  // getAllPosts(){return this.posts; }

  getFriendsPosts(userId: number){
      let friendIds = this.users.getUserInfo(userId).friends;
      return this.posts.filter(post => {
        return (
          post.userId === this.loginId || (
          friendIds.indexOf(post.userId)> -1)
          )
        }
      )
  }

  // getFriendsPost(id: number) {
  //   return this.postsSubject.pipe(
  //     map(posts => {
  //         console.log(posts)
  //       //  return /* post filtrati */
  
  //     }))
  // }
  getFriendsPost(arr : IPost[], userId: number){
    let friendIds = this.users.getUserInfo(userId).friends;
    return arr.filter(post => {
      return (
        post.userId === this.loginId || (
        friendIds.indexOf(post.userId)> -1)
        )
      }
    )
  }

  getPostsSubject(): Observable<IPost[]> { return this.postsSubject}

  addPost(body: string){
    let newPost = {userId: this.loginId, content: body}
    this.posts.unshift( newPost);
    // // this.postsSubject.next(this.posts);    
    // console.log("posts ", this.posts)
  }

  ngOnDestroy(){
    this.loginIdSubs?.unsubscribe();
  }
}
