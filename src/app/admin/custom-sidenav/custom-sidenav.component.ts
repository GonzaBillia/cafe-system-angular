import { CommonModule } from '@angular/common';
import { Component, computed, Input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';

export type MenuItem = {
  icon: string;
  label: string;
  route?: string;
}

@Component({
  selector: 'app-custom-sidenav',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, RouterLink],
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.css'
})
export class CustomSidenavComponent {

  sidenavCollapsed = signal(false)
  @Input() set collapsed(val: boolean) {
    this.sidenavCollapsed.set(val)
  }

  menuItems = signal<MenuItem[]> ([
    {
      icon: 'home',
      label: 'Home',
      route: 'home'
    },
    {
      icon: 'bakery_dining',
      label: 'Products',
      route: 'product'
    },
    {
      icon: 'list_alt',
      label: 'Orders',
      route: 'order'
    },
    {
      icon: 'summarize',
      label: 'Bills',
      route: 'bill'
    },
    {
      icon: 'person',
      label: 'Profile',
      route: 'user'
    }
  ])

  profilePicSize = computed(() => this.sidenavCollapsed() ? '32' : '100')
}
