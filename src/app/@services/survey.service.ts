import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private _questionType$ = new BehaviorSubject<string>('single');
  questionType$ = this._questionType$.asObservable();
  setquestionType(type: string) {
    this._questionType$.next(type);
  }

  newSurvey!: any;
  surveyIsEdit: boolean = false;
  quizId!: number;

  //要填的問卷
  fillinSurvey!: any;
//作答
  myFillinSurvey!: any;
  constructor() { }
}

