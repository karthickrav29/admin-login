import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {
  httpClient: any;
  private baseUrl = "http://localhost:9994/api/v1/user";
  private loginUrl = "http://localhost:9994/api/v1/login";
  private searchUrl = "http://localhost:9994/api/v1/user/search";

  constructor(private http: HttpClient ) {}


  getUserList() : Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`)
  }

  register(data: any) {
    return this.http.post(`${this.baseUrl}`,data);
  }

  login(logindata:any):any {
    return this.http.post(`${this.loginUrl}`,logindata);
  }

  deleteUser(num:any){
    return this.http.delete(`${this.baseUrl}/${num}`);
  }

  updateUser(num:any,data:any){
    return this.http.put(`${this.baseUrl}/${num}`,data);
  }

  searchQuery(query:any){
    return this.http.get(`${this.searchUrl}?query=${query}`);
  }
  

  getallData(){
    return this.http.get<any>("http://localhost:3000/user");
  }

  getuserData(){
    return this.http.get<any>("http://localhost:3000/user");
  }

  getAdminUser(username:any, password:any, isAdmin:any){
    return this.http.get<any>("http://localhost:3000/user/?username="+username+"&password="+password+"&isAdmin="+isAdmin)
  }



  addData(data:any){
    return this.http.post<any>("http://localhost:3000/user",data);
  }



}

