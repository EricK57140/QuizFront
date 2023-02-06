import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenidentificationService } from '../token-identification.service';

@Component({
  selector: 'app-hr-associate-candidates-page',
  templateUrl: './hr-associate-candidates-page.component.html',
  styleUrls: ['./hr-associate-candidates-page.component.scss'],
})
export class HrAssociateCandidatesPageComponent {
  public listPerson: any = [];
  public personID: number = 0;
  public email: string = '';
  public user: any;

  public hr: boolean = false;
  displayedColumns: string[] = [
    'personID',
    'Firstname',
    'name',
    'email',
    'candidateToEdit',
    'candidateTest',
    'candidateToDelete',
  ];
  disableSelect = new FormControl(false);
  constructor(
    private tokenIdentification: TokenidentificationService,
    private client: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCandidateList();
  }

  getCandidateList() {
    this.client
      .get('http://localhost:8080/hr/list-person')
      .subscribe((reponse) => (this.listPerson = reponse));
    this.user = this.tokenIdentification.user.value.rights.includes('HR');
    this.tokenIdentification.user.subscribe((user) => {
      if (user != null) {
        this.email = user.sub;
      } else {
        this.email = '';
      }
    });
  }

  redirection() {
    this.router.navigateByUrl('hr-associate-candidates-page');
  }
  onCreateCandidate() {
    this.router.navigateByUrl('hr-associate-create-candidate');
  }
  deleteCandidate(personID: number) {
    if (confirm('Are you sure to delete ')) {
      if (
        this.client
          .post('http://localhost:8080/hr/person/disable/' + personID, null)
          .subscribe()
      ) {
        this.user = null;
        alert('candiate succesfully deledted');
      }
    }
  }

  editCandidate(personID: number) {
    this.router.navigateByUrl('hr-associate-edit-candidate/' + personID);
  }
}
