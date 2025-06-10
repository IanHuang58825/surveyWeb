import { HttpService } from './../../@services/http.service';
import { Component } from '@angular/core';
import { Toolbar2Component } from "../../components/toolbar2/toolbar2.component";
import { MatTableComponent } from '../../components/mat-table/mat-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { WorkSpaceComponent } from '../../components/work-space/work-space.component';


@Component({
  selector: 'app-admin',
  imports: [
    Toolbar2Component,
    MatTableComponent,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    WorkSpaceComponent
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  matTable: boolean = true;
  profile: boolean = false;
  quizData!: any;

  constructor(
    private httpService: HttpService
  ) { }
  ngOnInit(): void {
    const req = {
      quizName: null,
      startDate: null,
      endDate: null
    }
    this.httpService.postApi('http://localhost:8080/quiz/getAll', req).subscribe({
      next: (res: any) => {
        if (res.code === 200 && Array.isArray(res.quizList)) {
          this.quizData = res.quizList;
          console.log(this.quizData);

        } else {
          console.error('Invalid data structure from API');
        }
      },
      error: (err) => {
        console.error('API error:', err);
      }
    });
  }
  showTable() {
    this.matTable = true;
    this.profile = false;
  }

  showWorkSpace() {
    this.profile = true;
    this.matTable = false;

  }

}
