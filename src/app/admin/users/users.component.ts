import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from '../../services/user.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Constants } from '../../globals/constants';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatTableModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatSelectModule, MatButtonModule, ReactiveFormsModule, MatInputModule, CommonModule, MatSlideToggleModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{

  displayedColumns: string[] = ['name', 'email', 'contact_number', 'status']
  dataSource:any
  responseMessage:any

  constructor(private ngxService:NgxUiLoaderService,
    private user:UserService,
    private snackbar:SnackbarService
  ) { }

  ngOnInit(): void {
    this.ngxService.start()
    this.tableData()
  }

  tableData(){
    this.user.getUsers().subscribe((response:any)=>{
      this.ngxService.stop()
      this.dataSource = new MatTableDataSource(response.payload)
    },(error:any)=>{
      this.ngxService.stop()
      if(error.error?.message){
        this.responseMessage = error.error?.message
      }else{
        this.responseMessage = Constants.genericError
    }
      this.snackbar.openSnackbar(this.responseMessage, Constants.error)
    })
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  handleChangeAction(status:any, id:any){    
    this.ngxService.start()
    var data = {
      status: status.toString(),
      id:id
    }
    this.user.updateStatus(data).subscribe((response:any)=>{
      this.ngxService.stop()
      this.responseMessage = response?.message
      this.snackbar.openSnackbar(this.responseMessage, "success")
      this.tableData()
    },(error:any)=>{
      this.ngxService.stop()
      if(error.error?.message){
        this.responseMessage = error.error?.message
      }else{
        this.responseMessage = Constants.genericError
    }
      this.snackbar.openSnackbar(this.responseMessage, Constants.error)
    })
  }
}
