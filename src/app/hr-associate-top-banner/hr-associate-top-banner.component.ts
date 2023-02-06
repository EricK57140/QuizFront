import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenidentificationService } from '../token-identification.service';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
@Component({
  selector: 'app-hr-associate-top-banner',
  templateUrl: './hr-associate-top-banner.component.html',
  styleUrls: ['./hr-associate-top-banner.component.scss'],
})
export class HrAssociateTopBannerComponent {
  public personID: number = 0;
  public email: string = '';
  public user: any;
  public userConnexion: any;
  public hr: boolean = false;

  constructor(
    private tokenIdentification: TokenidentificationService,
    private client: HttpClient,
    private router: Router,
    private localStorage: LocalStorage,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'fr', 'ch']);
    translate.setDefaultLang('en');
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
    this.localStorage.setItem('language', lang).subscribe(() => {});
  }

  ngOnInit(): void {
    this.user = this.tokenIdentification.user.value.rights.includes('HR');
    this.tokenIdentification.user.subscribe((user) => {
      if (user != null) {
        this.email = user.sub;
      } else {
        this.email = '';
      }
    });

    this.client
      .get('http://localhost:8080/hr/email/' + this.email)
      .subscribe((reponse) => (this.userConnexion = reponse));

    this.localStorage.getItem('language').subscribe((lang) => {
      if (lang) {
        const t = JSON.parse('"' + lang + '"');
        console.log(t);
        this.translate.use(t);
      }
    });
  }
}
