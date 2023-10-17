import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private client: HttpClient) {}

  getTechnologyList(): Observable<any> {
    return this.client
      .get('http://localhost:8080/hr/list-technology')
      .pipe(map((response) => response));
  }

  getTestsList() {
    return this.client
      .get(environment.apiBaseUrl + 'hr/list-test')
      .pipe(map((reponse) => reponse));
  }

  getTestsListById(id:number) {
    return this.client
      .get(environment.apiBaseUrl + 'hr/list-test-by-id/' + id)
      .pipe(map((reponse) => reponse));
  }

  getListOfQuestions() {
    return this.client
      .get('http://localhost:8080/hr/list-questions')
      .pipe(map((reponse) => reponse));
  }
}
