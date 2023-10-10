import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TokenidentificationService } from '../token-identification.service';
import { CommonService } from '../common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hr-associate-test',
  templateUrl: './hr-associate-test.component.html',
  styleUrls: ['./hr-associate-test.component.scss'],
})
export class HrAssociateTestComponent {
  constructor(
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

  saveTest() {
    const test = this.formControl.value;
    this.client
      .post(environment.apiBaseUrl +'/hr/test/create', test)

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
    this.getTestsListPage();
  }
}
