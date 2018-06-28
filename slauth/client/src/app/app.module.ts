import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppServices } from './app.services';
import { NotifyService } from './notify.service';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './not-found.component';

import { HeaderWmsComponent } from './layout/header-wms/header-wms.component';
import { TopMenuWmsComponent } from './layout/top-menu-wms/top-menu-wms.component';
import { FooterWmsComponent } from './layout/footer-wms/footer-wms.component';
import { FooterTmsComponent } from './layout/footer-tms/footer-tms.component';
import { TopMenuTmsComponent } from './layout/top-menu-tms/top-menu-tms.component';
import { HeaderTmsComponent } from './layout/header-tms/header-tms.component';
import { FooterSemComponent } from './layout/footer-sem/footer-sem.component';
import { HeaderSemComponent } from './layout/header-sem/header-sem.component';
import { TopMenuSemComponent } from './layout/top-menu-sem/top-menu-sem.component';

import { MainHomeComponent } from './main/main-home/main-home.component';
import { MainWmsLoginComponent } from './main/main-wms-login/main-wms-login.component';
import { MainTmsLoginComponent } from './main/main-tms-login/main-tms-login.component';
import { MainWmsSolutionComponent } from './main/main-wms-solution/main-wms-solution.component';
import { MainWmsTrialComponent } from './main/main-wms-trial/main-wms-trial.component';
import { MainWmsAboutComponent } from './main/main-wms-about/main-wms-about.component';
import { MainWmsTestimonialsComponent } from './main/main-wms-testimonials/main-wms-testimonials.component';
import { MainWmsContactComponent } from './main/main-wms-contact/main-wms-contact.component';
import { MainTmsAboutComponent } from './main/main-tms-about/main-tms-about.component';
import { MainTmsContactComponent } from './main/main-tms-contact/main-tms-contact.component';
import { MainTmsSolutionComponent } from './main/main-tms-solution/main-tms-solution.component';
import { MainTmsTestimonialsComponent } from './main/main-tms-testimonials/main-tms-testimonials.component';
import { MainTmsTrialComponent } from './main/main-tms-trial/main-tms-trial.component';
import { MainSemAboutComponent } from './main/main-sem-about/main-sem-about.component';
import { MainSemContactComponent } from './main/main-sem-contact/main-sem-contact.component';
import { MainSemLoginComponent } from './main/main-sem-login/main-sem-login.component';
import { MainSemSolutionComponent } from './main/main-sem-solution/main-sem-solution.component';
import { MainSemTestimonialsComponent } from './main/main-sem-testimonials/main-sem-testimonials.component';
import { MainSemTrialComponent } from './main/main-sem-trial/main-sem-trial.component';
import { MainWmsSignupComponent } from './main/main-wms-signup/main-wms-signup.component';
import { MainSemSignupComponent } from './main/main-sem-signup/main-sem-signup.component';


const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'main/home', component: MainHomeComponent },

  { path: 'main/wms-login', component: MainWmsLoginComponent },
  { path: 'main/wms-signup', component: MainWmsSignupComponent },
  { path: 'main/wms-solution', component: MainWmsSolutionComponent },
  { path: 'main/wms-trial', component: MainWmsTrialComponent },
  { path: 'main/wms-about', component: MainWmsAboutComponent },
  { path: 'main/wms-contact', component: MainWmsContactComponent },
  { path: 'main/wms-testimonials', component: MainWmsTestimonialsComponent },

  { path: 'main/tms-login', component: MainTmsLoginComponent },
  { path: 'main/tms-solution', component: MainTmsSolutionComponent },
  { path: 'main/tms-trial', component: MainTmsTrialComponent },
  { path: 'main/tms-about', component: MainTmsAboutComponent },
  { path: 'main/tms-contact', component: MainTmsContactComponent },
  { path: 'main/tms-testimonials', component: MainTmsTestimonialsComponent },

  { path: 'main/sem-login', component: MainSemLoginComponent },
  { path: 'main/sem-signup', component: MainSemSignupComponent },
  { path: 'main/sem-solution', component: MainSemSolutionComponent },
  { path: 'main/sem-trial', component: MainSemTrialComponent },
  { path: 'main/sem-about', component: MainSemAboutComponent },
  { path: 'main/sem-contact', component: MainSemContactComponent },
  { path: 'main/sem-testimonials', component: MainSemTestimonialsComponent },

  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HeaderWmsComponent,
    TopMenuWmsComponent,
    FooterWmsComponent,
    FooterTmsComponent,
    TopMenuTmsComponent,
    HeaderTmsComponent,
    MainHomeComponent,
    MainWmsLoginComponent,
    MainWmsSolutionComponent,
    MainWmsTrialComponent,
    MainWmsAboutComponent,
    MainWmsTestimonialsComponent,
    MainWmsContactComponent,
    MainTmsAboutComponent,
    MainTmsContactComponent,
    MainTmsSolutionComponent,
    MainTmsTestimonialsComponent,
    MainTmsTrialComponent,
    MainTmsLoginComponent,
    MainSemAboutComponent,
    MainSemContactComponent,
    MainSemLoginComponent,
    MainSemSolutionComponent,
    MainSemTestimonialsComponent,
    MainSemTrialComponent,
    FooterSemComponent,
    HeaderSemComponent,
    TopMenuSemComponent,
    MainWmsSignupComponent,
    MainSemSignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AppServices, NotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
