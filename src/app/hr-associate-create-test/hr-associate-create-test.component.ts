import { AnimateTimings } from '@angular/animations';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenidentificationService } from '../token-identification.service';

@Component({
  selector: 'app-hr-associate-create-test',
  templateUrl: './hr-associate-create-test.component.html',
  styleUrls: ['./hr-associate-create-test.component.scss'],
})
export class HrAssociateCreateTestComponent {
  idTest: any;
  test: any;
  public listQuestions: any = [];
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
    private formBuilder: FormBuilder
  ) {}

  public formControl: FormGroup = this.formBuilder.group({
    idTest: ['', [Validators.required]],
    nameTest: ['', [Validators.required]],
  });

  saveTest() {
    const test = this.formControl.value;
    this.client
      .post('http://localhost:8080/hr/test/create', test)

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
        .get('http://localhost:8080/hr/test/' + this.idTest)
        .subscribe((response) => {
          this.test = response;
          this.formControl.get('nameTest')?.setValue(this.test.nameTest);
        });
    });
  }
  getQuestionList() {
    this.client
      .get('http://localhost:8080/hr/list-questions')
      .subscribe((reponse) => (this.listQuestions = reponse));
  }

  addQuestion(id: number) {
    console.log('toto' + id);
  }
  ngOnInit(): void {
    this.getTest();
    this.getQuestionList();
  }
}
