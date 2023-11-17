import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TodoComponent} from './todo/todo.component';
import {AuthComponent} from './auth/auth.component';
import {RegisterComponent} from './register/register.component';
import {NotfoundComponent} from './notfound/notfound.component';
import {AuthGuard} from './auth/auth.guard';
import { ProfileComponent } from './Components/profile/profile.component';
import { MainProfileComponent } from './Components/main-profile/main-profile.component';
const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch: 'full'},
  {path: 'todo', component:TodoComponent, canActivate: [AuthGuard]},
  // canActivate: [AuthGuard]
  {path: 'profile', component:ProfileComponent, canActivate: [AuthGuard]},
  {path: 'profile/PersonDetails/:id', component: MainProfileComponent},
  {path: 'login', component:AuthComponent},
  {path: 'register', component:RegisterComponent},
  {path: '404', component:NotfoundComponent},
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
