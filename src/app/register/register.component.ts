import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExampleService } from '../example.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  selectfiles: any;

  constructor(private apiservice : ExampleService, private router:Router, private ToastService: NgToastService ) { }

  ngOnInit(): void {
  }
  registerForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    firstname: new FormControl('',[Validators.required]),
    lastname: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required , Validators.minLength(5)]),
    confirmpassword : new FormControl('',[Validators.required]),
    isAdmin: new FormControl('') 
  });


  register(){
    if(this.registerForm.value.isAdmin == ""){
      this.registerForm.value.isAdmin = false
    }
    this.apiservice.register(this.registerForm.value).subscribe(data =>{
      
    
    });
    this.ToastService.success({detail:"Success Message",summary:"Register Successful",duration:2000});
    setTimeout(() =>{
      this.router.navigate(['/login']);
    },2000);
  }

  onFileSelected(event:any){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
    this.selectfiles = reader.result;
  }
}

  redirect(){
    this.router.navigate(['/login']);
   }
}
