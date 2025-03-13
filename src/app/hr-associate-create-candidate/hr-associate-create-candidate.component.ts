import { Component, Inject, NgModule } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MatDialogRef,
  MatDialogClose,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CandidateService } from '../services/candidate.service';
import { User } from '../models/user';
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
  user = new User();
  constructor(
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<HrAssociateCreateCandidateComponent>,
    public dialog: MatDialog,
    public candidateService: CandidateService
  ) {}

  ngOnInit(): void {
    this.personID = this.data.personID;
    console.log(this.data);
  }

  save() {
    if (this.candidateService.form.valid) {
      this.user = this.candidateService.form.value;

      this.candidateService.createCandidate(this.user).subscribe({
        next: () => {
          alert('Candidate saved');
          this.closeDialog();
          this.get();
          // window.location.reload();
        },
        error: (err) => {
          console.error('Error saving file status:', err);
        },
      });
    }
  }
  get() {
    this.candidateService.getCandidateListByIdHr(this.personID);
    console.log('tttttttttttttttttttttttttttttt');
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
