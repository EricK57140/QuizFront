import { AnimateTimings } from '@angular/animations';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TokenidentificationService } from '../token-identification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hr-associate-create-test',
  templateUrl: './hr-associate-create-test.component.html',
  styleUrls: ['./hr-associate-create-test.component.scss'],
})
export class HrAssociateCreateTestComponent {
  idTest: any;
  test: any;
  public listQuestions: any = [];
  public listQuestionsByTest: any = [];
  public listTechnologies: any = [];
  public selectedTechnology: String = '';
  selectedIdTechnology: number = 0;
  public idTechnology: number = 0;
  value = '';
  displayedColumns: string[] = [
    //'idQuestions',
    'questionTitle',
    'scoreByQuestion',
    'timer',
    'technology.nameTechnology',
  ];

  clickedRows = new Set<HrAssociateCreateTestComponent>();
  constructor(
    private route: ActivatedRoute,
    private tokenIdentification: TokenidentificationService,
    private client: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    public translate: TranslateService
  ) {}

  public formControl: FormGroup = this.formBuilder.group({
    idTest: ['', [Validators.required]],
    nameTest: ['', [Validators.required]],
  });

  public formControlSearch: FormGroup = this.formBuilder.group({
    search: [''],
    idTechnology: [''],
  });

  saveTest() {
    const test = this.formControl.value;
    this.client
      .post(environment.apiBaseUrl + 'hr/test/create', test)

      .subscribe(
        (response) => {
          alert('Test created');
        },
        (error) => {
          if (error.status === 404) {
            // Email does not exist, submit form
            alert('Error');
          }
        }
      );
  }
  getTest() {
    this.route.params.subscribe((parameters: any) => {
      this.idTest = parameters.id;
      this.client
        .get(environment.apiBaseUrl + 'hr/test/' + this.idTest)
        .subscribe((response) => {
          this.test = response;
          this.formControl.get('nameTest')?.setValue(this.test.nameTest);
        });
    });
  }
  getQuestionList() {
    this.route.params.subscribe((parameters: any) => {
      this.idTest = parameters.id;
      this.client
        .get(environment.apiBaseUrl + 'hr/list-questions-test/' + this.idTest)
        .subscribe((reponse) => (this.listQuestions = reponse));
    });
  }

  getQuestionListBySearch() {
    this.route.params.subscribe((parameters: any) => {
      this.idTest = parameters.id;
      this.selectedIdTechnology = Number(this.selectedTechnology);
      console.log('id techno ' + this.selectedIdTechnology);
      const searchBar = this.formControlSearch.value.search;
      this.idTechnology = this.formControl.value.idTechnology;
      let params = new HttpParams();
      params = params.append('search', searchBar);
      params = params.append('idTechno', this.selectedIdTechnology);

      this.client
        .get(
          environment.apiBaseUrl +
            'hr/questions-by-test-searchbar/' +
            this.idTest,
          { params: params }
        )
        .subscribe((reponse) => (this.listQuestions = reponse));
    });
  }

  getQuestionListByTest() {
    this.route.params.subscribe((parameters: any) => {
      this.idTest = parameters.id;
      this.client
        .get(
          environment.apiBaseUrl + 'hr/list-questions-by-test/' + this.idTest
        )
        .subscribe((reponse) => (this.listQuestionsByTest = reponse));
    });
  }
  clearValue() {
    this.formControlSearch.get('search')?.setValue('');
    this.getQuestionListBySearch();
  }
  addQuestion(idQuestion: number) {
    this.route.params.subscribe((parameters: any) => {
      this.idTest = parameters.id;
      let params = new HttpParams();
      params = params.append('testId', this.idTest);
      params = params.append('questionId', idQuestion);

      this.client
        .post(environment.apiBaseUrl + 'hr/add-question-to-test/', null, {
          params: params,
        })
        .subscribe((response) => {
          this.getQuestionList();
          this.getQuestionListByTest();
        });
    });
  }

  deleteQuestion(idQuestion: number) {
    this.translate
      .get('Are you sure to remove this question?')
      .subscribe((message: string) => {
        if (confirm(message)) {
          this.route.params.subscribe((parameters: any) => {
            this.idTest = parameters.id;
            let params = new HttpParams();
            params = params.append('testId', this.idTest);
            params = params.append('questionId', idQuestion);

            this.client
              .post(
                environment.apiBaseUrl + 'hr/delete-question-from-test/',
                null,
                {
                  params: params,
                }
              )
              .subscribe((response) => {
                this.getQuestionList();
                this.getQuestionListByTest();
              });
          });
        }
      });
  }

  ngOnInit(): void {
    this.getTest();
    this.getQuestionList();
    this.getQuestionListByTest();
    this.client
      .get(environment.apiBaseUrl + 'hr/list-technology')
      .subscribe((reponse) => {
        this.listTechnologies = reponse;
      });
  }
}
