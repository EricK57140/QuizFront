import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TokenidentificationService } from '../token-identification.service';

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
    private formBuilder: FormBuilder
  ) {}

  public listTests: any = [];
  displayedColumns: string[] = ['idTest', 'Name', 'testToEdit', 'testToDelete'];
  public formControl: FormGroup = this.formBuilder.group({
    nameTest: ['', [Validators.required]],
  });

  editTest(id: number) {
    this.router.navigateByUrl('hr-associate-create-test/' + id);
  }

  deleteTest(id: number) {}

  getTestsList() {
    this.client
      .get('http://localhost:8080/hr/list-test')
      .subscribe((reponse) => (this.listTests = reponse));
  }

  saveTest() {
    const test = this.formControl.value;
    this.client
      .post('http://localhost:8080/hr/test/create', test)

      .subscribe(
        (response) => {
          alert('Test created');
          this.getTestsList();
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
    this.getTestsList();
  }
}
