import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenidentificationService } from '../token-identification.service';
import { CommonService } from '../common.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hr-associate-technologies',
  templateUrl: './hr-associate-technologies.component.html',
  styleUrls: ['./hr-associate-technologies.component.scss'],
})
export class HrAssociateTechnologiesComponent {
  public listTechnologies: any = [];
  public personID: number = 0;
  public email: string = '';
  public user: any;
  public technology: any;
  public hr: boolean = false;

  displayedColumns: string[] = [
    'idTechnology',
    'nameTechnology',
    'technologyToDelete',
  ];
  public nameTechnology: any;

  constructor(
    private tokenIdentification: TokenidentificationService,
    private client: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private commonService: CommonService,
    public translate: TranslateService
  ) {}

  public formControl: FormGroup = this.formBuilder.group({
    nameTechnology: ['', [Validators.required]],
  });

  getTechList() {
    this.commonService
      .getTechnologyList()
      .subscribe((response) => (this.listTechnologies = response));
  }
  deleTetechnology(idTechnology: number) {
    if (confirm('Are you sure to delete ')) {
      if (
        this.client
          .post(
            'http://localhost:8080/hr/technology/disable/' + idTechnology,
            null
          )
          .subscribe()
      ) {
        alert('Technology succesfully deleted');
        this.getTechList();
      }
    }
  }

  saveTechnology() {
    if (this.formControl.valid) {
      const technology = this.formControl.value;

      this.client
        .post('http://localhost:8080/hr/technology/create', technology)
        .subscribe(
          (response) => {
            alert('Technology saved'), Error;
            this.getTechList();
          },
          (error) => {
            if (error.status === 404) {
              alert('Already exist');
            }
          }
        );
    }
  }

  checkIfTechnologyExists() {
    const technology = this.formControl.value;
    this.nameTechnology = this.formControl.value.nameTechnology;
    this.client
      .get(environment.apiBaseUrl + 'hr/nameTechnologyCheck', {
        params: { nameTechnology: this.nameTechnology },
      })
      .subscribe(
        (response) => {
          alert('Technology name already exists'), Error;
        },
        (error) => {
          if (error.status === 404) {
            // Email does not exist, submit form
          }
        }
      );
  }

  ngOnInit() {
    this.getTechList();
  }
}
