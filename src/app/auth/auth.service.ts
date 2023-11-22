import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject, Subject, catchError, tap, throwError } from 'rxjs';
import {User} from './user.model'
import { ToastserviceService } from '../toastservice.service';
import { HttpClient} from '@angular/common/http';

export interface AuthResponseData {
  kind: string;
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
    private tokenexpirationTimer : any;

  constructor(
    private router: Router,
    private toast : ToastserviceService,
    private http: HttpClient,
    ) {}



    authSignUpKey = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDTK-o70cL6j-G9HwLAnIK50z375P-Humk';

    authLoginKey = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDTK-o70cL6j-G9HwLAnIK50z375P-Humk';


    signUp(email: string, password: string){
        return this.http.post<AuthResponseData>(this.authSignUpKey,
          {
            email: email,
            password: password,
            returnSecureToken: true
          }
        ).pipe(catchError(errorRes => {
          let ErrorMessage = 'An Unknow error occurred';
          if(!errorRes.error || !errorRes.error.error){
            return throwError(ErrorMessage);
          }
            switch(errorRes.error.error.message) {
              case 'EMAIL_EXISTS':
                ErrorMessage = 'This Email is Already Exists';
                this.toast.openError(ErrorMessage);
                break;
              case 'INVALID_LOGIN_CREDENTIALS':
                ErrorMessage = 'Email Or PassWord does not match in the DataBase';
                this.toast.openError(ErrorMessage);
                break;
            }
            return throwError(ErrorMessage)
        }),
        tap(resData => {
          this.handleAuthenication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
        })
      );
    }



    Login(email: string, password: string) {
        return this.http.post<AuthResponseData>(this.authLoginKey,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      ).pipe(catchError(errorRes => {
        let ErrorMessage = 'An Unknow error occurred';
        if(!errorRes.error || !errorRes.error.error){
          return throwError(ErrorMessage);
        }
          switch(errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              ErrorMessage = 'This Email is Already Exists';
              this.toast.openError(ErrorMessage);
              break;
            case 'INVALID_LOGIN_CREDENTIALS':
              ErrorMessage = 'Email Or PassWord does not match in the DataBase';
              this.toast.openError(ErrorMessage);
              break;
          }
          return throwError(ErrorMessage)
      }),
      tap(resData => {
        this.handleAuthenication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        console.log(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        this.router.navigate(['/profile']);
      })
    );
  }




//   async Login(email:string, password:string) {
//     const result = this.afAuth.signInWithEmailAndPassword(email, password);
//     const user:any|null = (await result).user;
//       if(user){
//         user.getIdTokenResult().then(async (idTokenResult:any) => {
//           const expirationTime = idTokenResult.expirationTime;
//           var ElementTime = new Date(expirationTime).getTime();
//           this.handleAuthenication(user.email, user.uid, await user.getIdToken(), ElementTime)
//           console.log(user.email, user.uid,  await user.getIdToken(), ElementTime)
//           localStorage.setItem('UserSessionData', JSON.stringify(user))
//           this.router.navigate(['/profile']);
//           this.user.next(user);
//         });

//       }
//    }
//     catch (error:any) {
//     this.toast.openError(error.message);
//     this.router.navigate(['/login']);
//   }


// signUp(email: string, password: string){
//   this.afAuth.createUserWithEmailAndPassword(email, password).then(()=>{
//     alert("Registration Successfull");
//     this.router.navigate(['/login']);
//   }, err => {
//     this.toast.openError(err.message)
//     //alert(err.message);
//     this.router.navigate(['/register']);
//   })
// }


// Storing the User Session Data in Local Storage and retriving the User ib UserSessionData element
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
    if(this.user){
    localStorage.clear();
    this.user.next(null!);
    //this.user = JSON.parse(localStorage.getItem('token')!)
    this.router.navigate(['/login']);
    if(this.tokenexpirationTimer){
      clearTimeout(this.tokenexpirationTimer);
    }
    this.tokenexpirationTimer = null;
    }
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
    this.autoLogOut(expiresIn * 1000);
    localStorage.setItem('UserSessionData', JSON.stringify(user));
    console.log(email, uid, token, exiprationDate);
  }

}
