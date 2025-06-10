import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-toolbar2',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './toolbar2.component.html',
  styleUrl: './toolbar2.component.scss'
})
export class Toolbar2Component {

  logout(){
    // document.cookie.split(";").forEach(cookie => {
    //   const name = cookie.split("=")[0].trim();
    //   document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    // });
  }
}
