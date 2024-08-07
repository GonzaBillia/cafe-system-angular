import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  url = environment.apiUrl;

  constructor(private httpClient:HttpClient) { }

  get(){
    return this.httpClient.get(this.url+'/product/get')
  }

  getByCategory(id:any){
    return this.httpClient.get(this.url+'/product/getByCategory/'+ id)
  }

  getById(id:any){
    return this.httpClient.get(this.url+'/product/getById/'+ id)
  }

  add(data:any){
    return this.httpClient.post(this.url+'/product/add',data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  update(id:any,data:any){
    return this.httpClient.put(this.url+'/product/update/'+ id,data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  updateStatus(id:any,data:any){
    return this.httpClient.patch(this.url+'/product/updateStatus/'+ id,data,{
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }

  delete(id:any){
    return this.httpClient.delete(this.url+'/product/delete/'+ id, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
  }
}
