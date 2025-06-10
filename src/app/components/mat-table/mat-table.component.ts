import { AfterViewInit, ChangeDetectorRef, Component, inject, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, NavigationEnd } from '@angular/router';
import { HttpService } from '../../@services/http.service';
import { SurveyService } from '../../@services/survey.service';
////////////////////////////////////////////////////////////////////////
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { DelDialogComponent } from '../del-dialog/del-dialog.component';
import { MatDialog } from '@angular/material/dialog';
//////////////////////
import { filter } from 'rxjs/operators';



@Component({
  selector: 'app-mat-table',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatIconModule,
    MatCheckboxModule,
    CommonModule
  ],
  templateUrl: './mat-table.component.html',
  styleUrl: './mat-table.component.scss'
})
export class MatTableComponent {
  readonly dialog = inject(MatDialog);
  @Input() quizData: any;
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
    if (this.quizData) {
      console.log("有資料");
      this.dataSource.data = this.quizData;
      console.log(this.dataSource.data);

    }
    // const req = {
    //   quizName: null,
    //   startDate: null,
    //   endDate: null
    // }
    // this.getData(req);
    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe(() => {
    //   // 每次導航完成都重新撈資料
    //   this.getData(req);
    // });
    // this.cd.detectChanges();
  }

  ngOnChanges(): void {
    if (this.quizData) {
      this.dataSource.data = this.quizData;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getData(req: any) {
    this.httpService.postApi('http://localhost:8080/quiz/getAll', req).subscribe({
      next: (res: any) => {
        if (res.code === 200 && Array.isArray(res.quizList)) {
          this.dataSource.data = res.quizList;
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

  showDel(is_del: boolean) {
    if (is_del) {
      this.displayedColumns = ['bs_checkbox', 'name', 'state', 'startDate', 'endDate', 'result'];
      this.del = true;
    } else {
      this.displayedColumns = ['id', 'name', 'state', 'startDate', 'endDate', 'result'];
      this.del = false;
    }
  }

  isAllSelected() { // 判斷是否為全部選取
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  /* 翻轉 全選&全取消 */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /* 刪除勾選的值 */
  delSurvey() {
    if (this.selection.selected.length > 0) {
      const dialog = this.dialog.open(DelDialogComponent, {
        width: '500px',
        height: '200px',
      });
      dialog.afterClosed().subscribe((res: any) => {
        let isDel = res;
        if (isDel) {
          const idsArray = this.selection.selected.map(item => item.id);
          const req = {
            quizIdList: idsArray
          };
          this.httpService.postApi('http://localhost:8080/quiz/delete', req).subscribe((res: any) => {
            // Remove the deleted items from the displayed data
            this.dataSource.data = this.dataSource.data.filter(item => !idsArray.includes(item.id));
            // Clear the selection after deleting
            this.selection.clear();
            console.log(res);
          });
        }
      })
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

  goEdit(element: any) {
    this.surveyService.quizId = element.id;
    this.surveyService.newSurvey = element;
    this.router.navigateByUrl('/updateTabs/updateBuild');
    console.log(element);
  }

  seeResult(element: any) {
    this.surveyService.quizId = element.id;
    this.surveyService.newSurvey = element;
    this.router.navigateByUrl('/dashboard');
    console.log(element);
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
