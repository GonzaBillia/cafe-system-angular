import { Routes } from "@angular/router";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProductsComponent } from "./products/products.component";

export const ADMIN_ROUTES: Routes = [
  {
    path: '', component: AdminLayoutComponent,
    children: [
      { path: 'home', component: DashboardComponent},
      { path: 'product', component: ProductsComponent }
    ],
  }
]