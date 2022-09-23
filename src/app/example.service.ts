import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {
  httpClient: any;

  constructor(private http: HttpClient ) {}

  register(data:any){
    return this.http.post<any>("http://localhost:3000/user",data);
  }

  login(username:any, password:any){
    return this.http.get<any>("http://localhost:3000/user/?username="+username+"&password="+password);
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

// searchQuery(query:any){
//   return this.http.get<any>("http://localhost:3000/profile/?email_like="+query+"|firstname_like="+query+"|lastname_like="+query);
// }

deleteUser(num:any){
  return this.http.delete<any>("http://localhost:3000/user/"+num);
}

updateUser(num:any,data:any){
  return this.http.put<any>("http://localhost:3000/user/"+num,data);
}

}
