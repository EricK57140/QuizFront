import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-hr-associate-create-question',
  templateUrl: './hr-associate-create-question.component.html',
  styleUrls: ['./hr-associate-create-question.component.scss'],
})
export class HrAssociateCreateQuestionComponent {
  public listTechnologies: any = [];
  public selectedTechnology: any;
  public technology: any;
  public idTechnology: number = 0;
  selectedIdTechonology: number = 0;
  idQuestions: any;
  public idQuestionsAnswer: number = 0;

  constructor(
    private route: ActivatedRoute,
    private client: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private commonService: CommonService
  ) {}

  public formControl: FormGroup = this.formBuilder.group({
    idTechnology: ['', [Validators.required]],
    questionTitle: ['', [Validators.required]],
    // scoreByQuestion: [
    //   '',
    //   [Validators.pattern('^[0-9]*$'), Validators.required],
    // ],
    timer: ['', [Validators.pattern('^[0-9]*$'), Validators.required]],
  });
  public formControlAnswer: FormGroup = this.formBuilder.group({
    idQuestions: [''],
    answerWording: ['', [Validators.required]],
    correct: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.commonService
      .getTechnologyList()
      .subscribe((response) => (this.listTechnologies = response));
  }

  technologySelected() {
    this.selectedIdTechonology = Number(this.selectedTechnology);
    console.log('id techno ' + this.selectedIdTechonology);
  }

  saveQuestion() {
    const questions = {
      questionTitle: this.formControl.get('questionTitle')?.value,
      // scoreByQuestion: this.formControl.get('scoreByQuestion')?.value,
      timer: this.formControl.get('timer')?.value,
    };

    console.log(questions);

    this.idTechnology = this.formControl.value.idTechnology;

    let params = new HttpParams();

    params = params.append('idTechnology', this.idTechnology);

    this.client
      .post(
        'http://localhost:8080/hr/question/create',
        questions,

        { params: params }
      )
      .subscribe(
        (response) => {
          this.idQuestions = response;
          this.formControlAnswer.get('idQuestions')?.setValue(this.idQuestions);
          this.router.navigateByUrl(
            'hr-associate-create-answers/' + this.idQuestions
          );
          alert('Question created');
          console.log(response);
        },
        (error) => {
          if (error.status === 404) {
            // Email does not exist, submit form
            alert('Email already exist');
          }
        }
      );
  }
  createAnswers(idQuestions: number) {
    this.router.navigateByUrl('hr-associate-create-answers/' + idQuestions);
  }
  saveAnswer() {
    if (this.formControlAnswer.valid) {
      const answer = {
        answerWording: this.formControlAnswer.get('answerWording')?.value,
        correct: this.formControlAnswer.get('correct')?.value,
      };

      console.log(answer);

      this.idQuestionsAnswer = this.formControlAnswer.value.idQuestions;

      let params2 = new HttpParams();

      params2 = params2.append('idQuestions', this.idQuestionsAnswer);

      this.client
        .post(
          'http://localhost:8080/hr/answer/create',
          answer,

          { params: params2 }
        )
        .subscribe(
          (response) => {
            alert('Answer created');
            console.log(response);
          },
          (error) => {
            if (error.status === 404) {
              // Email does not exist, submit form
              alert('Email already exist');
            }
          }
        );
    }
  }
}
