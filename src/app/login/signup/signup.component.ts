import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SnackbarService } from '../../services/snackbar.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Constants } from '../../globals/constants';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, MatToolbarModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule, MatButtonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  signupForm:any = FormGroup
  responseMessage:any

  constructor(private form:FormBuilder, private router:Router, private userService:UserService, private snackbar:SnackbarService, private dialogRef:MatDialogRef<SignupComponent>, private ngxService:NgxUiLoaderService) { }

  ngOnInit(): void {
    this.signupForm = this.form.group({
      name:[null, [Validators.required, Validators.pattern(Constants.nameRegex)]],
      email:[null, [Validators.required, Validators.pattern(Constants.emailRegex)]],
      contact_number: [null, [Validators.required, Validators.pattern(Constants.phoneRegex)]],
      password:[null, [Validators.required]]
    })
  }

  submit() {
    this.ngxService.start()
    let formData = this.signupForm.value
    let data = {
      name: formData.name,
      email: formData.email,
      contact_number: formData.contact_number,
      password: formData.password
    }
    this.userService.signup(data).subscribe((response:any) => {
      this.ngxService.stop()
      this.dialogRef.close()
      this.responseMessage = response?.message
      this.snackbar.openSnackbar(this.responseMessage, "")
      this.router.navigate(['/'])
    }, (error) => {
      this.ngxService.stop()
      if(error.error?.message) {
        this.responseMessage = error.error?.message
      } else {
        this.responseMessage = Constants.genericError
      }
      this.snackbar.openSnackbar(this.responseMessage, Constants.genericError)
    })
  }
}
