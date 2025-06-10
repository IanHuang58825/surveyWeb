import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  //讀取
  getApi(url: string) {
    return this.httpClient.get(url);
  }

  //新增
  postApi(url: string, postData: any) {
    return this.httpClient.post(url, postData);
  }

  //更新
  putApi(url: string, putData: any) {
    return this.httpClient.put(url, putData);
  }

  //刪除
  delApi(url: string) {
    return this.httpClient.delete(url);
  }

  getQuesById(quizId: number) {
    const url = 'http://localhost:8080/quiz/get_by_quiz_id';
    return this.httpClient.get(url, {
      params: {
        quizId: quizId  // 自動會被編碼為 URL 查詢參數
      }
    });
  }

  feedback(quizId: number) {
    const url = 'http://localhost:8080/quiz/feedback';
    return this.httpClient.get(url, {
      params: {
        quizId: quizId
      }
    });
  }

  statistics(quizId: number) {
    const url = 'http://localhost:8080/quiz/statistics';
    return this.httpClient.get(url, {
      params: {
        quizId: quizId
      }
    });
  }
  getUserInfo(email: string) {
    const url = 'http://localhost:8080/user/getUserInfo';
    return this.httpClient.get(url, {
      params: {
        email: email  // 自動會被編碼為 URL 查詢參數
      }
    });
  }

  delAccount(email: string) {
    const url = 'http://localhost:8080/user/delete';
    return this.httpClient.get(url, {
      params: {
        email: email
      }
    });
  }
}
