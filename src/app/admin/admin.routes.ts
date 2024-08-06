import { Routes } from "@angular/router";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProductsComponent } from "./products/products.component";
import { CategoriesComponent } from "./categories/categories.component";
import { BillsComponent } from "./bills/bills.component";
import { RouteGuardService } from "../services/route-guard.service";

export const ADMIN_ROUTES: Routes = [
  {
    path: '', component: AdminLayoutComponent,
    children: [
      { path: 'home', component: DashboardComponent},
      { path: 'product', component: ProductsComponent,
        canActivate: [RouteGuardService],
        data: {
          expectedRole: ['admin']
        }
      },
      { path: 'category', component: CategoriesComponent,
        canActivate: [RouteGuardService],
        data: {
          expectedRole: ['admin']
        }
      },
      { path: 'bill', component: BillsComponent },

      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '*', redirectTo: 'home', pathMatch: 'full' }
      
    ],
  }
]