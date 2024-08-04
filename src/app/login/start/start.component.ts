import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [RouterOutlet, SignupComponent, MatTabsModule, MatButtonModule, MatToolbarModule, MatDialogModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent {
  constructor(private dialog:MatDialog){}
  signupAction(){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = "600px"
    this.dialog.open(SignupComponent, dialogConfig)
  }
}
