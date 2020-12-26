import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostListComponent} from './posts/post.list/post.list.component';
import {PostCreateComponent} from './posts/post-create/post.create.component';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import {AuthGuard} from './auth/auth.guard';
import {MainComponent} from './main/main.component';
import {ViewanimalComponent} from './posts/ViewAnimal/Viewanimal.component';
import {Myposts} from './User/myposts/myposts';

const routes: Routes = [
  { path: '', component: MainComponent},
  // guard this two routes
    { path: 'create', component: PostCreateComponent, canActivate: [AuthGuard] },
    { path: 'edit/:postID', component: PostCreateComponent, canActivate: [AuthGuard]  },
  //
  { path: 'viewanimal/:postID' , component: ViewanimalComponent},
  { path: 'login', component: LoginComponent},
  { path: 'myposts', component: Myposts},
  { path: 'signup', component: SignupComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes),
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
    })],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {

}
