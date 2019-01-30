import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ChatComponent } from './pages/chat/chat.component';
import { AuthGuard } from './guards/auth.guard';
import { BodyContentsComponent } from './body-contents/body-contents.component';
import { BacklogComponent } from './pages/backlog/backlog-component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'board', component: BodyContentsComponent},
  { path: 'backlog', component: BacklogComponent},
  { path: 'chat', canActivate: [AuthGuard],
      children: [
        { path: '', component: ChatComponent } ] },
  { path: '**', redirectTo: '/login' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
