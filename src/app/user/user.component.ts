import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ExampleService } from '../example.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  selectfiles: any;
  tableData: any;
  newObj: any;
  id: any;
  newObjs: any;

  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  username:any;
  password:any;
  isAdmin:boolean = false;
  adminUser :boolean = false;
  
  constructor(private router : Router,
              private ToastService: NgToastService,
              private apiservice: ExampleService,
              private route: ActivatedRoute,) {
                

               }

  ngOnInit(): void {
    this.username = localStorage.getItem("username");
    this.password = localStorage.getItem("password");

    this.apiservice.getAdminUser(this.username, this.password,this.isAdmin).subscribe((data: any) =>{
      if(data.length == 0){
        this.adminUser = true;
      }
    });
    this.getUser();

  }

  profileForm = new FormGroup({
    user_id: new FormControl(''),
    username : new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    organization: new FormControl(''),
    email: new FormControl(''),
    image: new FormControl(''),
    isAdmin : new FormControl(''),
    password : new FormControl(''),
    confirmpassword : new FormControl('')
  })
  
  userid:any;
  newname:any;
  newData:any;
  getuser:any;
  name:any;
  mail:any;
  profile:any;
  showModalBox: boolean = false;
  displayStyle = "none";
  displayReg = "none";
  searchValue:any;
  searchForm = new FormGroup({
    query : new FormControl('')
  })
  

  getData(){
    this.apiservice.getallData().subscribe(data => {
      this.getuser = data;
    });
  }

  getUser(){
    this.apiservice.getuserData().subscribe(data => {
      this.POSTS = data;
      this.tableData = data;
      this.profileForm.reset();
    })
  }


  onTableDataChange(event: any) {
    this.page = event;
    this.getUser();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.getUser();
  }

  onFileSelected(event:any){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
    this.selectfiles = reader.result;
  }
}
  

  logout(){
    this.router.navigate(['/home']);
    this.ToastService.success({detail:"Success Message",summary:"Logout Successful",duration:2000});
    localStorage.setItem("isUserLoggedIn","false");
  }

  popup(num:number){
    this.displayStyle = "block";
    this.name = num;
    
  }

  closePopup() {
    this.displayReg= "none";
    this.displayStyle = "none";
  }


  // searchQuery(){
  //   this.searchValue = this.searchForm.value.query;
  //   this.searchValue = this.searchValue.trim();
  //   this.apiservice.searchQuery(this.searchValue).subscribe(newData => {
     
  //     this.tableData = newData;
  //   })
  // }

  deleteUser(num:number){
   
    this.apiservice.deleteUser(num).subscribe((data: any) => {
      this.closePopup();
      this.ToastService.success({detail:"Success Message",summary:"User Deleted Successfully",duration:2000});
      this.getUser();
     
    })

  }

  updateUser(num:any){
    this.displayReg = "block";
    for(this.userid of this.tableData){
      if(this.userid.id == num.id){
        this.profileForm.patchValue({
          user_id:num.id,
          firstname: num.firstname,
          lastname: num.lastname,
          organization: num.organization,
          email: num.email,
          password : num.password,
          isAdmin : num.isAdmin,
          username : num.username,
          confirmpassword: num.confirmpassword
        })
      }
    }
  }

  update(){
    for(this.userid of this.tableData){
      if(this.userid.id == this.profileForm.value.user_id){
            this.closePopup();
            this.apiservice.updateUser(this.userid.id,this.profileForm.value).subscribe(data => {
              this.ToastService.success({detail:"Success Message",summary:"Data Updated Successfully",duration:2000});
              this.getUser();
              })
        }
    }
    
    
  }

  registerUser(){
    this.apiservice.addData(this.profileForm.value).subscribe(data =>{
      this.getUser();
      this.ToastService.success({detail:"Success Message",summary:"Data Added Successfully",duration:2000});
    });
  }


}