import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BrowserStorageService } from '../../services/browser-storage.service';
import { MenuItem, MenuItems } from '../../globals/menu-items';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.css'
})
export class CustomSidenavComponent implements OnInit {
  tokenPayload:any
  token:any
  items:MenuItem[] = inject(MenuItems).items()

  constructor(private storage:BrowserStorageService,
  ) {
    this.token = this.storage.get('token')
    this.tokenPayload = jwtDecode(this.token)
  }

  ngOnInit(): void {
    
  }

  sidenavCollapsed = signal(false)
  @Input() set collapsed(val: boolean) {
    this.sidenavCollapsed.set(val)
  }


  profilePicSize = computed(() => this.sidenavCollapsed() ? '32' : '100')
}
