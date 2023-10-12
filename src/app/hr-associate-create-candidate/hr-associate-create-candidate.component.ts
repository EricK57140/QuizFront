import { HttpClient } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { EMPTY, Observable } from 'rxjs';
import { EMPTY_SUBSCRIPTION } from 'rxjs/internal/Subscription';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-hr-associate-create-candidate',
  templateUrl: './hr-associate-create-candidate.component.html',
  styleUrls: ['./hr-associate-create-candidate.component.scss'],
})
export class HrAssociateCreateCandidateComponent {
  public x: any = '';

  personID: any;
  public listPerson: any = [];
  public email: string = '';
  public emailToCheck: any;
  public z: string = '';
  constructor(
    private route: ActivatedRoute,
    private client: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  public formControl: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });

  ngOnInit(): void {}

  save() {
    if (this.formControl.valid) {
      const user = this.formControl.value;

      this.client
        .post(environment.apiBaseUrl + 'hr/createcandidateaccount', user)
        .subscribe(
          (response) => {
            alert('Candidate saved');
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
}
