import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SnackbarService } from '../../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Constants } from '../../globals/constants';
import { BrowserStorageService } from '../../services/browser-storage.service';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, MatToolbarModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule, MatButtonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit {

  loginForm:any = FormGroup
  responseMessage:any

  constructor(private form:FormBuilder,
    private router:Router,
    private userService:UserService,
    private snackbar:SnackbarService,
    private dialogRef:MatDialogRef<SigninComponent>,
    private ngxService:NgxUiLoaderService,
    private storage:BrowserStorageService
  ){}

  ngOnInit(): void {
    this.loginForm = this.form.group({
      email: [null, [Validators.required, Validators.pattern(Constants.emailRegex)]],
      password: [null, [Validators.required]]
    })
  }

  submit(){
    this.ngxService.start();
    var formData = this.loginForm.value;
    var data = {
      email: formData.email,
      password: formData.password
    }
    this.userService.signin(data).subscribe((response:any) => {
      this.ngxService.stop();
      this.responseMessage = response?.message
      this.snackbar.openSnackbar(this.responseMessage, "close")
      this.storage.set('token', response.token)
      this.router.navigate(['/dashboard/home'])
      this.dialogRef.close()
    }, (error) => {
      this.ngxService.stop();
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
