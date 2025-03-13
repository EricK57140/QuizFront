import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectableObservable, isEmpty } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hr-associate-edit-candidate',
  templateUrl: './hr-associate-edit-candidate.component.html',
  styleUrls: ['./hr-associate-edit-candidate.component.scss'],
})
export class HrAssociateEditCandidateComponent {
  public formControl: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    firstName: ['', Validators.required],
  });

  //private personID: number = 0;
  public user: any;
  public email: string = '';
  personID: any;
  name: any;
  firstName: any;
  constructor(
    private route: ActivatedRoute,
    private client: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((parameters: any) => {
      this.personID = parameters.id;
      this.client
        .get(environment.apiBaseUrl + 'hr/candidate/' + this.personID)
        .subscribe((response) => {
          this.user = response;
          console.log(response);
          this.formControl.patchValue(this.user);
          // this.formControl.get('name')?.setValue(this.user.name);
          // this.formControl.get('firstName')?.setValue(this.user.firstName);
        });
    });
  }

  onModification(
    personID: number,
    name: string
    //  , firstName: String
  ) {
    const user = this.formControl.value;
    user.id = this.personID;

    this.client
      .post(
        environment.apiBaseUrl +
          '/hr/modifycandidate/' +
          this.personID +
          '/' +
          user.name,

        null
      )
      .subscribe();
    this.router.navigate(['hr-associate-candidates-page']);
    alert('Candidate modified');
  }

  onModification1(personID: number) {
    const user1 = this.formControl.value;
    user1.id = this.personID;

    this.name = this.formControl.value.name;
    this.firstName = this.formControl.value.firstName;

    let params = new HttpParams();

    params = params.append('name', this.formControl.value.name);
    params = params.append('firstName', this.formControl.value.firstName);

    this.client
      .post(
        environment.apiBaseUrl + '/hr/modifycandidate/' + this.personID,
        null,

        { params: params }
      )
      .subscribe(
        (response) => {
          alert('Candidate modified');
          this.router.navigate(['hr-associate-candidates-page']), Error;
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
