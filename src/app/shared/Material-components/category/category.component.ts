import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../../services/category.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { Constants } from '../../../globals/constants';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatDialogModule, MatInputModule, MatSelectModule, CommonModule, ReactiveFormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{

  onAddCategory = new EventEmitter()
  onEditCategory = new EventEmitter()
  categoryFrom:any = FormGroup
  dialogAction:any = "Add"
  action:any = "Add"
  responseMessage:any
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
    private formBuilder:FormBuilder,
    private category:CategoryService,
    public dialogRef:MatDialogRef<CategoryComponent>,
    private snackbar:SnackbarService
    ){}

  ngOnInit(): void {
    this.categoryFrom = this.formBuilder.group({
      name:[null, [Validators.required]]
    })
    if(this.dialogData.action === "Edit"){
      this.dialogAction = "Edit"
      this.action = "Update"
      this.categoryFrom.patchValue(this.dialogData.data)
    }
  }

  handleSubmit(){
    if(this.dialogAction === "Edit"){
      this.edit()
    }else{
      this.add()
    }
  }

  add(){
    let formData = this.categoryFrom.value
    let data = {
      name: formData.name
    }
    this.category.add(data).subscribe((res:any)=>{
      this.dialogRef.close()
      this.onAddCategory.emit()
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
    let formData = this.categoryFrom.value
    let data = {
      id: this.dialogData.data.id,
      name: formData.name
    }
    this.category.update(data).subscribe((res:any)=>{
      this.dialogRef.close()
      this.onEditCategory.emit()
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
