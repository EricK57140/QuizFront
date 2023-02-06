import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionPageComponent } from './connexion-page/connexion-page.component';
import { DashboardHrAssociateComponent } from './dashboard-hr-associate/dashboard-hr-associate.component';
import { HrAssociateCandidatesPageComponent } from './hr-associate-candidates-page/hr-associate-candidates-page.component';
import { HrAssociateCreateAnswersComponent } from './hr-associate-create-answers/hr-associate-create-answers.component';
import { HrAssociateCreateCandidateComponent } from './hr-associate-create-candidate/hr-associate-create-candidate.component';
import { HrAssociateCreateQuestionComponent } from './hr-associate-create-question/hr-associate-create-question.component';
import { HrAssociateCreateTestComponent } from './hr-associate-create-test/hr-associate-create-test.component';
import { HrAssociateEditCandidateComponent } from './hr-associate-edit-candidate/hr-associate-edit-candidate.component';
import { HrAssociateEditQuestionComponent } from './hr-associate-edit-question/hr-associate-edit-question.component';
import { HrAssociateQuestionsComponent } from './hr-associate-questions/hr-associate-questions.component';
import { HrAssociateTechnologiesComponent } from './hr-associate-technologies/hr-associate-technologies.component';
import { HrAssociateTestComponent } from './hr-associate-test/hr-associate-test.component';
import { HrAssociateGuard } from './hr-associate.guard';
import { NoAccessComponent } from './no-access/no-access.component';

const routes: Routes = [
  { path: '', component: ConnexionPageComponent },
  {
    path: 'dashboard-hr-associate',
    component: DashboardHrAssociateComponent,
    canActivate: [HrAssociateGuard],
    runGuardsAndResolvers: 'always',
  },

  {
    path: 'no-access',
    component: NoAccessComponent,
  },
  {
    path: 'hr-associate-create-candidate',
    component: HrAssociateCreateCandidateComponent,
    canActivate: [HrAssociateGuard],
  },
  {
    path: 'hr-associate-candidates-page',
    component: HrAssociateCandidatesPageComponent,
    canActivate: [HrAssociateGuard],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'hr-associate-edit-candidate/:id',
    component: HrAssociateEditCandidateComponent,
    canActivate: [HrAssociateGuard],
  },
  {
    path: 'hr-associate-questions',
    component: HrAssociateQuestionsComponent,
    canActivate: [HrAssociateGuard],
  },
  {
    path: 'hr-associate-technologies',
    component: HrAssociateTechnologiesComponent,
    canActivate: [HrAssociateGuard],
  },
  {
    path: 'hr-associate-create-question',
    component: HrAssociateCreateQuestionComponent,
    canActivate: [HrAssociateGuard],
  },
  {
    path: 'hr-associate-edit-question/:id',
    component: HrAssociateEditQuestionComponent,
    canActivate: [HrAssociateGuard],
  },
  {
    path: 'hr-associate-create-answers/:id',
    component: HrAssociateCreateAnswersComponent,
    canActivate: [HrAssociateGuard],
  },
  {
    path: 'hr-associate-test',
    component: HrAssociateTestComponent,
    canActivate: [HrAssociateGuard],
  },
  {
    path: 'hr-associate-create-test/:id',
    component: HrAssociateCreateTestComponent,
    canActivate: [HrAssociateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
