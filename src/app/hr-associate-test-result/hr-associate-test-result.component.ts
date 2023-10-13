import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-hr-associate-test-result',
  templateUrl: './hr-associate-test-result.component.html',
  styleUrls: ['./hr-associate-test-result.component.scss'],
})
export class HrAssociateTestResultComponent {
  testId: any;
  scoreFetched: boolean = false;
  score: any;
  idTest: any;
  public listQuestions: any = [];
  currentQuestion: any;
  public listAnswers: any = [];

  questions: any = [];
  testResults: any = [];
  selectedAnswers: any = [];
  correctAnswers: any = [];
  constructor(
    private route: ActivatedRoute,
    private client: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.testId = this.route.snapshot.paramMap.get('id');
    this.getScore();
    this.route.params.subscribe((parameters: any) => {
      this.idTest = parameters.id;
      this.client
        .get(
          environment.apiBaseUrl + 'hr/list-questions-by-test/' + this.idTest
        )
        .subscribe((response) => {
          this.listQuestions = response;

          for (let i = 0; i < this.listQuestions.length; i++) {
            const idQuestions = this.listQuestions[i].idQuestions;
            this.getAnswers(idQuestions).subscribe((answers) => {
              this.listQuestions[i].listAnswers = answers;
            });
          }
        });
    });
    //   this.client
    //     .get(environment.apiBaseUrl +'/hr/list-questions-by-test/' + this.idTest)
    //     .pipe(map((response) => JSON.parse(JSON.stringify(response))))
    //     .subscribe((data) => {
    //       console.log(data);
    //       this.listQuestions = data;
    //       for (let i = 0; i < this.listQuestions.length; i++) {
    //         this.getAnswers(this.listQuestions[i].idQuestions);
    //       }
    //     });
    // });
    this.getTestResults();
  }
  // getAnswers(questionId: number) {
  //   this.client
  //     .get(environment.apiBaseUrl +'/hr/list-answers/' + questionId)
  //     .subscribe((response) => {
  //       this.listAnswers = response;
  //     });
  // }
  getAnswers(idQuestions: number): Observable<any> {
    return this.client
      .get(environment.apiBaseUrl + 'hr/list-answers/' + idQuestions)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
  getScore() {
    if (this.scoreFetched) {
      return; // exit if the score has already been fetched
    }
    this.scoreFetched = true; // set flag to true after fetching the score
    this.route.params.subscribe((parameters: any) => {
      this.testId = parameters.id;
      let params = new HttpParams();

      params = params.append('testId', this.testId);
      this.client
        .get(environment.apiBaseUrl + 'hr/score/', { params: params })
        .subscribe((response) => {
          this.score = response;
        });
    });
  }
  getTestResults() {
    this.route.params.subscribe((parameters: any) => {
      this.testId = parameters.idTestAssignation;
      this.client
        .get(environment.apiBaseUrl + 'hr/testquestions/' + this.testId)
        .subscribe((testResults) => {
          this.selectedAnswers = testResults;
          console.log(testResults);
        });
    });
    // this.testResultService.getTestResultsByTestId(this.testId).subscribe(testResults => {
    //   this.testResults = testResults;
    // });
  }

  getAnswersCorrect(questionId: number) {
    this.client
      .get<{ correct: boolean }[]>(
        environment.apiBaseUrl + '/hr/list-answers/' + questionId
      )
      .subscribe((answers) => {
        this.correctAnswers = answers.filter((answer) => answer.correct);
        console.log(this.correctAnswers);
      });
  }
  getSelectedAnswer(questionId: number) {
    const selected = this.route.params.subscribe((parameters: any) => {
      this.testId = parameters.id;
      let params = new HttpParams();

      params = params.append('idQuestion', questionId);
      this.client
        .get(environment.apiBaseUrl + 'hr/testquestion/' + this.testId, {
          params: params,
        })
        .subscribe((response) => {
          this.listAnswers = response;
          console.log(this.listAnswers.anserWording);
        });
    });
    if (selected) {
      return this.listAnswers.anserWording;
    }
  }
  getAnswerClass(answer: any) {
    if (answer.answerWording === this.testResults?.anserWording) {
      return 'circled';
    } else {
      return this.testResults?.anwserWording === answer.anwserWording
        ? 'incorrect selected circled'
        : 'incorrect';
    }
  }

  isAnswerSelected(answer: any): boolean {
    const selectedAnswer = this.selectedAnswers.find(
      (selected: any) => selected.answers.idAnswers === answer.idAnswers
    );
    return selectedAnswer != null;
  }
  // getSelectedAnswer(questionId: number): { id: number; text: string } | null {
  //   const testResult = this.testResults.find(
  //     (result: { idQuestions: number; answerId: number }) =>
  //       result.idQuestions === questionId
  //   );
  //   if (testResult) {
  //     return this.correctAnswers.find(
  //       (answer: { id: number; text: string }) =>
  //         answer.id === testResult.answerId
  //     );
  //   }
  //   return null;
  // }

  isAnswerCorrect(questionId: number) {
    // const selectedAnswer = this.getSelectedAnswer(questionId);
    //  return selectedAnswer && selectedAnswer.correct;
  }

  isAnswerIncorrect(questionId: number) {
    // const selectedAnswer = this.getSelectedAnswer(questionId);
    //  return selectedAnswer && !selectedAnswer.correct;
  }
}
