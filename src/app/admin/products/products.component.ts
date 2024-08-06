import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';
import { Constants } from '../../globals/constants';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProductComponent } from '../../shared/Material-components/product/product.component';
import { ConfirmationComponent } from '../../shared/Material-components/Confirmation/confirmation.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatTableModule, MatSlideToggleModule, MatCardModule, MatFormFieldModule, MatIconModule, MatSelectModule, MatButtonModule, ReactiveFormsModule, MatInputModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  displayedColumns:string[] = ['name', 'category','description', 'price', 'edit']
  dataSource:any
  responseMessage:any

  constructor(private product:ProductService,
    private ngxService:NgxUiLoaderService,
    private dialog:MatDialog,
    private snackbar:SnackbarService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.ngxService.start()
    this.tableData()
  }

  tableData(){
    this.product.get().subscribe((response:any)=>{
      this.ngxService.stop()
      
      this.dataSource = new MatTableDataSource(response.payload)
    },(error)=>{
      this.ngxService.stop()
      if(error.error?.message){
        this.responseMessage = error.error?.message
      }else{
        this.responseMessage = Constants.genericError
      }
      this.snackbar.openSnackbar(this.responseMessage, Constants.error)
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction(){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.data = {
      action: 'Add'
    }
    dialogConfig.width = "850px"
    const dialogRef = this.dialog.open(ProductComponent, dialogConfig)
    this.router.events.subscribe(()=>{
      dialogRef.close()
    })
    const sub = dialogRef.componentInstance.onAddProduct.subscribe(()=>{
      this.tableData()
    })
  }

  handleEditAction(element:any){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.data = {
      action: 'Edit',
      data:element
    }
    dialogConfig.width = "850px"
    const dialogRef = this.dialog.open(ProductComponent, dialogConfig)
    this.router.events.subscribe(()=>{
      dialogRef.close()
    })
    const sub = dialogRef.componentInstance.onEditProduct.subscribe(()=>{
      this.tableData()
    })
  }

  deleteProduct(id:any){
    this.product.delete(id).subscribe((response:any)=>{
      this.ngxService.stop()
      this.tableData()
      this.responseMessage = response.message
      this.snackbar.openSnackbar(this.responseMessage, "success")
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

  handleDeleteAction(element:any){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '550px'
    dialogConfig.height = '150px'
    dialogConfig.data = {
      message: 'delete '+element.title
    }
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig)
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe(()=>{
      this.ngxService.start()
      this.deleteProduct(element.id)
      dialogRef.close()
    })
  }

  onChange(status:any, id:any){
    let data = {
      status: status.toString(),
      id:id
    }
    this.product.updateStatus(data.id, data).subscribe((response:any)=>{
      this.ngxService.stop()
      this.responseMessage = response.message
      this.snackbar.openSnackbar(this.responseMessage, "success")
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
}
