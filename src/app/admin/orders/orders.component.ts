import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { SnackbarService } from '../../services/snackbar.service';
import { BillService } from '../../services/bill.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Constants } from '../../globals/constants';
import { saveAs } from 'file-saver';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [MatTableModule, MatCardModule, MatFormFieldModule, MatIconModule, MatSelectModule, MatButtonModule, ReactiveFormsModule, MatInputModule, CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit{

  displayedColumns:string[] = ['title', 'category', 'price', 'quantity', 'total', 'edit']
  dataSource:any = []
  manageOrder: any = FormGroup
  categories:any = []
  products:any = []
  price:any
  total:number = 0
  responseMessage:any

  constructor(private formBuilder:FormBuilder,
    private category:CategoryService,
    private product:ProductService,
    private snackbar:SnackbarService,
    private bill:BillService,
    private ngxService:NgxUiLoaderService){}

    ngOnInit(): void {
      this.ngxService.start()
      this.manageOrder = this.formBuilder.group({
        name: [null, [Validators.required, Validators.pattern(Constants.nameRegex)]],
        email: [null, [Validators.required, Validators.pattern(Constants.emailRegex)]],
        contact_number: [null, [Validators.required, Validators.pattern(Constants.phoneRegex)]],
        payment_method: [null, [Validators.required]],
        product: [null, [Validators.required]],
        category: [null, [Validators.required]],
        quantity: [null, [Validators.required, Validators.min(1)]],
        total: [0, [Validators.required]],
        price: [null, [Validators.required]]
      })

      this.getCategories()
    }

    getCategories(){
      this.category.get().subscribe((response:any)=>{
        this.ngxService.stop()
        this.categories = response.payload
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

    getProductsByCategory(value:any){
      this.product.getByCategory(value.id).subscribe((response:any)=>{
        this.products = response.payload
        this.manageOrder.controls['price'].setValue('')
        this.manageOrder.controls['quantity'].setValue('')
        this.manageOrder.controls['total'].setValue(0)
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

    getProductDetails(value:any){
      this.product.getById(value.id).subscribe((response:any)=>{
        this.price = response.payload[0].price
        
        this.manageOrder.controls['price'].setValue(response.payload[0].price)
        this.manageOrder.controls['quantity'].setValue('1')
        this.manageOrder.controls['total'].setValue(this.price * 1)
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

    setQuantity(value:any){
      let temp = this.manageOrder.controls['quantity'].value
      if(temp > 0){
        this.manageOrder.controls['total'].setValue(this.manageOrder.controls['quantity'].value * this.manageOrder.controls['price'].value)
      }else if(temp != ''){
        this.manageOrder.controls['quantity'].setValue('1')
        this.manageOrder.controls['total'].setValue(this.manageOrder.controls['quantity'].value * this.manageOrder.controls['price'].value)
      }
    }

    validateProductAdd(){
      if(this.manageOrder.controls['total'].value == 0 || this.manageOrder.controls['total'].value === null || this.manageOrder.controls['quantity'].value <= 0){
        return true
        
      } else {
        return false
      }
    }

    validateSubmit(){
      if(this.total === 0 || this.manageOrder.controls['name'].value === null || this.manageOrder.controls['email'].value === null || this.manageOrder.controls['contact_number'].value === null || this.manageOrder.controls['payment_method'].value === null || !(this.manageOrder.controls['contact_number'].valid) || !(this.manageOrder.controls['email'].valid)){
        return true
      } else {
        return false
      }
    }

    add(){
      let formData = this.manageOrder.value
      let prdouctName = this.dataSource.find((e:{id:number}) => e.id == formData.product.id)
      if(prdouctName === undefined){
        this.total = this.total + (formData.total)
        this.dataSource.push({id:formData.product.id, title:formData.product.title, category:formData.category.name, quantity:formData.quantity, price:formData.price, total:(formData.total)})
        this.dataSource = [...this.dataSource]
        this.snackbar.openSnackbar(Constants.productAdded, "success")
      } else {
        this.snackbar.openSnackbar(Constants.productExistError, Constants.error)
      }
    }

    handleDeleteAction(value:any, element:any){
      this.total = this.total - element.total
      this.dataSource.splice(value,1)
      this.dataSource = [...this.dataSource]
    }

    submitAction(){
      let formData = this.manageOrder.value
      let data = {
        name: formData.name,
        email: formData.email,
        contact_number: formData.contact_number,
        payment_method: formData.payment_method,
        total: this.total,
        product_details: JSON.stringify(this.dataSource),
      }
      
      this.bill.generateReport(data).subscribe((response:any)=>{
        this.downloadFile(response?.payload.uuid)
        this.manageOrder.reset()
        this.dataSource = []
        this.total = 0
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

    downloadFile(filename:any){
      let data = {
        uuid:filename
      }
      this.bill.getPDF(data).subscribe((response:any)=>{
        saveAs(new Blob([response],{type:"application/pdf"}), filename+".pdf")
        this.ngxService.stop()
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
