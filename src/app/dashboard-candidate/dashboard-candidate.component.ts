import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CommonService } from '../common.service';
import { TokenidentificationService } from '../token-identification.service';

@Component({
  selector: 'app-dashboard-candidate',
  templateUrl: './dashboard-candidate.component.html',
  styleUrls: ['./dashboard-candidate.component.scss'],
})
export class DashboardCandidateComponent {
  public user: any;
  public email: string = '';
  public userConnexion: any;
  personID: any;
  listTests: any;
  listTestsAssigned: any;
  displayedColumns: string[] = [
    // 'IdTestAssigned',
    'Name',
    'AssignationDate',
  ];

  constructor(
    private tokenIdentification: TokenidentificationService,
    private route: ActivatedRoute,
    private client: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.user =
      this.tokenIdentification.user.value.rights.includes('CANDIDATE');
    this.tokenIdentification.user.subscribe((user) => {
      if (user != null) {
        this.email = user.sub;
      } else {
        this.email = '';
      }
    });

    this.getTestsListAssigned();
  }

  getTestsListAssigned() {
    this.client
      .get(environment.apiBaseUrl + 'candidate/id/' + this.email)
      .subscribe((reponse) => {
        this.personID = reponse;
        console.log(this.personID);

        let params = new HttpParams();
        params = params.append('candidateId', this.personID.toString());
        this.client
          .get(environment.apiBaseUrl + 'candidate/testAssigned', {
            params: params,
          })
          .subscribe((response) => {
            this.listTestsAssigned = response;
            console.log(response);
          });
      });
  }

  takeTest(id: number) {
    this.router.navigateByUrl('candidate-pass-test/' + id);
  }
}
