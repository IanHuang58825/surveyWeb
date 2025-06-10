import { Routes } from '@angular/router';
import { AdminTabsComponent } from './admin/admin-tabs/admin-tabs.component';
import { BuildComponent } from './admin/admin-tabs/build/build.component';
import { PreviewQuesComponent } from './admin/admin-tabs/preview-ques/preview-ques.component';
import { AdminComponent } from './admin/admin/admin.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LoginComponent } from './admin/login/login.component';
import { FrontComponent } from './front/front/front.component';
import { FillinComponent } from './front/survey-tabs/fillin/fillin.component';
import { PreviewAnsComponent } from './front/survey-tabs/preview-ans/preview-ans.component';
import { SurveyTabsComponent } from './front/survey-tabs/survey-tabs.component';
import { HomeComponent } from './home/home.component';
import { UpdateTabsComponent } from './admin/update-tabs/update-tabs.component';
import { UpdateQuesComponent } from './admin/update-tabs/update-ques/update-ques.component';
import { PreviewUpdateComponent } from './admin/update-tabs/preview-update/preview-update.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  {
    path: 'adminTabs', component: AdminTabsComponent,
    children: [
      { path: 'build', component: BuildComponent },
      { path: 'previewQues', component: PreviewQuesComponent }
    ]
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'front', component: FrontComponent },
  {
    path: 'surveyTabs', component: SurveyTabsComponent,
    children: [
      { path: 'fillin', component: FillinComponent },
      { path: 'previewAns', component: PreviewAnsComponent }
    ]
  },{
    path: 'updateTabs', component: UpdateTabsComponent,
    children: [
      { path: 'updateBuild', component: UpdateQuesComponent },
      { path: 'previewUpdate', component: PreviewUpdateComponent }
    ]
  },
  {path: 'register', component: RegisterComponent},
  { path: '', redirectTo: "/home", pathMatch: 'full' }
];
