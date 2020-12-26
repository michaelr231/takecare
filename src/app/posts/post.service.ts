import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({ providedIn: 'root'})

export class PostService {
  private posts: Post[] = [];
  public animal: string;
  private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient,
                private router: Router) {
    }

  // tslint:disable-next-line:typedef
    getAnimal() {
      return this.animal;
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
            animal: post.animal,
            animalname: post.animalname,
            selectedGender: post.selectedGender,
            selectedSize: post.selectedSize,
            location: post.location,
            houseTrained: post.houseTrained,
            age: post.age,
            health: post.health,
            aboutanimal: post.aboutanimal,
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
      return this.http.get<{
        _id: string,
        animal: string,
        animalname: string,
        selectedGender: string,
        selectedSize: string,
        location: string,
        houseTrained: string,
        age: string,
        health: string,
        imagePath: string,
        aboutanimal: string,
        creator: string}>(
        'http://localhost:3000/api/posts/' + id);
  }
  // tslint:disable-next-line:typedef
  addPost(animal: string, animalname: string,
          selectedGender: string, selectedSize: string,
          location: string, houseTrained: string, age: string,
          health: string, image: File, aboutanimal: string) {
    const postData = new FormData();
    postData.append('animal',  animal);
    postData.append('animalname', animalname);
    postData.append('selectedGender', selectedGender);
    postData.append('selectedSize', selectedSize);
    postData.append('location', location);
    postData.append('houseTrained', houseTrained);
    postData.append('age', age);
    postData.append('health', health);
    postData.append('image', image, animalname);
    postData.append('aboutanimal', aboutanimal);

    this.http.post<{message: string, post: Post}>('http://localhost:3000/api/posts', postData)
      .subscribe( responseData => {
        const post: Post = {
          id: responseData.post.id,
          animal,
          animalname,
          selectedGender,
          selectedSize,
          location,
          houseTrained,
          age,
          health,
          imagePath: responseData.post.imagePath,
          aboutanimal,
          creator: null
        };
        console.log(post);
        console.log(postData);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
    });
  }

  // tslint:disable-next-line:typedef
  updatePost(id: string, animal: string, animalname: string,
             selectedGender: string, selectedSize: string,
             location: string, houseTrained: string, age: string,
             health: string, image: File | string , aboutanimal: string) {
    // tslint:disable-next-line:prefer-const
      let postData: Post | FormData;
      if (typeof image === 'object') {
        // tslint:disable-next-line:no-shadowed-variable
        const postData = new FormData();
        postData.append('id', id);
        postData.append('animal',  animal);
        postData.append('animalname', animalname);
        postData.append('selectedGender', selectedGender);
        postData.append('selectedSize', selectedSize);
        postData.append('location', location);
        postData.append('houseTrained', houseTrained);
        postData.append('age', age);
        postData.append('health', health);
        postData.append('image', image, animalname);
        postData.append('aboutanimal', aboutanimal);

      } else {
        // tslint:disable-next-line:no-shadowed-variable
        postData = {
          id,
          animal,
          animalname,
          selectedGender,
          selectedSize,
          location,
          houseTrained,
          age,
          health,
          imagePath: image,
          aboutanimal,
          creator: null
        };

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
