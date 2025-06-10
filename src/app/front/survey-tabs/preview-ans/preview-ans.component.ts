import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DateService } from '../../../@services/date.service';
import { HttpService } from '../../../@services/http.service';
import { SurveyService } from '../../../@services/survey.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-preview-ans',
  imports: [MatIconModule],
  templateUrl: './preview-ans.component.html',
  styleUrl: './preview-ans.component.scss'
})
export class PreviewAnsComponent {
  survey!: any;
  reqSurvey!: any;

  constructor(
    private surveyService: SurveyService,
    private httpService: HttpService,
    private router: Router,
    private dateService: DateService
  ) { }
  ngOnInit(): void {
    this.survey = this.surveyService.fillinSurvey;
  }

  goBack() {
    this.router.navigateByUrl('/surveyTabs/fillin');
  }

  transformQuizData() {
    // 提取基本資訊
    const reqData = {
      quizId: this.survey.id,
      name: this.survey.user_name,
      phone: this.survey.phone,
      email: this.survey.email,
      age: this.survey.age,
      quesIdAnswerList: [] as any[]
    };

    // 處理每個問題
    this.survey.questionList.forEach((question: any) => {
      const answerEntry = {
        quesId: question.quesId,
        answers: [] as string[]
      };
      if (question.type == "text") {
        // 文本問題：如果answer有值則放入answers，否則保持空數組
        if (question.answer != '') {
          answerEntry.answers.push(question.answer);
        }
      }
      // 處理多選問題
      else if (question.type == 'multi') {
        question.options.forEach((option: any) => {
          if (option.boxBoolean) {
            answerEntry.answers.push(option.op);
          }
        });
      }
      else {
        question.options.forEach((option: any) => {
          if (question.radioAns == option.opId) {
            answerEntry.answers.push(option.op);
          }
        });
      }
      reqData.quesIdAnswerList.push(answerEntry);
    });
    console.log(reqData);
    return reqData;
  }

  save() {
    this.surveyService.myFillinSurvey = '';
    this.surveyService.fillinSurvey = '';
    this.surveyService.newSurvey = '';
    const req = this.transformQuizData();
    this.httpService.postApi('http://localhost:8080/quiz/fillin', req).subscribe({
      next: (res: any) => {
        console.log('API回應:', res);
      },
      // 處理錯誤回應
      error: (err) => {
        console.error('API錯誤:', err);
      }
    });
    console.log(req);
    this.router.navigateByUrl('/front');
  }
}
