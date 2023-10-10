import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../common.service';
import { TokenidentificationService } from '../token-identification.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hr-associate-try-test',
  templateUrl: './hr-associate-try-test.component.html',
  styleUrls: ['./hr-associate-try-test.component.scss'],
})
export class HrAssociateTryTestComponent {
  public listQuestions: any = [];

  currentQuestion: any;
  selectedAnswer: any;
  selectedAnswers: any[] = [];
  public listAnswers: any = [];
  idTest: any;

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
        .get(environment.apiBaseUrl +'/hr/list-questions-by-test/' + this.idTest)
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
      .get(environment.apiBaseUrl +'/hr/list-answers/' + questionId)
      .subscribe((response) => {
        this.listAnswers = response;
      });
  }
  submit() {
    if (!this.selectedAnswer) {
      this.snackBar.open('Please select an answer', 'OK', { duration: 2000 });
      return;
    }

    this.listQuestions.shift();
    this.currentQuestion = this.listQuestions[0];
    this.getAnswers(this.listQuestions[0].idQuestions);
    this.selectedAnswer = null;
  }
}
