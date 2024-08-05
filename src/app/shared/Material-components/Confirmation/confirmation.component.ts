import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent implements OnInit{

  onEmitStatusChange = new EventEmitter()
  details:any = {}

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any){}

  ngOnInit(): void {
    if(this.dialogData){
      this.details = this.dialogData
    }
  }

  handleChangeAction(){
    this.onEmitStatusChange.emit('yes')
  }
}
