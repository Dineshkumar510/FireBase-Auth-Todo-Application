import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  // email: string = '';
  // password: string = '';

  password:any;
  show:boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.password = 'password';
  }


  onSubmit(form:NgForm){
    if(!form.valid){
      return;
    } else{
      const email = form.value.email;
      const password = form.value.password;
      this.auth.Login(email, password).subscribe(data => {
        console.log(data);
      }, errorMessage => {
        console.log(errorMessage);
      });
      console.log(form.value);
      form.reset();
    }
  }

   onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }


}
