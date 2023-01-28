import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenidentificationService } from '../token-identification.service';

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
    private formBuilder: FormBuilder
  ) {}

  public formControl: FormGroup = this.formBuilder.group({
    nameTechnology: ['', [Validators.required]],
  });

  getTechnologyList() {
    this.client
      .get('http://localhost:8080/hr/list-technology')
      .subscribe((reponse) => (this.listTechnologies = reponse));
    this.user = this.tokenIdentification.user.value.rights.includes('HR');
    this.tokenIdentification.user.subscribe((user) => {
      if (user != null) {
        this.email = user.sub;
      } else {
        this.email = '';
      }
    });
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
        //this.technology = null;
        alert('Technology succesfully deleted');
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
          },
          (error) => {
            if (error.status === 404) {
              // Email does not exist, submit form
              alert('ALready exist');
            }
          }
        );

      this.getTechnologyList();
    }
  }

  checkIfTechnologyExists() {
    const technology = this.formControl.value;
    this.nameTechnology = this.formControl.value.nameTechnology;
    this.client
      .get('http://localhost:8080/hr/nameTechnologyCheck', {
        params: { nameTechnology: this.nameTechnology },
      })
      .subscribe(
        (response) => {
          alert('Technology name already'), Error;
        },
        (error) => {
          if (error.status === 404) {
            // Email does not exist, submit form
          }
        }
      );
  }

  ngOnInit() {
    this.getTechnologyList();
  }
}
