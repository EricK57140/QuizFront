import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenidentificationService } from '../token-identification.service';

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

  public hr: boolean = false;
  displayedColumns: string[] = [
    'idQuestions',
    'questionTitle',
    'scoreByQuestion',
    'timer',
    'technology.nameTechnology',
    'questionToEdit',
    'questionToDelete',
  ];

  constructor(
    private tokenIdentification: TokenidentificationService,
    private client: HttpClient,
    private router: Router
  ) {}

  editQuestion(idQuestions: number) {
    this.router.navigateByUrl('hr-associate-create-answers/' + idQuestions);
  }

  deleteQuestion(idQuestions: number) {}

  getQuestionList() {
    this.client
      .get('http://localhost:8080/hr/list-questions')
      .subscribe((reponse) => (this.listQuestions = reponse));
    this.user = this.tokenIdentification.user.value.rights.includes('HR');
    this.tokenIdentification.user.subscribe((user) => {
      if (user != null) {
        this.email = user.sub;
      } else {
        this.email = '';
      }
    });
  }

  ngOnInit(): void {
    this.getQuestionList();
  }
}
