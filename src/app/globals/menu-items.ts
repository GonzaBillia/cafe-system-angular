import { Injectable, signal } from "@angular/core"

export interface MenuItem{
  route:string
  label:string
  icon:string
  role:string
}

const MENUITEMS:MenuItem[] = [
  {
    icon: 'home',
    label: 'Home',
    route: 'home',
    role: ''
  },
  {
    icon: 'bakery_dining',
    label: 'Products',
    route: 'product',
    role: 'admin'
  },
  {
    icon: 'list_alt',
    label: 'Categories',
    route: 'category',
    role: 'admin'
  },
  {
    icon: 'summarize',
    label: 'Bills',
    route: 'bill',
    role: ''
  },
  {
    icon: 'person',
    label: 'Profile',
    route: 'user',
    role: ''
  }
]

@Injectable()
export class MenuItems{
  items = signal<MenuItem[]>(MENUITEMS)
}