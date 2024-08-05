import { Inject, Injectable, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import  { jwtDecode }  from 'jwt-decode';
import { Constants } from '../globals/constants';


@Injectable({
  providedIn: 'root'
})
export class RouteGuardService { 

  constructor(@Inject(PLATFORM_ID) platformId: Object,
    public auth:AuthService,
    public router:Router,
    private snackbar:SnackbarService,
  ) {  }


  canActivate(router:ActivatedRouteSnapshot):boolean{

    let expectedRoleArray = router.data
    expectedRoleArray = expectedRoleArray["expectedRole"]

    const token:any = localStorage.getItem('token')
    let tokenPayload:any

    try{
      tokenPayload = jwtDecode(token)
    } catch (error) {
      this.router.navigate(['/'])
      localStorage.clear()
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
      localStorage.clear()
      return false
    }
  }
}
