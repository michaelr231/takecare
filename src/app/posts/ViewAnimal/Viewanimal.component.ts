import {Component, OnInit} from '@angular/core';
import { Post } from '../post.model';
import {PostService} from '../post.service';
import {AuthService} from '../../auth/auth.service';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {Dialog} from '../../auth/dialogbox/dialog';

@Component({
  selector: 'app-viewanimal',
  templateUrl: './viewanimal.component.html',
  styleUrls: ['./style.css']
})

export class ViewanimalComponent implements OnInit {
  public post: Post;
  public postID: string;

  constructor(public postService: PostService,
              public authService: AuthService,
              private route: ActivatedRoute,
              public dialog: MatDialog) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {

    // @ts-ignore
    this.route.paramMap.subscribe((paramMap: paramMap) => {
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
        }
      );

    });
  }
  // tslint:disable-next-line:typedef
  openDialog() {
    this.dialog.open(Dialog);
  }
}
