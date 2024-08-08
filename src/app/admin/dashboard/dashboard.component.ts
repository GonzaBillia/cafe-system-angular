import { Component } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../../services/snackbar.service';
import { Constants } from '../../globals/constants';
import { MatCardModule } from '@angular/material/card'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  responseMessage:any
  data:any

  constructor(private dashboardService:DashboardService,
    private ngxService:NgxUiLoaderService,
    private snackbar:SnackbarService
  ){
    
    this.ngxService.start()
    this.dashboardData()
  }

  dashboardData(){
    this.dashboardService.getDetails().subscribe((response:any) => {
      this.ngxService.stop()
      this.data = response      
    }, (error:any) =>{
      this.ngxService.stop()
      console.log(error)
      if(error.error?.message){
        this.responseMessage = error.error?.message
      } else {
        this.responseMessage = Constants.genericError
      }
      this.snackbar.openSnackbar(this.responseMessage, Constants.error)
    })
  }
}
