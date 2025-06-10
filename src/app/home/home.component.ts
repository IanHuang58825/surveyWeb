import { Component } from '@angular/core';
import { ToolbarComponent } from "../components/toolbar/toolbar.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    ToolbarComponent,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
