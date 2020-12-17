import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { AppComponent } from './app.component';
import {PostCreateComponent} from './posts/post-create/post.create.component';
import {headerComponent} from './header/header.component';
import {PostListComponent} from './posts/post.list/post.list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
// tslint:disable-next-line:no-unused-expression
import {MatExpansionModule} from '@angular/material/expansion';
import {AppRoutingModule} from './app-routing-module';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';

import {AuthInterceptor} from './auth/auth-interceptor';
import {ErrorInterceptor} from './error.interceptor';
import {ErrorComponent} from './error/error.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Sidenav } from './sidenav/sidenav';

import { MatMenuModule } from '@angular/material/menu';
// noinspection AngularInvalidImportedOrDeclaredSymbol
@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    headerComponent,
    PostListComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent,
    Sidenav
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    HttpClientModule,
    MatDialogModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule
  ],
  providers: [ {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
