import {Component, OnInit} from '@angular/core';
import { Post } from '../post.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../post.service';
import {ActivatedRoute} from '@angular/router';
import { mimeType } from './mime-type.validator';



@Component({
  selector: 'app-post-create',
  templateUrl: './post.create.component.html',
  styleUrls: ['./post.create.css']
})
export class PostCreateComponent implements OnInit {
  public post: Post;
  form: FormGroup;
  selectedGender;
  selectedSize;
  houseTrained;
  // @ts-ignore

  imgPreviewToUrl: string;
  private mode = 'create';
  public postID: string;
  // @ts-ignore
  animals: Animal[] = [
    {name: 'Dog'},
    {name: 'Cat'},
    {name: 'Rabbit'},
    {name: 'Fox'},
    {name: 'Horse'},
    {name: 'Fish'},
    {name: 'Parrot'},

  ];

 constructor(public postService: PostService,
             public route: ActivatedRoute,
            ) {
 }

  // tslint:disable-next-line:typedef
 ngOnInit() {
   this.form = new FormGroup({
     animal: new FormControl(null,
       {validators: [Validators.required]}),
     animalname: new FormControl(null,
       {validators: [Validators.required]}),
     selectedGender: new FormControl(null,
       {validators: [Validators.required]}),
     selectedSize: new FormControl(null,
       {validators: [Validators.required]}),
     location: new FormControl(null,
       {validators: [Validators.required]}),
     houseTrained: new FormControl(null,
       {validators: [Validators.required]}),
     age: new FormControl(null,
       {validators: [Validators.required]}),
     health: new FormControl(null,
       {validators: [Validators.required]}),
     image: new FormControl(null,
       {validators: [Validators.required], asyncValidators: [mimeType]}),
     aboutanimal: new FormControl(null,
       {validators: [Validators.required]}),
   });
   // @ts-ignore
   this.route.paramMap.subscribe((paramMap: paramMap) =>
   {
     console.log(this.mode);
     if (paramMap.has('postID'))
     {
        this.mode = 'edit';
        this.postID = paramMap.get('postID');
        this.postService.getPost(this.postID).subscribe(
          postData => {
            this.post = {
              id: postData._id,
              animal: postData.animal,
              animalname: postData.animalname,
              selectedGender: postData.selectedGender,
              selectedSize: postData.selectedSize,
              location: postData.location,
              houseTrained: postData.houseTrained,
              age: postData.age,
              health: postData.health,
              imagePath: postData.imagePath,
              aboutanimal: postData.aboutanimal,
              creator: postData.creator
            };
            this.form.setValue({
              animal: this.post.animal,
              animalname: this.post.animalname,
              selectedGender: this.post.selectedGender,
              selectedSize: this.post.selectedSize,
              location: this.post.location,
              houseTrained: this.post.houseTrained,
              age: this.post.age,
              health: this.post.health,
              image: this.post.imagePath,
              aboutanimal: this.post.aboutanimal
            });
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
   console.log(
     this.form.value.animal.name,
     this.form.value.animalname,
     this.form.value.selectedGender,
     this.form.value.selectedSize,
     this.form.value.location,
     this.form.value.houseTrained,
     this.form.value.age,
     this.form.value.health,
     this.form.value.image,
     this.form.value.aboutanimal
   );
   if (this.form.invalid) {
     return;
   }
   if (this.mode === 'create') {
     this.postService.addPost(
       this.form.value.animal.name,
     this.form.value.animalname,
     this.form.value.selectedGender,
     this.form.value.selectedSize,
     this.form.value.location,
     this.form.value.houseTrained,
     this.form.value.age,
     this.form.value.health,
       this.form.value.image,
     this.form.value.aboutanimal
     );

   } else {

     this.postService.updatePost(
       this.postID,
       this.form.value.animal,
       this.form.value.animalname,
       this.form.value.selectedGender,
       this.form.value.selectedSize,
       this.form.value.location,
       this.form.value.houseTrained,
       this.form.value.age,
       this.form.value.health,
       this.form.value.image,
       this.form.value.aboutanimal
   );
   }
   this.form.reset();
 }
}
