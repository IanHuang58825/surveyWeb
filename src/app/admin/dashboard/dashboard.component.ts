import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { HttpService } from '../../@services/http.service';
import { SurveyService } from '../../@services/survey.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Toolbar2Component } from "../../components/toolbar2/toolbar2.component";
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-dashboard',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    CommonModule,
    Toolbar2Component
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  survey!: any;
  feedbackData!: any;
  statisticsList!: any;

  constructor(
    private httpService: HttpService,
    private surveyService: SurveyService,
    private router: Router
  ) { }
  ngOnInit(): void {
    // console.log("開始");

    this.survey = this.surveyService.newSurvey;
    this.httpService.statistics(this.surveyService.quizId).subscribe({
      next: (res: any) => {
        this.statisticsList = res.statisticsVoList;
        console.log(this.statisticsList);
        setTimeout(() => this.pieChart(), 100);
      },
      error: (err) => console.error('請求失敗:', err)
    });
    this.httpService.feedback(this.surveyService.quizId).subscribe({
      next: (res: any) => {
        this.feedbackData = res;
        // console.log(res);


      },
      error: (err) => {
        console.error('API錯誤:', err);
        this.router.navigateByUrl('admin');
      }
    });
  }

  pieChart(): void {
    this.statisticsList.forEach((question: any) => {
      if (question.type != "text") {
        let ctx = document.getElementById("chart" + question.quesId) as HTMLCanvasElement;
        if (ctx) {
          // 設定數據
          let data = {
            // x 軸文字
            labels: question.optionCountVoList.map((item: any) => { return item.option }),
            datasets: [
              {
                id: question.quesId,
                label: 'choice',
                data: question.optionCountVoList.map((item: any) => { return item.count }),
                backgroundColor: this.generateColors(question.optionCountVoList.length),
                hoverOffset: 10,
              },
            ],
          };
          let chart = new Chart(ctx, {
            type: 'pie',
            data: data,
            options: {
              responsive: false
            }
          });
          // console.log(data);
        }
      }
    });
  }

  generateColors(count: number): string[] {
    const colors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
      '#9966FF', '#FF9F40', '#8AC24A', '#EA80FC',
      '#00ACC1', '#FF7043', '#7E57C2', '#66BB6A'
    ];
    return colors.slice(0, count);
  }

  goBack() {
    this.surveyService.newSurvey = '';
    this.router.navigateByUrl('/admin');
  }
}
