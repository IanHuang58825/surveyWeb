import { Component } from '@angular/core';
import { Toolbar2Component } from "../../components/toolbar2/toolbar2.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTable2Component } from '../../components/mat-table2/mat-table2.component';

@Component({
  selector: 'app-front',
  imports: [
    Toolbar2Component,
    MatTable2Component,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
  ],
  templateUrl: './front.component.html',
  styleUrl: './front.component.scss'
})
export class FrontComponent {

}
