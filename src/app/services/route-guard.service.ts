import { afterRender, Inject, Injectable, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import  { jwtDecode }  from 'jwt-decode';
import { Constants } from '../globals/constants';
import { isPlatformBrowser } from '@angular/common';
import { BrowserStorageService } from './browser-storage.service';


@Injectable({
  providedIn: 'root'
})
export class RouteGuardService{ 

  constructor(
    public auth:AuthService,
    public router:Router,
    private snackbar:SnackbarService,
    private storage: BrowserStorageService
  ) {

  }


  canActivate(router:ActivatedRouteSnapshot):boolean{

    const expectedRoleArrayData = router.data
    let expectedRoleArray = expectedRoleArrayData["expectedRole"]

    const token:any = this.storage.get('token')
    let tokenPayload:any

    try{
      tokenPayload = jwtDecode(token)
      
    } catch (error) {
      this.router.navigate(['/'])
      this.storage.clear()
      console.log("no puede hacer decode de token", tokenPayload);
      return false
      
    }

    let checkRole = false

    for (let i = 0; i < expectedRoleArray["length"]; i++) {
      if(expectedRoleArray[i] == tokenPayload.role){
        checkRole = true
      }
    }

    if(tokenPayload.role == 'user' || tokenPayload.role == 'admin'){
      if(this.auth.isAuthenticated() && checkRole){
        return true
      }
      this.snackbar.openSnackbar(Constants.unauthorized, Constants.error)
      this.router.navigate(['/dashboard/home'])
      return false
    } else {
      this.router.navigate(['/'])
      this.storage.clear()
      return false
    }
  }
}
