import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionPageComponent } from './connexion-page/connexion-page.component';
import { MatTableModule } from '@angular/material/table';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { DashboardHrAssociateComponent } from './dashboard-hr-associate/dashboard-hr-associate.component';
import { TokenInterceptor } from './token.interceptor';
import { NoAccessComponent } from './no-access/no-access.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HrAssociateCreateCandidateComponent } from './hr-associate-create-candidate/hr-associate-create-candidate.component';
import { HrAssociateTopBannerComponent } from './hr-associate-top-banner/hr-associate-top-banner.component';
import { HrAssociateCandidatesPageComponent } from './hr-associate-candidates-page/hr-associate-candidates-page.component';
import { HrAssociateEditCandidateComponent } from './hr-associate-edit-candidate/hr-associate-edit-candidate.component';
import { HrAssociateQuestionsComponent } from './hr-associate-questions/hr-associate-questions.component';
import { HrAssociateTechnologiesComponent } from './hr-associate-technologies/hr-associate-technologies.component';
import { HrAssociateCreateQuestionComponent } from './hr-associate-create-question/hr-associate-create-question.component';
import { MatAccordion } from '@angular/material/expansion';
import { MatExpansionModule } from '@angular/material/expansion';
import { HrAssociateEditQuestionComponent } from './hr-associate-edit-question/hr-associate-edit-question.component';
import { HrAssociateCreateAnswersComponent } from './hr-associate-create-answers/hr-associate-create-answers.component';
import { HrAssociateTestComponent } from './hr-associate-test/hr-associate-test.component';
import { HrAssociateCreateTestComponent } from './hr-associate-create-test/hr-associate-create-test.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  declarations: [
    AppComponent,
    ConnexionPageComponent,
    DashboardHrAssociateComponent,
    NoAccessComponent,
    HrAssociateCreateCandidateComponent,
    HrAssociateTopBannerComponent,
    HrAssociateCandidatesPageComponent,
    HrAssociateEditCandidateComponent,
    HrAssociateQuestionsComponent,
    HrAssociateTechnologiesComponent,
    HrAssociateCreateQuestionComponent,
    HrAssociateEditQuestionComponent,
    HrAssociateCreateAnswersComponent,
    HrAssociateTestComponent,
    HrAssociateCreateTestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSelectModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
