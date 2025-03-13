import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CommonService } from '../../common.service';
import { TokenidentificationService } from '../../token-identification.service';

@Component({
  selector: 'app-candidate-pass-test',
  templateUrl: './candidate-pass-test.component.html',
  styleUrls: ['./candidate-pass-test.component.scss'],
})
export class CandidatePassTestComponent {
  public listQuestions: any = [];

  currentQuestion: any;
  selectedAnswer: any;
  selectedAnswers: any[] = [];
  public listAnswers: any = [];
  idTest: any;
  testId: any;
  testAssignation: any;

  constructor(
    private tokenIdentification: TokenidentificationService,
    private route: ActivatedRoute,
    private client: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.params.subscribe((parameters: any) => {
      this.idTest = parameters.id;
      this.client
        .get(
          environment.apiBaseUrl +
            'candidate/list-questions-by-test/' +
            this.idTest
        )
        .subscribe((response) => {
          this.listQuestions = response;
          this.currentQuestion = this.listQuestions[0];
          console.log(this.listQuestions[0].idQuestions);
          this.getAnswers(this.listQuestions[0].idQuestions);
        });
    });
  }

  getAnswers(questionId: number) {
    this.client
      .get(environment.apiBaseUrl + 'candidate/list-answers/' + questionId)
      .subscribe((response) => {
        this.listAnswers = response;
      });
  }
  submit() {
    // if (!this.selectedAnswer) {
    //   this.snackBar.open('Please select an answer', 'OK', { duration: 2000 });
    //   return;
    // }

    this.saveAnswer();
    this.listQuestions.shift();
    this.currentQuestion = this.listQuestions[0];
    this.getAnswers(this.listQuestions[0].idQuestions);
    this.selectedAnswer = null;
  }

  saveAnswer() {
    this.route.params.subscribe((parameters: any) => {
      this.testAssignation = parameters.idTestAssignation;
      const questionId = this.currentQuestion.idQuestions;
      const answerId = this.selectedAnswer.idAnswers;
      console.log(questionId, answerId);
      let params = new HttpParams();
      params = params.append('testId', this.testAssignation);
      params = params.append('questionId', questionId);
      params = params.append('answerId', answerId);
      this.client
        .post(environment.apiBaseUrl + 'candidate/save-question-answer', null, {
          params: params,
        })
        .subscribe();
    });
  }
}
