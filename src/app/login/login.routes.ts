import { Routes } from '@angular/router';
import { StartComponent } from './start/start.component';
import { SignupComponent } from './signup/signup.component';


export const LOGIN_ROUTES: Routes = [
  {
    path: '', component: StartComponent, children: [
      { path: 'signup', component: SignupComponent }
    ]
  }
]