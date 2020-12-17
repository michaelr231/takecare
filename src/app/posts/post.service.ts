import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({ providedIn: 'root'})

export class PostService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient,
                private router: Router) {
    }
  // tslint:disable-next-line:typedef
  getPosts() {
    // new array of arrays and not change the original array
    this.http.get<{ message: string; posts: any }>
    ('http://localhost:3000/api/posts')
      .pipe(map((postData) => {
        return postData.posts.map( post => {
          // @ts-ignore
          // @ts-ignore
          // @ts-ignore
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath: post.imagePath,
            creator: post.creator
          };
        });
      }))
      .subscribe( (transformedPosts) => {
        console.log(transformedPosts);
        this.posts = transformedPosts;

        this.postsUpdated.next([...this.posts]);
      });
  }

  // tslint:disable-next-line:typedef
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  // tslint:disable-next-line:typedef
  getPost(id: string) {
      return this.http.get<{ _id: string, title: string, content: string, imagePath: string, creator: string}>(
        'http://localhost:3000/api/posts/' + id);
  }
  // tslint:disable-next-line:typedef
  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);

    this.http.post<{message: string, post: Post}>('http://localhost:3000/api/posts', postData)
      .subscribe( responseData => {

        const post: Post = {
          id: responseData.post.id,
          title,
          content,
          imagePath: responseData.post.imagePath,
          creator: null
        };

        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
    });
  }

  // tslint:disable-next-line:typedef
  updatePost(id: string, title: string, content: string, image: File | string) {
    // tslint:disable-next-line:prefer-const
      let postData: Post | FormData;
      if (typeof image === 'object') {
        // tslint:disable-next-line:no-shadowed-variable
        const postData = new FormData();
        postData.append('id', id);
        postData.append('title', title);
        postData.append('content', content);
        postData.append('image', image, title);

      } else {
        // tslint:disable-next-line:no-shadowed-variable
        postData = {
          id,
          title,
          content,
          imagePath: image,
          creator: null
        };
        console.log(postData.imagePath);

      }
      this.http.put('http://localhost:3000/api/posts/' + id, postData)
        .subscribe
        // tslint:disable-next-line:no-shadowed-variable
      (response => {
        this.router.navigate(['/']);
      });


  }
  // tslint:disable-next-line:typedef
  deletePost(postID: string) {
      this.http.delete('http://localhost:3000/api/posts/' + postID)
        .subscribe(() => {
          const updatedPosts = this.posts.filter( post =>
            post.id !== postID);
          this.posts = updatedPosts;
          this.postsUpdated.next([...this.posts]);
        });
  }
}
