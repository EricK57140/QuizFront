import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenidentificationService } from '../token-identification.service';

@Component({
  selector: 'app-dashboard-hr-associate',
  templateUrl: './dashboard-hr-associate.component.html',
  styleUrls: ['./dashboard-hr-associate.component.scss']
})
export class DashboardHrAssociateComponent implements OnInit{
  public listPerson: any = [];
  public personID: number = 0;
  public email: string = "";
  public user : any ;
  public userConnexion : any;
  public hr : boolean = false;
  displayedColumns: string[] = ["Firstname","name","email"];
  disableSelect = new FormControl(false);
  constructor( private tokenIdentification : TokenidentificationService,
    private client : HttpClient,
    private router : Router) {}

  ngOnInit(): void {


    this.client.get("http://localhost:8080/hr/list-person").subscribe(reponse => this.listPerson = reponse);

    this.user  = this.tokenIdentification.user.value.rights.includes('HR');
    this.tokenIdentification.user.subscribe(
      user => {
        if (user != null) {
          this.email = user.sub
        } else {
          this.email = "";
        }
      }
    )

    this.client.get("http://localhost:8080/hr/email/" + this.email).subscribe(reponse => this.userConnexion = reponse);


  }

  onCreateCandidate() {
    this.router.navigateByUrl('hr-associate-create-candidate');
  }

  deconnexion(): void {
    this.router.navigateByUrl('');
  }

  onReservation() {}

  onStock() {}
}
