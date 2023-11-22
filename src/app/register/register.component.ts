import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string = '';
  password: string = '';
  cfpassword : string = '';
  UserName:any = '';

  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  register(){

  }

  OnRegister(form: NgForm){
    if(!form.valid){
      return;
    }
    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.password;
    const ConFirmPassword = form.value.confirmPassword;
    console.log(form.value);
    this.UserName = localStorage.setItem('userName', name);
    this.auth.signUp(email, password).subscribe(resData =>{
      console.log(resData);
      this.router.navigate(['/login']);
    });

    form.reset();
  }

}
