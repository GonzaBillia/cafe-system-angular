import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../../services/product.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { CategoryService } from '../../../services/category.service';
import { Constants } from '../../../globals/constants';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatDialogModule, MatInputModule, MatSelectModule, CommonModule, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

  onAddProduct = new EventEmitter()
  onEditProduct = new EventEmitter()
  productForm:any = FormGroup
  dialogAction:any = "Add"
  action:any = "Add"
  responseMessage:any
  categories:any = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData:any,
    private formBuilder:FormBuilder,
    private product:ProductService,
    public dialogRef:MatDialogRef<ProductComponent>,
    private snackbar:SnackbarService,
    private category:CategoryService
  ){}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      title:[null, [Validators.required, Validators.pattern(Constants.nameRegex)]],
      category_id:[null, [Validators.required]],
      price:[null, [Validators.required]],
      description:[null, [Validators.required]],
      stock:[null, [Validators.required]],
      code:[null, [Validators.required]]
    })

    if(this.dialogData.action === "Edit"){
      this.dialogAction = "Edit"
      this.action = "Update"
      this.productForm.patchValue(this.dialogData.data)
    }
    this.getCategories()
  }

  getCategories(){
    this.category.get().subscribe((response:any)=>{
      this.categories = response.payload
    }, (error)=>{
      if(error.error?.message){
        this.responseMessage = error.error?.message
      }else{
        this.responseMessage = Constants.genericError
      }
      this.snackbar.openSnackbar(this.responseMessage, Constants.error)
    })
  }

  handleSubmit(){
    if(this.dialogAction === "Edit"){
      this.edit()
    }else{
      this.add()
    }
  }

  add(){
    let formData = this.productForm.value
    let data = {
      title: formData.title,
      category_id: formData.category_id,
      price: formData.price,
      description: formData.description,
      stock: formData.stock,
      code: formData.code
    }
    this.product.add(data).subscribe((res:any)=>{
      this.dialogRef.close()
      this.onAddProduct.emit()
      this.responseMessage = res.message
      this.snackbar.openSnackbar(this.responseMessage, "success")
    }, (error)=>{
      if(error.error?.message){
        this.responseMessage = error.error?.message
      }else{
        this.responseMessage = Constants.genericError
      }
      this.snackbar.openSnackbar(this.responseMessage, Constants.error)
    })
  }

  edit(){
    let formData = this.productForm.value
    let data = {
      id: this.dialogData.data.id,
      title: formData.title,
      category_id: formData.category_id,
      price: formData.price,
      description: formData.description,
      stock: formData.stock,
      code: formData.code
    }
    this.product.update(data.id,data).subscribe((res:any)=>{
      this.dialogRef.close()
      this.onEditProduct.emit()
      this.responseMessage = res.message
      this.snackbar.openSnackbar(this.responseMessage, "success")
    }, (error)=>{
      if(error.error?.message){
        this.responseMessage = error.error?.message
      }else{
        this.responseMessage = Constants.genericError
      }
      this.snackbar.openSnackbar(this.responseMessage, Constants.error)
    })
  }
}
