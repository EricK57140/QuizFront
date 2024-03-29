import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { TokenidentificationService } from '../token-identification.service';
import { CommonService } from '../common.service';
import { environment } from 'src/environments/environment';
import {MatRadioModule} from '@angular/material/radio';

@Component({
  selector: 'app-hr-associate-test',
  templateUrl: './hr-associate-test.component.html',
  styleUrls: ['./hr-associate-test.component.scss'],
})
export class HrAssociateTestComponent {
  selectedTestsView: any;
  selectedSQLType: string = 'request1';
  personId: any;

  constructor(
    private route: ActivatedRoute,
    private tokenIdentification: TokenidentificationService,
    private client: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private commonService: CommonService
  ) {}
  public formControlSearch: FormGroup = this.formBuilder.group({
    search: [''],
  });
  public listTests: any = [];
  displayedColumns: string[] = [
    // 'idTest',
    'Name',
    'testToEdit',
    'tryTest',
    'testToDelete',
  ];
  public formControl: FormGroup = this.formBuilder.group({
    nameTest: ['', [Validators.required]],
  });

  editTest(id: number) {
    this.client
      .get(environment.apiBaseUrl + 'hr/verify-test-assignation', {
        params: { testId: id },
      })
      .subscribe(
        (response) => {
          if (
            confirm(
              'This test is alrerady assigned, would you like to create a copy you edit'
            )
          ) {
            this.client
              .post(environment.apiBaseUrl + 'hr/test/copy/' + id, null)
              .subscribe((response) => {
                this.getTestsListPage();
              });
            console.log('ok');
          } else {
            this.router.navigateByUrl('hr-associate-test/');
          }
        },
        (error) => {
          if (error.status === 404) {
            this.router.navigateByUrl('hr-associate-create-test/' + id);
          }
        }
      );
  }

  tryTest(id: number) {
    this.router.navigateByUrl('hr-associate-try-test/' + id);
  }
  deleteTest(id: number) {}

  getTestsListPage() {
    this.commonService
      .getTestsList()
      .subscribe((reponse: any) => (this.listTests = reponse));
  }

  getTestsListPageById() {
    this.route.params.subscribe((parameters: any) => {
      this.personId = parameters.id;
    this.commonService
      .getTestsListById(this.personId)
      .subscribe((reponse: any) => (this.listTests = reponse));
  })
  }
  saveTest() {
    const test = this.formControl.value;
    this.client
      .post(environment.apiBaseUrl + 'hr/test/create', test)

      .subscribe(
        (response) => {
          alert('Test created');
          this.getTestsListPage();
        },
        (error) => {
          if (error.status === 404) {
            // Email does not exist, submit form
            alert('Error');
          }
        }
      );
  }
  ngOnInit() {
    this.getTestsListPage();
    
    
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
    if (this.selectedSQLType === 'request1') {

    this.getTestsListPage();}
    else if (this.selectedSQLType === 'request2') {
      this.getTestsListPageById();
  }
}
  getTestsListBySearch() {
    if (this.selectedSQLType === 'request2') {
    this.route.params.subscribe((parameters: any) => {
      this.personId = parameters.id;
      const searchBar = this.formControlSearch.value.search;
      let params = new HttpParams();
      params = params.append('search', searchBar);

      this.client
        .get(
          environment.apiBaseUrl +
            'hr/listtest-searchbar/' +
            this.personId,
          { params: params }
        )
        .subscribe((reponse) => (this.listTests = reponse));
    });
  }  else if (this.selectedSQLType === 'request1') {
  
    const searchBar = this.formControlSearch.value.search;
    let params = new HttpParams();
    params = params.append('search', searchBar);

    this.client
      .get(environment.apiBaseUrl + 'hr/list-test-by-search', {
        params: params,
      })
      .subscribe((reponse) => (this.listTests = reponse));
 
  }
  }


  handleSQLRequest() {
    if (this.selectedSQLType === 'request1') {
  
      this.getTestsListPageById();
     
    } else if (this.selectedSQLType === 'request2') {
  
      this.getTestsListPage();
   
    }
  }
}
