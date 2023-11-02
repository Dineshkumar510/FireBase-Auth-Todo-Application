import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ReplaySubject, Subject } from 'rxjs';
import {User} from './user.model'
import { ToastserviceService } from '../toastservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   user: Subject<User> = new ReplaySubject<User>(1);

constructor(
  private afAuth: AngularFireAuth,
  private router: Router,
  private toast : ToastserviceService,
  ) { }


Login(email: string, password: string) {
  this.afAuth.signInWithEmailAndPassword(email, password).then(()=> {
    const user = new User(email, password)
    localStorage.setItem('token', 'value');
    this.router.navigate(['/profile']);
    this.user.next(user);
  }, err => {
    this.toast.openError(err.message)
    //alert("Something Went Wrong" + " " + err.message);
    this.router.navigate(['/login']);
  });
}

signUp(email: string, password: string){
  this.afAuth.createUserWithEmailAndPassword(email, password).then(()=>{
    alert("Registration Successfull");
    this.router.navigate(['/login']);
  }, err => {
    this.toast.openError(err.message)
    //alert(err.message);
    this.router.navigate(['/register']);
  })
}



signOut(){
  return this.afAuth.signOut().then(()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('TotalDetails');
    this.user.next(null!);
    //this.user = JSON.parse(localStorage.getItem('token')!)
    this.router.navigate(['/login'], { skipLocationChange: true });
  }, error => {
    this.toast.openError(error.message)
    //alert(error.message);
  });
}

}
