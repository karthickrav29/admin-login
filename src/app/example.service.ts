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


  constructor(private http: HttpClient ) {}


  getUserList() : Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`)
  }

  register(data: any) {
    // return this.http.post<any>("http://localhost:3000/user", data);
    return this.http.post(`${this.baseUrl}`,data);
  }

  login(logindata:any):any {
    return this.http.post(`${this.loginUrl}`,logindata);
    // return this.http.get<any>("http://localhost:3000/user/?username=" + username + "&password=" + password);
    
  }
  
  // register(data:any){
  //   return this.http.post<any>("http://localhost:3000/user",data);
  // }

  // login(username:any, password:any){
  //   return this.http.get<any>("http://localhost:3000/user/?username="+username+"&password="+password);
  // }
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

// searchQuery(query:any){
//   return this.http.get<any>("http://localhost:3000/profile/?email_like="+query+"|firstname_like="+query+"|lastname_like="+query);
// }

deleteUser(num:any){
  return this.http.delete(`${this.baseUrl}/${num}`);
  // return this.http.delete<any>("http://localhost:3000/user/"+num);
}

updateUser(num:any,data:any){
  return this.http.put(`${this.baseUrl}/${num}`,data);
  // return this.http.put<any>("http://localhost:3000/user/"+num,data);
}

}
