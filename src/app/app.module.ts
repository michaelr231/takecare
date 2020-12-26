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

import {PostListComponent} from './posts/post.list/post.list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { MatMenu } from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import {AppRoutingModule} from './app-routing-module';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import { CommonModule } from '@angular/common';
import { MatCommonModule } from '@angular/material/core';
import {AuthInterceptor} from './auth/auth-interceptor';
import {ErrorInterceptor} from './error.interceptor';
import {ErrorComponent} from './error/error.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { FooterComponent  } from './footer/footer';
import {headerComponent} from './header/header.component';
import {BannerComponent} from './banner/banner.component';
import {CenterComponent} from './center/center.component';
import {MainComponent} from './main/main.component';

import {MatSelectModule} from '@angular/material/select';
import {ViewanimalComponent} from './posts/ViewAnimal/Viewanimal.component';
import {Dialog} from './auth/dialogbox/dialog';
import {Myposts} from './User/myposts/myposts';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    headerComponent,
    PostCreateComponent,
    PostListComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent,
    FooterComponent,
    BannerComponent,
    CenterComponent,
    ViewanimalComponent,
    Dialog,
    Myposts
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    MatMenuModule,
    MatCommonModule,
    FlexLayoutModule,
    MatSelectModule,
    MatMenuModule,
    MatDividerModule,
    MatListModule
  ],
  providers: [ {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
