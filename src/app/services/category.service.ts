import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = environment.apiUrl

  constructor(private httpClient:HttpClient) { }

  get(){
    return this.httpClient.get(this.url+'/category/get')
  }
  add(data:any){
    return this.httpClient.post(this.url+'/category/add',data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  update(data:any){
    return this.httpClient.put(this.url+'/category/update',data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

}
