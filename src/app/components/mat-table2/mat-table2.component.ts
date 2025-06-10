import { AfterViewInit, ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { HttpService } from '../../@services/http.service';
import { SurveyService } from '../../@services/survey.service';
////////////////////////////////////////////////////////////////////////
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mat-table2',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatIconModule,
    MatCheckboxModule,
    CommonModule
  ],
  templateUrl: './mat-table2.component.html',
  styleUrl: './mat-table2.component.scss'
})
export class MatTable2Component {
  dataSource = new MatTableDataSource<PeriodicElement>();
  displayedColumns: string[] = ['id', 'name', 'state', 'startDate', 'endDate', 'result'];
  inputText!: string;
  startDate!: any;
  endDate!: any;
  del: boolean = false;
  selection = new SelectionModel<any>(true, []);
  constructor(
    private router: Router,
    private httpService: HttpService,
    private surveyService: SurveyService,
    private cd: ChangeDetectorRef
  ) { }


  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    const req = {
      quizName: null,
      startDate: null,
      endDate: null
    }
    this.getData(req);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getData(req: any) {
    // this.httpService.postApi('http://localhost:8080/quiz/getAll', req).subscribe((res: any) => {
    //   const currentDate = new Date(); // 获取当前时间

    //   const tidyData = res.quizList
    //     .filter((quiz: any) => {
    //       const startDate = new Date(quiz.startDate);
    //       const endDate = new Date(quiz.endDate);

    //       // 筛选条件：当前时间在开始和结束时间之间，且问卷已发布
    //       return currentDate >= startDate &&
    //         currentDate <= endDate &&
    //         quiz.published === true;
    //     })
    //     .map((quiz: any) => {
    //       return {
    //         id: quiz.id,
    //         name: quiz.name,
    //         description: quiz.description,
    //         state: 'In progress', // 因为已经筛选过，所以状态固定为进行中
    //         startDate: quiz.startDate,
    //         endDate: quiz.endDate,
    //         is_published: quiz.published,
    //         questionList: quiz.questionList,
    //         result: ''
    //       };
    //     });

    //   this.dataSource = new MatTableDataSource<PeriodicElement>(tidyData);
    //   this.dataSource.paginator = this.paginator;
    // });

    this.httpService.postApi('http://localhost:8080/quiz/getAll', req).subscribe({
      next: (res: any) => {
        if (res.code === 200 && Array.isArray(res.quizList)) {
          const filtered = res.quizList.filter((quiz: any) => this.getStatus(quiz) === 'In progress');
          this.dataSource.data = filtered;
        } else {
          console.error('Invalid data structure from API');
        }
      },
      error: (err) => {
        console.error('API error:', err);
      }
    });
  }

  getStatus(quiz: any): string {
    const currentDate = new Date();
    const startDate = new Date(quiz.startDate);
    const endDate = new Date(quiz.endDate);

    if (currentDate < startDate || !quiz.published) {
      return 'Not start yet';
    } else if (currentDate <= endDate && quiz.published) {
      return 'In progress';
    } else {
      return 'Already done';
    }
  }

  searchData() {
    const req = {
      quizName: this.inputText,
      startDate: this.startDate,
      endDate: this.endDate
    }
    this.getData(req);
    console.log(this.dataSource);

  }

  resetInput() {
    const req = {
      quizName: null,
      startDate: null,
      endDate: null
    }
    this.getData(req);

  }

  fillIn(element: any) {
    this.surveyService.quizId = element.id;
    this.surveyService.fillinSurvey = element;
    this.router.navigateByUrl('/surveyTabs/fillin');
  }
}
//interface
export interface PeriodicElement {
  // del: any;
  id: string;
  name: string;
  state: string;
  startDate: string;
  endDate: string;
}
