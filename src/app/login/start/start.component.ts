import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignupComponent } from '../signup/signup.component';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [RouterOutlet, SignupComponent, MatTabsModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent {

}
