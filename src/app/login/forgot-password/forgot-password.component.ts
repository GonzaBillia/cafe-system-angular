import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { SnackbarService } from '../../services/snackbar.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Constants } from '../../globals/constants';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule, MatToolbarModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule, MatButtonModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit{

  forgotPassword:any = FormGroup
  responseMessage: any

  constructor(private formBuilder:FormBuilder,
    private userService:UserService,
    private snackbar:SnackbarService,
    private dialogRef:MatDialogRef<ForgotPasswordComponent>,
    private ngxService:NgxUiLoaderService) {}

  ngOnInit(): void {
    this.forgotPassword = this.formBuilder.group({
      email:[null, [Validators.required, Validators.pattern(Constants.emailRegex)]]
    })
  }

  submit(){
    this.ngxService.start()
    let formData = this.forgotPassword.value
    let data = {
      email: formData.email
    }
    this.userService.forgotPassword(data).subscribe((response:any) => {
      this.ngxService.stop()
      this.responseMessage = response?.message
      this.dialogRef.close()
      this.snackbar.openSnackbar(this.responseMessage, "")
      this.dialogRef.close()
    }, (error) => {
      this.ngxService.stop()
      if(error.error?.message) {
        this.responseMessage = error.error?.message
      } else {
        this.responseMessage = Constants.genericError
      }
      this.snackbar.openSnackbar(this.responseMessage, Constants.error)
    }
    )
  }
}
