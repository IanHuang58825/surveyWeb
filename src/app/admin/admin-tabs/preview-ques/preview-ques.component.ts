import { Component } from '@angular/core';
import { SurveyService } from '../../../@services/survey.service';
import { TabsService } from '../../../@services/tabs.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HttpService } from '../../../@services/http.service';


@Component({
  selector: 'app-preview-ques',
  imports: [MatIconModule],
  templateUrl: './preview-ques.component.html',
  styleUrl: './preview-ques.component.scss'
})
export class PreviewQuesComponent {
  survey!: any;

  constructor(
    private surveyService: SurveyService,
    private tabsService: TabsService,
    private router: Router,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    if (this.surveyService.newSurvey) {
      this.survey = this.surveyService.newSurvey;
    }
    else {
      this.tabsService.setActiveLinkadmin('build');
      this.router.navigateByUrl('/adminTabs/build');
    }

  }
  goBack() {
    this.tabsService.setActiveLinkadmin('build');
    this.router.navigateByUrl('/adminTabs/build');
  }


  transformOptions(): void {
    // 遍歷所有問題
    this.survey.questionList.forEach((question: any) => {
      if (question.options && Array.isArray(question.options)) {
        // 將每個 option 轉換為其 value
        question.options = question.options.map((option: any) => {
          // 如果 option 是物件，取 value；否則直接返回 option
          return typeof option === 'object' && option !== null
            ? Object.values(option)[0] // 取第一個 value
            : option; // 如果不是物件，直接返回
        });
      }
    });
  }

  setTextQuestionOptionsToNull(): void {
    // 遍歷所有問題
    this.survey.questionList.forEach((question: any) => {
      if (question.type === 'text') {
        question.options = null; // 如果問題類型為 text，將 options 設為 null
      }
    });
  }

  save(isPublished: boolean) {
    this.survey.is_published = isPublished;
    this.transformOptions();
    this.setTextQuestionOptionsToNull();
    //
    const questionList = this.survey.questionList.map((question: any, index: number) => ({
      quesId: index + 1,
      name: question.name,
      type: question.type,
      must: question.is_must,
      options: question.options ? JSON.stringify(question.options) : null
    }));

    const reqData = {
      name: this.survey.name,
      description: this.survey.description,
      startDate: this.survey.start_date,
      endDate: this.survey.end_date,
      published: isPublished,
      questionList: questionList
    };

    console.log("reqData = ");
    console.log(reqData);
    console.log("======================================================== ");
    this.httpService.postApi('http://localhost:8080/quiz/create', reqData).subscribe({
      next: (res: any) => {
        console.log('API回應:', res);
      },
      // 處理錯誤回應
      error: (err) => {
        console.error('API錯誤:', err);
      }
    });
    this.surveyService.surveyIsEdit = false;
    this.router.navigateByUrl('/admin');
    console.log(reqData);

    this.surveyService.newSurvey = '';
  }
}
