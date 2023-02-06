import { AnimateTimings } from '@angular/animations';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-hr-associate-create-answers',
  templateUrl: './hr-associate-create-answers.component.html',
  styleUrls: ['./hr-associate-create-answers.component.scss'],
})
export class HrAssociateCreateAnswersComponent {
  personID: any;
  public questions: any;
  public answer: any;
  public email: string = '';
  public question: any;
  public answers: any;
  public listTechnologies: any = [];
  public selectedTechnology: String = '';
  public selectedCorrect: String = '';
  public technology: any;
  displayedColumns: string[] = [
    // 'idAnswers',
    'answerWording',
    'correct',
    'answerToEdit',
    'answerToDelete',
  ];
  public listAnswers: any = [];
  public idTechnology: number = 0;
  selectedIdTechnology: number = 0;
  injectedId = 1;
  public questionID: number = 0;
  public formControl: FormGroup = this.formBuilder.group({
    idQuestions: ['', [Validators.required]],
    idTechnology: ['', [Validators.required]],
    questionTitle: ['', [Validators.required]],
    scoreByQuestion: [
      '',
      [Validators.pattern('^[0-9]*$'), Validators.required],
    ],
    timer: ['', [Validators.pattern('^[0-9]*$'), Validators.required]],
  });
  public formControlAnswer: FormGroup = this.formBuilder.group({
    idAnswers: ['', [Validators.required]],
    answerWording: ['', [Validators.required]],
    correct: ['', [Validators.required]],
  });

  constructor(
    private route: ActivatedRoute,
    private client: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getQuestion();
  }
  technologySelected() {
    this.selectedIdTechnology = Number(this.selectedTechnology);
    console.log('id techno ' + this.selectedIdTechnology);
  }
  saveQuestion() {
    const question1 = this.formControl.value;
    this.idTechnology = this.formControl.value.idTechnology;
    this.formControl.value.idQuestions = this.question.idQuestions;
    let params = new HttpParams();
    params = params.append('idTechnology', this.idTechnology);

    this.client
      .post('http://localhost:8080/hr/question/create', question1, {
        params: params,
      })
      .subscribe(
        (response) => {
          alert('Question modified');

          this.getQuestion();
        },
        (error) => {
          if (error.status === 404) {
            // Email does not exist, submit form
            alert('Email already exist');
          }
        }
      );
  }

  getQuestion() {
    this.route.params.subscribe((parameters: any) => {
      this.questionID = parameters.id;
      this.client
        .get('http://localhost:8080/hr/question/' + this.questionID)
        .subscribe((response) => {
          this.question = response;
          this.formControl
            .get('questionTitle')
            ?.setValue(this.question.questionTitle);
          this.formControl
            .get('scoreByQuestion')
            ?.setValue(this.question.scoreByQuestion);

          this.formControl.get('timer')?.setValue(this.question.timer);
        });
      this.client
        .get('http://localhost:8080/hr/list-answers/' + this.questionID)
        .subscribe((response) => {
          this.listAnswers = response;
        });
    });

    this.client
      .get('http://localhost:8080/hr/list-technology')
      .subscribe((reponse) => {
        this.listTechnologies = reponse;
      });
  }

  getAnswers() {
    this.route.params.subscribe((parameters: any) => {
      this.questionID = parameters.id;

      this.client
        .get('http://localhost:8080/hr/list-answers/' + this.questionID)
        .subscribe((response) => {
          this.listAnswers = response;
        });
    });
  }
  // correctSelected() {
  //   if (this.selectedCorrect === 'no') {
  //     this.formControlAnswer.value.correct === false;
  //   }
  //}
  saveAnswer() {
    this.route.params.subscribe((parameters: any) => {
      this.questionID = parameters.id;
      const answerToSend = this.formControlAnswer.value;

      let params2 = new HttpParams();
      params2 = params2.append('idQuestions', this.questionID);

      this.client
        .post('http://localhost:8080/hr/answer/create', answerToSend, {
          params: params2,
        })
        .subscribe(
          (response) => {
            alert('Answer saved');
            this.getQuestion();
          },
          (error) => {
            if (error.status === 404) {
              // Email does not exist, submit form
              alert('Email already exist');
            }
          }
        );
    });
  }

  selectAnswer(idAnswers: number) {
    console.log(idAnswers);

    this.client
      .get('http://localhost:8080/hr/answer/' + idAnswers)
      .subscribe((response) => {
        this.answer = response;
        this.formControlAnswer
          .get('idAnswers')
          ?.setValue(this.answer.idAnswers);

        this.formControlAnswer
          .get('answerWording')
          ?.setValue(this.answer.answerWording);

        if (this.answer.correct == true) {
          this.formControlAnswer.get('correct')?.setValue('true');
        } else if (this.answer.correct == false) {
          this.formControlAnswer.get('correct')?.setValue('false');
        }
      });
  }

  clear() {
    this.formControlAnswer.get('idAnswers')?.setValue('');

    this.formControlAnswer.get('answerWording')?.setValue('');
    this.formControlAnswer.get('correct')?.setValue('');
  }

  deleteAnswer(id: number) {
    if (confirm('Are you sure to delete ')) {
      if (
        this.client
          .post('http://localhost:8080/hr/answer/disable/' + id, null)
          .subscribe()
      ) {
        alert('answer succesfully deleted');
        this.getQuestion();
      }
    }
  }
}
