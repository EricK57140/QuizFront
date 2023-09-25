import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenidentificationService } from '../token-identification.service';
import { CommonService } from '../common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hr-associate-questions',
  templateUrl: './hr-associate-questions.component.html',
  styleUrls: ['./hr-associate-questions.component.scss'],
})
export class HrAssociateQuestionsComponent {
  public listQuestions: any = [];
  public personID: number = 0;
  public email: string = '';
  public user: any;
  public formControlSearch: FormGroup = this.formBuilder.group({
    search: [''],
  });

  public hr: boolean = false;
  displayedColumns: string[] = [
    // 'idQuestions',
    'questionTitle',
    //'scoreByQuestion',
    'timer',
    'technology.nameTechnology',
    'questionToEdit',
    'questionToDelete',
  ];

  constructor(
    private tokenIdentification: TokenidentificationService,
    private client: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private commonService: CommonService
  ) {}

  editQuestion(idQuestions: number) {
    this.router.navigateByUrl('hr-associate-create-answers/' + idQuestions);
  }

  deleteQuestion(idQuestions: number) {}

  getQuestionList() {
    this.commonService
      .getListOfQuestions()
      .subscribe((reponse) => (this.listQuestions = reponse));
  }

  ngOnInit(): void {
    this.getQuestionList();
  }
  getQuestionsBySearch() {
    const searchBar = this.formControlSearch.value.search;
    let params = new HttpParams();
    params = params.append('search', searchBar);

    this.client
      .get(environment.apiBaseUrl + 'hr/questions-by--searchbar/', {
        params: params,
      })
      .subscribe((reponse) => (this.listQuestions = reponse));
  }
  clearValue() {
    this.formControlSearch.get('search')?.setValue('');
    this.getQuestionList();
  }
}
