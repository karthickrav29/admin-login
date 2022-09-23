import { NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ExampleService } from '../example.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string | undefined;
  password: string | undefined;
  constructor(private apiservice: ExampleService, private router: Router, private ToastService: NgToastService) { }

  ngOnInit(): void {
   
  }
  loginForm = new FormGroup({
    username: new FormControl("",[Validators.required]),
    password: new FormControl("",[Validators.required]),
 });

 login(){
  let user= this.loginForm.value.username;
  let pass= this.loginForm.value.password;
  localStorage.setItem("username",user);
  localStorage.setItem("password",pass);
  this.apiservice.login(user, pass).subscribe((data: any) =>{
    if(data.length == 1){
      localStorage.setItem("isUserLoggedIn","true");
      this.router.navigate(['/user']);
      this.ToastService.success({detail:"Success Message",summary:"Login Successful",duration:2000});
      
    }else{
      this.ToastService.error({detail:"Login Failed",summary:"Incorrect Username or Password",duration:2000});
    }
  });
  
 }

 redirect(){
  this.router.navigate(['/register']);
 }
}
