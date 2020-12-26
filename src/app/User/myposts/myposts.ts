import {Component, OnInit} from '@angular/core';
import {Post} from '../../posts/post.model';
import {Subscription} from 'rxjs';
import {PostService} from '../../posts/post.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.html',
  styleUrls: ['./style.css']
})

// tslint:disable-next-line:component-class-suffix
export class Myposts implements OnInit {
  posts: Post[] = [];
  userIsAuthenticated = false;
  userId: string;
  private postsSub: Subscription;
  private authStatusSub: Subscription;
  public post: Post;

  constructor(public postService: PostService,
              private authService: AuthService) {

  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.postService.getPosts();
    this.userId = this.authService.getUserId(); this.postsSub = this.postService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });

  }
  // tslint:disable-next-line:typedef
  onDelete(postID: string) {
    this.postService.deletePost(postID);
  }
}
