import { Component } from '@angular/core';
import { TokenidentificationService } from './token-identification.service';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorage } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'QuizFront';
  public t: string = '';
  public email: string = '';

  constructor(
    private tokenIdentification: TokenidentificationService,
    private localStorage: LocalStorage,
    public translate: TranslateService
  ) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
  }
  public langue: any;
  // switchLanguage(lang: string) {
  //   this.translate.use(lang);
  //   console.log(lang);
  //   this.localStorage.setItem('language', lang).subscribe(() => {});
  // }

  ngOnInit() {
    this.tokenIdentification.user.subscribe((user) => {
      if (user != null) {
        this.email = user.sub;
      } else {
        this.email = '';
      }
    });

    this.tokenIdentification.refresh();
    // this.localStorage.getItem('language').subscribe((lang) => {
    //   if (lang) {
    //     const t = JSON.parse('"' + lang + '"');
    //     console.log(t);
    //     this.translate.use(t);
    //   }
    // });
  }
}
