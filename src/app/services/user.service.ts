import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.apiUrl

  constructor(private httpClient:HttpClient) { }

  signup(data:any){
    return this.httpClient.post(this.url+'/user/signup',data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  signin(data:any){
    return this.httpClient.post(this.url+'/user/signin',data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  forgotPassword(data:any){
    return this.httpClient.post(this.url+'/user/forgotpassword',data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  checkToken(){
    return this.httpClient.get(this.url+'/user/checkToken')
  }

  changePassword(data:any){
    return this.httpClient.post(this.url+'/user/changePassword',data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  getUsers(){
    return this.httpClient.get(this.url+'/user/get')
  }

  update(data:any){
    return this.httpClient.put(this.url+'/user/update',data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  updateStatus(data:any){
    return this.httpClient.patch(this.url+'/user/updateStatus',data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

}
