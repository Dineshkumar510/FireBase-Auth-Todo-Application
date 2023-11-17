import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ReplaySubject, Subject } from 'rxjs';
import {User} from './user.model'
import { ToastserviceService } from '../toastservice.service';
import { Observable } from 'rxjs';
import { async } from '@angular/core/testing';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered? : boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    user: Subject<User> = new ReplaySubject<User>(1);
    tokenexpirationTimer : any;
    //user$: Observable<firebase.default.User | null>;

// constructor(
//   private afAuth: AngularFireAuth,
//   private router: Router,
//   private toast : ToastserviceService,
//   ) { }


  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private toast : ToastserviceService
    ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        // User is signed in.
        user.getIdTokenResult().then((idTokenResult) => {
          // idTokenResult.expirationTime contains the expiration time in milliseconds
          const expiresInMilliseconds:any = idTokenResult.expirationTime;
          console.log('Token expires in:', expiresInMilliseconds, 'milliseconds');

          // You can convert milliseconds to a human-readable format if needed
          const expiresInInSeconds = expiresInMilliseconds / 1000;
          console.log('Token expires in:', expiresInInSeconds, 'seconds');
        });
      } else {
        // User is signed out.
      }
    });
  }


// Login(email: string, password: string) {
//  async this.afAuth.signInWithEmailAndPassword(email, password).then(()=> {
//     const user = new User(email, password)
//     localStorage.setItem('token', 'value');
//     this.router.navigate(['/profile']);
//     this.user.next(user);
//   }, err => {
//     this.toast.openError(err.message)
//     //alert("Something Went Wrong" + " " + err.message);
//     this.router.navigate(['/login']);
//   });
// }

  async Login(email:string, password:string) {
    const result = this.afAuth.signInWithEmailAndPassword(email, password);
    const user:any|null = (await result).user;
    console.log("User Data", user);
    const idTokenResult = await user.getIdTokenResult();
    const expirationTime:any = idTokenResult.expirationTime;
    this.handleAuthenication(user.email, user.uid, await user.getIdToken(), user._delegate.stsTokenManager.expirationTime)
    //console.log(user.email, user.uid,  await user.getIdToken(), user._delegate.stsTokenManager.expirationTime)
    // console.log('ID Token:', await user.getIdToken());
    // console.log('Email:', user.email);
    // console.log('Refresh Token:', user.refreshToken);
    // console.log('Expires In:', user.expiresIn);
    // console.log('Local ID:', user.uid);
    // console.log('Registered:', user.emailVerified);

    localStorage.setItem('UserSessionData', JSON.stringify(user))
     this.router.navigate(['/profile']);
     this.user.next(user);
   }
    catch (error:any) {
    this.toast.openError(error.message);
    this.router.navigate(['/login']);
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


autoLogin(){
  const userData : {
    email: string,
    id: string,
    _token : string,
    _tokenExpirationDate: string } = JSON.parse(localStorage.getItem('UserSessionData') || '{}');

    if(!userData){
      return;
    }

    const LoadUser = new User( userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

    if(LoadUser.token){
      this.user.next(LoadUser);
      const expirationDuration =  new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogOut(expirationDuration);
    }
}


signOut(){
  return this.afAuth.signOut().then(()=>{
    localStorage.removeItem('UserSessionData');
    localStorage.removeItem('TotalDetails');
    this.user.next(null!);
    //this.user = JSON.parse(localStorage.getItem('token')!)
    this.router.navigate(['/login'], { skipLocationChange: true });
    if(this.tokenexpirationTimer){
      clearTimeout(this.tokenexpirationTimer);
    }
    this.tokenexpirationTimer = null;
  }, error => {
    this.toast.openError(error.message)
  });
}

autoLogOut(expirationDuration : number){
  this.tokenexpirationTimer = setTimeout(()=>{
    this.signOut();
  }, expirationDuration);
}

 handleAuthenication(email: string, uid: string, token: string, expiresIn:any){
  const exiprationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(email, uid, token, exiprationDate);
  this.user.next(user);
  localStorage.setItem('UserSessionData', JSON.stringify(user));
  console.log(email, uid, token, exiprationDate);
  }

}
