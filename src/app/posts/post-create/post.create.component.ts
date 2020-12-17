import {Component, OnInit} from '@angular/core';
import { Post } from '../post.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../post.service';
import {ActivatedRoute, Router} from '@angular/router';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post.create.component.html',
  styleUrls: ['./post.create.css']
})
export class PostCreateComponent implements OnInit {
 public post: Post;
 form: FormGroup;
 imgPreviewToUrl: string;
  private mode = 'create';
private postID: string;


 constructor(public postService: PostService,
             public route: ActivatedRoute,
            ) {
 }

  // tslint:disable-next-line:typedef
 ngOnInit() {
   this.form = new FormGroup({
     title: new FormControl(null,
       {validators: [Validators.required, Validators.minLength(3)] }),
     content: new FormControl(null,
       {validators: [Validators.required]}),
     image: new FormControl(null,
       {validators: [Validators.required], asyncValidators: [mimeType]})
   });
   // @ts-ignore
   this.route.paramMap.subscribe((paramMap: paramMap) =>
   {
     console.log(this.mode);
     if (paramMap.has('postID')) {
        this.mode = 'edit';
        this.postID = paramMap.get('postID');
        this.postService.getPost(this.postID).subscribe(
          postData => {
            this.post = {
              id: postData._id,
              title: postData.title,
              content: postData.content,
              imagePath: postData.imagePath,
              creator: postData.creator
            };
            this.form.setValue({
              title: this.post.title,
              content: this.post.content,
              image: this.post.imagePath
            });
            console.log(this.form.value.imagePath);
          }
        );
      } else {
        this.mode = 'create';
        this.postID = null;
      }
   });
 }

  // tslint:disable-next-line:typedef
    onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imgPreviewToUrl = reader.result as string;
    };
    reader.readAsDataURL(file);

    }
  // tslint:disable-next-line:typedef
  onSavePost() {
   if (this.form.invalid) {
     return;
   }
   if (this.mode === 'create') {
     this.postService.addPost(
       this.form.value.title,
       this.form.value.content,
       this.form.value.image
     );
   } else {

     this.postService.updatePost(
       this.postID,
       this.form.value.title,
       this.form.value.content,
        this.form.value.image
   );
   }
   this.form.reset();
 }
}
