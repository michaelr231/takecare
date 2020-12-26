import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';


@Component( {
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./style.css'],
})

// tslint:disable-next-line:class-name
export class headerComponent implements OnInit, OnDestroy {
  isSticky = false;
  userIsAuthenticated = false;
  public username: string;
  private user: string;
  private authListenerSubs: Subscription;
  constructor(public authService: AuthService) {}
  // tslint:disable-next-line:typedef
    ngOnInit() {
    this.user = this.authService.getUsername();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
}



  // tslint:disable-next-line:typedef
 onLogout() {
    this.authService.logout();
}
  // tslint:disable-next-line:typedef
    ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
}



}

