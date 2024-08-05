import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserStorageService } from './browser-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router, private storage:BrowserStorageService) { }

  public isAuthenticated(): boolean{
    const token = this.storage.get('token')
    if(!token) {
      this.router.navigate(['/'])
      return false
    } else {
      return true
    }
  }
}
