import { Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-view-bill',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatDialogModule, MatTableModule],
  templateUrl: './view-bill.component.html',
  styleUrl: './view-bill.component.css'
})
export class ViewBillComponent implements OnInit{

  displayedColumns:string[] = ['title', 'category', 'price', 'quantity', 'total']
  dataSource:any
  data:any

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData:any,
  public dialogRef:MatDialogRef<ViewBillComponent>){}

  ngOnInit(): void {
    this.data = this.dialogData.data
    this.dataSource = JSON.parse(this.dialogData.data.product_details)
  }
}
