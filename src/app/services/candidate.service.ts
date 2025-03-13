import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CandidateService {
  private candidateListSubject = new BehaviorSubject<any[]>([]);
  candidateList$ = this.candidateListSubject.asObservable();
  constructor(private http: HttpClient) {}
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    password: new FormControl(''),
  });
  initializeFormGroup() {
    this.form.setValue({
      name: '',
      firstName: '',
      email: '',
      passsword: '',
    });
  }
  getCandidateListByIdHr(id: number) {
    this.http
      .get<any[]>(`${environment.apiBaseUrl}hr/list-candidate-hr/${id}`)
      .subscribe((data) => {
        this.candidateListSubject.next(data);
      });
  }

  createCandidate(user: any): Observable<any> {
    return this.http.post(
      `${environment.apiBaseUrl}hr/createcandidateaccount`,
      user
    );
  }
}
