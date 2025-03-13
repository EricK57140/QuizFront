import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenidentificationService } from '../token-identification.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { HrAssociateCreateCandidateComponent } from '../hr-associate-create-candidate/hr-associate-create-candidate.component';
import { CandidateService } from '../services/candidate.service';

@Component({
  selector: 'app-hr-associate-candidates-page',
  templateUrl: './hr-associate-candidates-page.component.html',
  styleUrls: ['./hr-associate-candidates-page.component.scss'],
})
export class HrAssociateCandidatesPageComponent {
  public listPerson: any = [];
  public userConnexion: any;
  personID: any;
  public email: string = '';
  public user: any;
  public formControlSearch: FormGroup = this.formBuilder.group({
    search: [''],
  });
  public hr: boolean = false;
  displayedColumns: string[] = [
    //'personID',
    'Firstname',
    'name',
    'email',
    'actions',
  ];
  disableSelect = new FormControl(false);

  constructor(
    private route: ActivatedRoute,
    private tokenIdentification: TokenidentificationService,
    private client: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private candidateService: CandidateService
  ) {}

  ngOnInit(): void {
    this.user = this.tokenIdentification.user.value.rights.includes('HR');
    this.tokenIdentification.user.subscribe({
      next: (user) => {
        if (user != null) {
          this.email = user.sub;

          this.client
            .get(environment.apiBaseUrl + 'hr/email/' + this.email)
            .subscribe((response) => {
              this.userConnexion = response;
              console.log(response);
              this.personID = this.userConnexion.personID;
              console.log(this.personID); // Move this line inside the subscribe block
              //  this.getCandidateListByIdHr(this.personID); // Move this line inside the subscribe block
              this.get();
            });
        } else {
          this.email = '';
        }
      },
    });
    this.candidateService.candidateList$.subscribe((data) => {
      this.listPerson = data;
    });
  }

  getCandidateList() {
    this.client
      .get(environment.apiBaseUrl + 'hr/list-candidate')
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
    this.dialog.open(HrAssociateCreateCandidateComponent, {
      data: { personID: this.personID },
    });
  }
  deleteCandidate(personID: number) {
    if (confirm('Are you sure to delete ')) {
      if (
        this.client
          .post(environment.apiBaseUrl + '/hr/person/disable/' + personID, null)
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
  assignTestToCandidate(personID: number) {
    this.router.navigateByUrl('hr-associate-assign-test/' + personID);
  }
  getCandidateListBySearch() {
    const searchBar = this.formControlSearch.value.search;

    let params = new HttpParams();
    params = params.append('search', searchBar);

    this.client
      .get(environment.apiBaseUrl + 'hr/candidates-by-searchbar/', {
        params: params,
      })
      .subscribe((reponse) => (this.listPerson = reponse));
  }
  clearValue() {
    this.formControlSearch.get('search')?.setValue('');
    this.getCandidateList();
  }

  getCandidateListByIdHr(personID: number) {
    // this.personID = this.userConnexion.personID;
    this.client
      .get(environment.apiBaseUrl + 'hr/list-candidate-hr/' + personID)
      .subscribe((reponse) => {
        (this.listPerson = reponse), console.log(reponse);
      });
  }

  get() {
    this.candidateService.getCandidateListByIdHr(this.personID);
  }
}
