import { Routes } from '@angular/router';
import { StartComponent } from './start/start.component';
import { SignupComponent } from './signup/signup.component';
import { RouteGuardService } from '../services/route-guard.service';


export const LOGIN_ROUTES: Routes = [
  {
    path: '', component: StartComponent,
    canActivate: [RouteGuardService],
    data: {
      expectedRole: ['admin' || 'user']
    }
  }
]