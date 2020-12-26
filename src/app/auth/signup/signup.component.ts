import {Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthService} from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.css']
})
export class SignupComponent {
  constructor(public authService: AuthService) {
  }

  // tslint:disable-next-line:typedef
  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      this.authService.createUser(form.value.email, form.value.password);
    }
  }
}
