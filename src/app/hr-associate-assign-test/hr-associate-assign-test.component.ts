import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenidentificationService } from '../token-identification.service';
import { CommonService } from '../common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hr-associate-assign-test',
  templateUrl: './hr-associate-assign-test.component.html',
  styleUrls: ['./hr-associate-assign-test.component.scss'],
})
export class HrAssociateAssignTestComponent {
  public user: any;
  public email: string = '';
  personID: any;
  listTests: any;
  listTestsAssigned: any;
  displayedColumns: string[] = [
    // 'idTest',
    'Name',
  ];

  displayedColumnsTestsAssigned: string[] = [
    // 'IdTestAssigned',
    'Name',
    'AssignationDate',
    'action'
  ];
  constructor(
    private route: ActivatedRoute,
    private client: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((parameters: any) => {
      this.personID = parameters.id;
      this.client
        .get(environment.apiBaseUrl + 'hr/candidate/' + this.personID)
        .subscribe((response) => (this.user = response));
    });
    this.getTestsListPage();
    this.getTestsListAssigned();
  }

  getScore() {
    console.log('ok');
    // let params = new HttpParams();

    // params = params.append('testId', testId);
    // this.client
    //   .get(environment.apiBaseUrl + 'hr/score/', { params: params })
    //   .subscribe((response) => console.log(response));
  }
  getTestsListPage() {
    this.commonService
      .getTestsList()
      .subscribe((reponse: any) => (this.listTests = reponse));
  }
  addTest(id: number) {
    console.log(id);

    this.route.params.subscribe((parameters: any) => {
      this.personID = parameters.id;
      let params = new HttpParams();

      params = params.append('candidateId', this.personID);
      params = params.append('testId', id);

      this.client
        .post(environment.apiBaseUrl + 'hr/test/assign', null, {
          params: params,
        })
        .subscribe((response) => {
          this.getTestsListAssigned();
        });
    });
  }

  getTestsListAssigned() {
    this.route.params.subscribe((parameters: any) => {
      this.personID = parameters.id;
      let params2 = new HttpParams();

      params2 = params2.append('candidateId', this.personID);
      this.client
        .get(environment.apiBaseUrl + 'hr/testassigned', { params: params2 })
        .subscribe((response) => {
          this.listTestsAssigned = response;
          console.log(response);
        });
    });
  }

  getTestListBySearch() {
    const searchBar = this.formControlSearch.value.search;
    let params = new HttpParams();
    params = params.append('search', searchBar);

    this.client
      .get(environment.apiBaseUrl + 'hr/list-test-by-search', {
        params: params,
      })
      .subscribe((reponse) => (this.listTests = reponse));
  }
  clearValue() {
    this.formControlSearch.get('search')?.setValue('');
    this.getTestListBySearch();
  }
  goToPageResult(testId: number) {
    this.router.navigateByUrl('hr-associate-test-result/' + testId);
  }
  deleteTestAssigned(id: number) {
    let params = new HttpParams();
    params = params.append('idTestAssignation', id);
    // params = params.append('candidateId', this.personID);
    this.client
      .post(environment.apiBaseUrl + 'hr/delete-testAssigned', null, {
        params: params,
      })
      .subscribe((response) => {
        // this.getTestsListPage();
        this.getTestsListAssigned();
      });
  }

  public formControlSearch: FormGroup = this.formBuilder.group({
    search: [''],
  });

  clitest(){
    alert("jjjj")
  }
}
