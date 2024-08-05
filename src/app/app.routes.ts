import { Routes } from '@angular/router';
import { RouteGuardService } from './services/route-guard.service';

export const routes: Routes = [
  {
    path: 'dashboard', loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES),
  },
  {
    path: '', loadChildren: () => import('./login/login.routes').then(m => m.LOGIN_ROUTES),
  },
];
