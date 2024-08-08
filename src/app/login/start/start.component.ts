import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { SigninComponent } from '../signin/signin.component';
import { UserService } from '../../services/user.service';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BrowserStorageService } from '../../services/browser-storage.service';
import { waitForAsync } from '@angular/core/testing';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [RouterOutlet, SignupComponent, MatTabsModule, MatButtonModule, MatToolbarModule, MatDialogModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent implements OnInit {
  constructor(
    private dialog:MatDialog,
    private router:Router,
    private userService:UserService,
    private storage:BrowserStorageService
  ){}

  ngOnInit(): void {
      // timeout(1000)
      if(this.storage.get('token') != null){
        this.userService.checkToken().subscribe((response:any) => {
          this.router.navigate(['/dashboard/home'])
        }, (error:any) => {
          console.log(error)
        })
      }
  }
  signupAction(){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = "600px"
    this.dialog.open(SignupComponent, dialogConfig)
  }

  signinAction(){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = "600px"
    this.dialog.open(SigninComponent, dialogConfig)
  }

  forgotAction(){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = "600px"
    this.dialog.open(ForgotPasswordComponent, dialogConfig)
  }
}
