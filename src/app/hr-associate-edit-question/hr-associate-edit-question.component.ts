import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hr-associate-edit-question',
  templateUrl: './hr-associate-edit-question.component.html',
  styleUrls: ['./hr-associate-edit-question.component.scss'],
})
export class HrAssociateEditQuestionComponent {
  personID: any;
  public listAnswers: any = [];
  public email: string = '';
  public question: any;
  public listTechnologies: any = [];
  public selectedTechnology: String = '';
  public technology: any;
  displayedColumns: string[] = ['answerWording', 'correct'];

  public idTechnology: number = 0;
  selectedIdTechnology: number = 0;
  injectedId = 1;
  public questionID: number = 0;
  constructor(
    private route: ActivatedRoute,
    private client: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  public formControl: FormGroup = this.formBuilder.group({
    idQuestions: ['', [Validators.required]],
    idTechnology: ['', [Validators.required]],
    questionTitle: ['', [Validators.required]],
    scoreByQuestion: [
      '',
      [Validators.pattern('^[0-9]*$'), Validators.required],
    ],
    timer: ['', [Validators.pattern('^[0-9]*$'), Validators.required]],

    answerWording: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.route.params.subscribe((parameters: any) => {
      this.questionID = parameters.id;
      this.client
        .get(environment.apiBaseUrl +'/hr/question/' + this.questionID)
        .subscribe((response) => {
          this.question = response;
          this.formControl
            .get('questionTitle')
            ?.setValue(this.question.questionTitle);
          this.formControl
            .get('scoreByQuestion')
            ?.setValue(this.question.scoreByQuestion);

          this.formControl.get('timer')?.setValue(this.question.timer);

          this.listAnswers = this.question.listAnswers;

          this.formControl
            .get('listAnswers.answerWording')
            ?.setValue(this.question?.listAnswers.answerWording);

          console.log('ee');
          console.log(this.question.listAnswers);
        });
    });
    //this.selectedTechnology = this.question.technology.nameTechnology;
    this.client
      .get(environment.apiBaseUrl +'/hr/list-technology')
      .subscribe((reponse) => {
        this.listTechnologies = reponse;
      });
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
      .post(environment.apiBaseUrl +'/hr/question/create', question1, {
        params: params,
      })
      .subscribe(
        (response) => {
          alert('Question modified');
          this.router.navigate(['hr-associate-questions']), Error;
        },
        (error) => {
          if (error.status === 404) {
            // Email does not exist, submit form
            alert('Email already exist');
          }
        }
      );
  }
  // }
}
