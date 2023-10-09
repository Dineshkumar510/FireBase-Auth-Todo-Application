import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TodoComponent} from './todo/todo.component';
import {AuthComponent} from './auth/auth.component';
import {RegisterComponent} from './register/register.component';
import {NotfoundComponent} from './notfound/notfound.component';

const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch: 'full'},
  {path: 'todo', component:TodoComponent},
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
