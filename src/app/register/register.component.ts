import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string = '';
  password: string = '';
  cfpassword : string = '';

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  register(){

  }

  OnRegister(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;
    const ConFirmPassword = form.value.confirmPassword;
    console.log(form.value);
    this.auth.signUp(email, password);
    form.reset();
  }

}
