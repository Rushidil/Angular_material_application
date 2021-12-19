import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../users/list-users/list-users.component';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  baseUrl: string = 'https://reqres.in/';
  constructor(private http: HttpClient) { }

  listUsers(): Observable<User[]>{
     return this.http.get<User[]>(this.baseUrl + 'users?page=2')

  }

  viewuser(id: string){
    return this.http.get(this.baseUrl + 'api/users/' + id);

  }

  addUser(userObj:any){

    return this.http.post(this.baseUrl + 'api/users', userObj);
  }

  deleteUser(id: any){
    return this.http.delete(this.baseUrl + 'api/users/' + id);

  }
  updateUser(id: any,userObj:any){
    return this.http.put(this.baseUrl + 'api/users/' +id, userObj);
  }
}
