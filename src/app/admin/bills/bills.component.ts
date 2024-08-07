import { Component, OnInit } from '@angular/core';
import { BillService } from '../../services/bill.service';
import { SnackbarService } from '../../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Constants } from '../../globals/constants';
import { ViewBillComponent } from '../../shared/Material-components/view-bill/view-bill.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ConfirmationComponent } from '../../shared/Material-components/Confirmation/confirmation.component';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-bills',
  standalone: true,
  imports: [MatTableModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatSelectModule, MatButtonModule, ReactiveFormsModule, MatInputModule, CommonModule],
  templateUrl: './bills.component.html',
  styleUrl: './bills.component.css'
})
export class BillsComponent implements OnInit {

  displayedColumns:string[] = ['id','name', 'email', 'contact_number', 'payment_method', 'total', 'view']
  dataSource:any
  responseMessage:any

  constructor(private bill:BillService,
    private snackbar:SnackbarService,
    private ngxService:NgxUiLoaderService,
    private dialog:MatDialog,
    private router:Router
  ){}

  ngOnInit(): void {
    this.ngxService.start()
    this.tableData()
  }

  tableData(){
    this.bill.getBills().subscribe((response:any)=>{
      this.ngxService.stop()
      this.dataSource = new MatTableDataSource(response.payload)
    }, (error)=>{
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

  handleViewAction(data:any){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.data = {
      data:data
    }
    dialogConfig.height = '700px'
    dialogConfig.width = '1250px'
    dialogConfig.maxWidth = '1250px'
    const dialogRef = this.dialog.open(ViewBillComponent, dialogConfig)
    this.router.events.subscribe(()=>{
      dialogRef.close()
    })
  }

  downloadReportAction(value:any){
    this.ngxService.start()
    let data = {
      name:value.name,
      uuid:value.uuid,
      email:value.email,
      contact_number:value.contact_number,
      payment_method:value.payment_method,
      total:value.total,
      product_details:value.product_details
    }
    this.bill.getPDF(data).subscribe((response:any)=>{
      saveAs(response, value.uuid + '.pdf')
      this.ngxService.stop()
    }, (error)=>{
      this.ngxService.stop()
      if(error.error?.message){
        this.responseMessage = error.error?.message
      }else{
        this.responseMessage = Constants.genericError
      }
      this.snackbar.openSnackbar(this.responseMessage, "error")
    })
  }

  handleDeleteAction(data:any){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.data = {
      message: 'delete bill ID: ' + data.id + '?',
    }
    dialogConfig.width = '550px'
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig)
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((res)=>{
      this.ngxService.start()
      this.deleteBill(data.id)
      dialogRef.close()
    })
  }

  deleteBill(id:any){
    this.bill.delete(id).subscribe((response:any)=>{
      this.ngxService.stop()
      this.tableData()
      this.responseMessage = response?.message
      this.snackbar.openSnackbar(this.responseMessage, "success")
    }, (error)=>{
      this.ngxService.stop()
      if(error.error?.message){
        this.responseMessage = error.error?.message
      }else{
        this.responseMessage = Constants.genericError
      }
      this.snackbar.openSnackbar(this.responseMessage, "error")
    })
  }
}
