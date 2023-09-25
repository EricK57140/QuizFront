import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenidentificationService } from '../token-identification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-connexion-page',
  templateUrl: './connexion-page.component.html',
  styleUrls: ['./connexion-page.component.scss'],
})
export class ConnexionPageComponent implements OnInit {
  public hrAssociate: boolean = false;
  public Candidate: boolean = false;

  public formControl: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private client: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private tokenIdentification: TokenidentificationService
  ) {}

  ngOnInit(): void {}
  onConnexion(): void {
    if (this.formControl.valid) {
      const utilisateur = this.formControl.value;

      this.client
        .post('http://localhost:8080/connexion', utilisateur)
        .subscribe((resultat: any) => {
          if (resultat.erreur) {
            alert(resultat.erreur);
          } else {
            localStorage.setItem('token', resultat.token);
            //this.router.navigateByUrl("dashboard-hr-associate")
            this.tokenIdentification.refresh();
            this.hrAssociate =
              this.tokenIdentification.user.value.rights.includes('HR');
            this.Candidate =
              this.tokenIdentification.user.value.rights.includes('CANDIDATE');
            if (this.hrAssociate) {
              this.router.navigateByUrl('dashboard-hr-associate');
            } else if (this.Candidate) {
              this.router.navigateByUrl('dashboard-candidate');
            } else {
              this.router.navigateByUrl('no-access');
            }
          }
        });
    }
  }
}
