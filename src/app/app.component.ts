import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  isAuthenticated:boolean = false;
  private userSub: Subscription;

constructor(private auth: AuthService){
}



ngOnInit(): void {
  this.userSub = this.auth.user.subscribe(user => {
    this.isAuthenticated = !user ? false : true
  })
}

    signOut(){
      this.auth.signOut();
    }


ngOnDestroy(): void {
  this.userSub.unsubscribe();
}

}
