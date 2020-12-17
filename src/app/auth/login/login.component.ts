import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  constructor(public authService: AuthService) {
  }

  // tslint:disable-next-line:typedef
  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      this.authService.login(form.value.email, form.value.password);
    }
  }
}
