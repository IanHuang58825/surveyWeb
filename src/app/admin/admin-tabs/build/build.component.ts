import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TabsService } from '../../../@services/tabs.service';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators, FormBuilder, FormArray } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SurveyService } from '../../../@services/survey.service';
import { HttpService } from '../../../@services/http.service';
import { DateService } from '../../../@services/date.service';

@Component({
  selector: 'app-build',
  imports: [
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  templateUrl: './build.component.html',
  styleUrl: './build.component.scss'
})

export class BuildComponent {
  today!: any;
  start_date!: any;
  survey!: any;

  constructor(
    private router: Router,
    private surveyService: SurveyService,
    private tabsService: TabsService,
    private httpService: HttpService,
    private dateService: DateService
  ) { }


  ngOnInit(): void {
    this.today = this.dateService.changeDateFormat(new Date());
    this.start_date = this.dateService.changeDateFormat(new Date());
    if (this.surveyService.newSurvey) {
      this.survey = this.surveyService.newSurvey;
    } else {
      this.survey = {
        name: "",
        description: "",
        start_date: this.dateService.changeDateFormat(new Date()),
        end_date: "",
        is_published: false,
        questionList: []
      };
      this.addQuestion();
    }

    console.log(this.surveyService.newSurvey);
  }

  addQuestion() {
    const question: any = {
      quesId: null,
      name: "",
      type: "single",
      is_must: false,
      options: [{ op: "" }, { op: "" }]
    }
    this.survey.questionList.push(question);
  }

  delQuestion(questionIndex: number) {
    this.survey.questionList.splice(questionIndex, 1);
  }

  addOption(question: any) {
    question.options.push({ op: "" });
  }

  delOption(options: Array<any>, optionIndex: number) {
    options.splice(optionIndex, 1);
  }

  hasIncompleteQuestions(): boolean {
    // 遍歷所有問題，檢查每個問題的必填欄位
    for (const question of this.survey.questionList) {
      // 檢查問題名稱是否填寫
      if (!question.name || question.name.trim() === '') {
        return true;
      }

      // 檢查選項是否填寫 (僅對非 text 類型的問題)
      if (question.type !== 'text') {
        if (!question.options || question.options.length === 0) {
          return true;
        }

        // 確保每個選項的值被填寫
        for (const option of question.options) {
          if (!option.op || option.op.trim() === '') {
            return true;
          }
        }
      }
    }
    // 如果所有必填欄位都完整，按鈕不禁用
    return false;
  }

  nextPage() {
    this.surveyService.newSurvey = this.survey;
    this.tabsService.setActiveLinkadmin('preview');
    this.router.navigateByUrl('/adminTabs/previewQues');
    console.log("newSurvey = ");
    console.log(this.surveyService.newSurvey);
    console.log("======================================================== ");

  }
  goBack() {
    this.surveyService.surveyIsEdit = false;
    this.surveyService.newSurvey = '';
    this.router.navigateByUrl('/admin');
  }
}
