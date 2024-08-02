import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard', loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)
  }
];
