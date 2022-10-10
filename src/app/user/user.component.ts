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
  userData:any;
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  username:any;
  password:any;
  isAdmin:boolean = false;
  adminUser :boolean = false;
  parseData : any;
  usersData : any;
  parserData : any;


  constructor(private router : Router,
              private ToastService: NgToastService,
              private apiservice: ExampleService,
              private route: ActivatedRoute,) {
                

               }

  ngOnInit(): void {
    this.userData = localStorage.getItem("userData");
    this.parseData = JSON.parse(this.userData);
    this.username = this.parseData.username;
    this.password = this.parseData.password;
    this.isAdmin = this.parseData.admin;
    if (this.parseData.admin == false){
      this.adminUser = true;
    }
    this.getUser();

  }

  profileForm = new FormGroup({
    user_id: new FormControl(''),
    username : new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    admin : new FormControl(''),
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


  getUser(){
    this.apiservice.getUserList().subscribe(data => {
      this.tableData = data;
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


  deleteUser(num:number){
   
    this.apiservice.deleteUser(num).subscribe((data: any) => {
      this.closePopup();
      this.ToastService.success({detail:"Success Message",summary:"User Deleted Successfully",duration:2000});
      this.getUser();
     
    })

  }

  updateUser(num:any){
    localStorage.setItem("oneUser", JSON.stringify(num));
    this.displayReg = "block";
    for(this.userid of this.tableData){
      if(this.userid.id == num.id){
        this.profileForm = new FormGroup({
          username : new FormControl(this.userid.username),
          firstname: new FormControl(this.userid.firstname),
          lastname: new FormControl(this.userid.lastname),
          email: new FormControl(this.userid.email),
          admin : new FormControl(this.userid.admin),
          password : new FormControl(this.userid.password),
          confirmpassword : new FormControl(this.userid.confirmpassword)
        })
      }
    }
  }

  update(){
    for(this.userid of this.tableData){
      this.usersData = localStorage.getItem("oneUser");
    this.parserData = JSON.parse(this.usersData);
      if(this.userid.id == this.parserData.id){
            this.closePopup();
            this.apiservice.updateUser(this.parserData.id,this.profileForm.value).subscribe(data => {
              this.ToastService.success({detail:"Success Message",summary:"Data Updated Successfully",duration:2000});
              this.getUser();
              })
        }
    }
    
    
  }


}