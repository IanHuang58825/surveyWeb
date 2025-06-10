import { Component } from '@angular/core';
import { SurveyService } from '../../../@services/survey.service';
import { HttpService } from '../../../@services/http.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { DateService } from '../../../@services/date.service';

@Component({
  selector: 'app-update-ques',
  imports: [
    FormsModule,
    MatIconModule,

  ],
  templateUrl: './update-ques.component.html',
  styleUrl: './update-ques.component.scss'
})
export class UpdateQuesComponent {
  today!: any;
  Editedsurvey!: any;
  questionList!: any;
  constructor(
    private surveyService: SurveyService,
    private httpService: HttpService,
    private router: Router,
    private dateService: DateService

  ) { }

  ngOnInit(): void {
    this.today = this.dateService.changeDateFormat(new Date());
    if (this.surveyService.newSurvey) {
      this.Editedsurvey = this.surveyService.newSurvey;
      this.httpService.getQuesById(this.surveyService.quizId).subscribe({
        next: (res: any) => {

          // console.log('原始数据:', res.questionList);
          this.questionList = res.questionList.map((question: any) => {
            // 解析原始options
            let rawOptions: string[] = [];
            try {
              rawOptions = question.options ? JSON.parse(question.options) : [];
            } catch (e) {
              console.error('解析options失败:', e);
              rawOptions = [];
            }

            // 转换为目标格式
            const processedOptions = rawOptions.map(option => ({ op: option }));

            return {
              ...question,
              options: processedOptions
            };
          });
          this.Editedsurvey.questionList = this.questionList;
          // console.log('转换后数据:', this.questionList);
          // console.log('問卷:', this.Editedsurvey);
        },
        error: (err) => console.error('请求失败:', err)
      });
    } else {
      this.router.navigateByUrl('/admin');
    }
  }

  addQuestion() {
    const question: any = {
      quesId: null,
      name: "",
      type: "single",
      must: false,
      options: [{ op: "" }, { op: "" }]
    }
    this.questionList.push(question);
  }

  delQuestion(questionIndex: number) {
    // this.quesId -= 1;
    this.questionList.splice(questionIndex, 1);
  }

  addOption(question: any) {
    question.options.push({ op: "" });
  }

  delOption(options: Array<any>, optionIndex: number) {
    options.splice(optionIndex, 1);
  }

  hasIncompleteQuestions(): boolean {
    if(this.questionList){
      // 遍歷所有問題，檢查每個問題的必填欄位
    for (const question of this.Editedsurvey.questionList) {
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
    return true;
  }


  goBack() {
    this.questionList = '';
    this.router.navigateByUrl('/admin');
  }

  nextPage() {
    this.surveyService.newSurvey = this.Editedsurvey;
    // this.tabsService.setActiveLinkadmin('preview');
    this.router.navigateByUrl('/updateTabs/previewUpdate');
    console.log("newSurvey = ");
    console.log(this.surveyService.newSurvey);
    console.log("======================================================== ");
  }
}
