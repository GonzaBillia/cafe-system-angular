import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../../services/snackbar.service';
import { Constants } from '../../globals/constants';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [MatToolbarModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, CommonModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit{
  changepasswordForm:any = FormGroup
  responseMessage: any

  constructor(private form:FormBuilder,
    private userService:UserService,
    public dialogRef:MatDialogRef<ChangePasswordComponent>,
    private ngxService:NgxUiLoaderService,
    private snackbar:SnackbarService
  ) { }
  
  ngOnInit(): void {
    this.changepasswordForm = this.form.group({
      oldPassword:[null, [Validators.required]],
      newPassword:[null, [Validators.required]],
      confirmPassword:[null, [Validators.required]]
    })
  }

  validateSubmit(){
    if(this.changepasswordForm.controls['newPassword'].value != this.changepasswordForm.controls['confirmPassword'].value){
      return true
    } else {
      return false
    }
  }

  handleChangePasswordSubmit(){
    this.ngxService.start()
    let formData = this.changepasswordForm.value
    let data = {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword
    }
    this.userService.changePassword(data).subscribe((res:any) => {
      this.ngxService.stop()
      this.responseMessage = res?.message
      this.dialogRef.close()
      this.snackbar.openSnackbar(this.responseMessage, "success")
    }, (error) => {
      this.ngxService.stop()
      if(error.error?.message) {
        this.responseMessage = error.error?.message
      } else {
        this.responseMessage = Constants.genericError
      }
      this.snackbar.openSnackbar(this.responseMessage, Constants.error)
    })
  }
}
