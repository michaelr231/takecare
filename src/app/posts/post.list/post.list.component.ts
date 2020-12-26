import {Component,  OnDestroy, OnInit} from '@angular/core';
import { Post } from '../post.model';
import {PostService} from '../post.service';
import { Subscription } from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import { NgForm } from '@angular/forms';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-post-list',
  templateUrl: './post.list.component.html',
  styleUrls: ['./post.list.css'],
})
export class PostListComponent implements OnInit, OnDestroy {

 posts: Post[] = [];
 private postsSub: Subscription;
 private authStatusSub: Subscription;
  userIsAuthenticated = false;
  userId: string;
 constructor(public postService: PostService,
             private authService: AuthService) {

 }
  // tslint:disable-next-line:typedef
 ngOnInit() {
   this.postService.getPosts();
   this.userId = this.authService.getUserId();
   this.postsSub = this.postService.getPostUpdateListener()
     .subscribe((posts: Post[]) => {
       this.posts = posts;
     });
   this.userIsAuthenticated = this.authService.getIsAuth();
   this.authStatusSub = this.authService.getAuthStatusListener().subscribe( isAuthenticated => {
     this.userIsAuthenticated = isAuthenticated;
     this.userId = this.authService.getUserId();
     });

 }
  // tslint:disable-next-line:typedef
 onDelete(postID: string) {
this.postService.deletePost(postID);
}
  // tslint:disable-next-line:typedef
 ngOnDestroy() {
   this.postsSub.unsubscribe();
   this.authStatusSub.unsubscribe();
 }
}
