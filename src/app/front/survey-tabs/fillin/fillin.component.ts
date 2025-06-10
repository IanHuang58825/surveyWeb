import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { DateService } from '../../../@services/date.service';
import { HttpService } from '../../../@services/http.service';
import { SurveyService } from '../../../@services/survey.service';

@Component({
  selector: 'app-fillin',
  imports: [
    FormsModule,
    MatIconModule,
  ],
  templateUrl: './fillin.component.html',
  styleUrl: './fillin.component.scss'
})
export class FillinComponent {
  survey!: any;
  questionList!: any;
  ansSurvey!: any;
  constructor(
    private surveyService: SurveyService,
    private httpService: HttpService,
    private router: Router,
    private dateService: DateService

  ) { }

  ngOnInit(): void {
    if (this.surveyService.myFillinSurvey) {
      this.survey = this.surveyService.myFillinSurvey;
    } else {
      if (!this.surveyService.fillinSurvey) {
        this.router.navigateByUrl('/front');
        return;
      }
      this.survey = {
        ...this.surveyService.fillinSurvey,
        fillin_date: this.dateService.changeDateFormat(new Date()),
        user_name: '',
        phone: '',
        email: '',
        age: null,
        questionList: []
      };

      this.httpService.getQuesById(this.surveyService.quizId).subscribe({
        next: (res: any) => {
          this.questionList = res.questionList.map((question: any) => {
            // 解析並轉換 options
            let options: any[] = [];
            try {
              const rawOptions = question.options ? JSON.parse(question.options) : [];
              options = rawOptions.map((op: string, index: number) => ({
                opId: index + 1,
                op,
                boxBoolean: false
              }));
            } catch (e) {
              console.error('解析 options 失敗:', e);
            }

            // 返回標準化問題結構
            return {
              quizId: question.quizId,
              quesId: question.quesId,
              name: question.name,
              type: question.type,
              must: question.must,
              options: options,
              answer: '',
              radioAns: ''
            };
          });

          // 更新 survey 的問題列表
          this.survey.questionList = this.questionList;
        },
        error: (err) => console.error('請求失敗:', err)
      });
    }
  }

  checkNeed(): boolean {
    console.log(this.questionList);
    for (let quest of this.survey.questionList) {
      if (quest.must) {
        if (quest.type == 'multi') {
          let check = false;
          for (let choice of quest.options) {
            if (choice.boxBoolean) {
              check = true;
            }
          }
          if (!check) {
            alert('PLease full out m questions');
            return false;
          }

        } else if (quest.type == 'single') {
          if (!quest.radioAns) {
            alert('PLease full out s questions');
            return false;
          }
        }
      }
    }
    return true;
  }


  goBack() {
    this.surveyService.fillinSurvey = '';
    this.surveyService.myFillinSurvey = '';
    this.surveyService.newSurvey = '';
    this.router.navigateByUrl('/front');
  }

  nextPage() {
    this.checkNeed();
    if (this.checkNeed()) {
      this.surveyService.fillinSurvey = this.survey;
      this.surveyService.myFillinSurvey = this.survey;
      console.log(this.surveyService.fillinSurvey);

      this.router.navigateByUrl('/surveyTabs/previewAns');
    }
  }
}
