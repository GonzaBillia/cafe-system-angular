import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CustomSidenavComponent } from '../custom-sidenav/custom-sidenav.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationComponent } from '../../shared/Material-components/Confirmation/confirmation.component';
import { BrowserStorageService } from '../../services/browser-storage.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { MatMenuModule } from '@angular/material/menu'

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    CustomSidenavComponent,
    MatMenuModule
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent {
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private storage: BrowserStorageService
  ) {}

  collapsed = signal(false);

  sidenavWidth = computed(() => (this.collapsed() ? '64px' : '250px'));

  logout() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    dialogConfig.height = '150px';
    dialogConfig.data = {
      message: 'Logout',
    };

    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe(
      (user) => {
        dialogRef.close();
        this.router.navigate(['/']);
        this.storage.clear();
      }
    );
  }
  changePassword() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '600px';
    this.dialog.open(ChangePasswordComponent, dialogConfig);
  }
}
