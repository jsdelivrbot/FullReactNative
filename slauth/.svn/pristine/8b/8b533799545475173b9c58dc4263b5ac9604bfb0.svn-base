import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { Ng2CompleterModule } from "ng2-completer";

import { AppServices } from './app.services';
import { NotifyService } from './notify.service';

import { JSONtoDictionaryPipe } from './pipes/JSONtoDictionary.pipe';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './not-found.component';

import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { LeftMenuComponent } from './layout/left-menu/left-menu.component';
import { TopMenuComponent } from './layout/top-menu/top-menu.component';

// Begin Header Client
import { HeaderWmsComponent } from './layout/header-wms/header-wms.component';
import { TopMenuWmsComponent } from './layout/top-menu-wms/top-menu-wms.component';
import { FooterWmsComponent } from './layout/footer-wms/footer-wms.component';
import { FooterTmsComponent } from './layout/footer-tms/footer-tms.component';
import { TopMenuTmsComponent } from './layout/top-menu-tms/top-menu-tms.component';
import { HeaderTmsComponent } from './layout/header-tms/header-tms.component';
import { FooterSemComponent } from './layout/footer-sem/footer-sem.component';
import { HeaderSemComponent } from './layout/header-sem/header-sem.component';
import { TopMenuSemComponent } from './layout/top-menu-sem/top-menu-sem.component';
// End Header Client

import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminMenuComponent } from './admin/admin-menu/admin-menu.component';
import { AdminRolesComponent } from './admin/admin-roles/admin-roles.component';
import { AdminWarehouseComponent } from './admin/admin-warehouse/admin-warehouse.component';
import { AdminOwnerComponent } from './admin/admin-owner/admin-owner.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminUsersmanagementComponent } from './admin/admin-usersmanagement/admin-usersmanagement.component';
import { AdminAppsComponent } from './admin/admin-apps/admin-apps.component';
import { AdminRolesmanagementComponent } from './admin/admin-rolesmanagement/admin-rolesmanagement.component';
import { AdminSystemUsersComponent } from './admin/admin-systemusers/admin-systemusers.component';
import { AdminMailComponent } from './admin/admin-mail/admin-mail.component';
import { AdminSystemcodeComponent } from './admin/admin-systemcode/admin-systemcode.component';
import { AdminDomainComponent } from './admin/admin-domain/admin-domain.component';

// Begin Body Client
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
// End Body Client

import { AuthManager } from './auth/auth.manager';
import { AuthService } from './auth/auth.service'

import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2MapModule} from 'ng2-map';

import { ModalService } from './popup/modal.service';
import { ModalComponent } from './popup/modal.component';

import { PopupCityComponent } from './popup/popup-city/popup-city.component';
import { PopupDistrictComponent } from './popup/popup-district/popup-district.component';
import { PopupWardComponent } from './popup/popup-ward/popup-ward.component';

const appRoutes: Routes = [
  { path: '', redirectTo:'main/home', pathMatch:'full'  },
  { path: 'admin/login', component: AdminLoginComponent, canActivate: [AuthManager] },
  { path: 'admin/home', component: AdminHomeComponent, canActivate: [AuthManager] },
  { path: 'admin/systemusers', component: AdminSystemUsersComponent, canActivate: [AuthManager] },
  { path: 'admin/mail', component: AdminMailComponent, canActivate: [AuthManager] },
  { path: 'admin/menu', component: AdminMenuComponent, canActivate: [AuthManager] },
  { path: 'admin/roles', component: AdminRolesComponent, canActivate: [AuthManager] },
  { path: 'admin/warehouse', component: AdminWarehouseComponent, canActivate: [AuthManager] },
  { path: 'admin/owner', component: AdminOwnerComponent, canActivate: [AuthManager] },
  { path: 'admin/users', component: AdminUsersComponent, canActivate: [AuthManager] },
  { path: 'admin/users/:id', component: AdminUsersmanagementComponent, canActivate: [AuthManager] },
  { path: 'admin/apps', component: AdminAppsComponent, canActivate: [AuthManager] },
  { path: 'admin/roles/:id', component: AdminRolesmanagementComponent, canActivate: [AuthManager] },
  { path: 'admin/systemcode', component: AdminSystemcodeComponent, canActivate: [AuthManager] },
  { path: 'admin/domain', component: AdminDomainComponent, canActivate: [AuthManager] },
  { path: '**', component: PageNotFoundComponent, canActivate: [AuthManager] },

  /* Begin Router Client */
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
  { path: 'main/sem-testimonials', component: MainSemTestimonialsComponent }
  /* End Router Client */
];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    FooterComponent,
    HeaderComponent,
    LeftMenuComponent,
    TopMenuComponent,
    AdminLoginComponent,
    AdminHomeComponent,
    AdminMenuComponent,
    AdminRolesComponent,
    AdminWarehouseComponent,
    AdminOwnerComponent,
    AdminUsersComponent,
    AdminUsersmanagementComponent,
    JSONtoDictionaryPipe,
    AdminAppsComponent,
    AdminRolesmanagementComponent,
    AdminSystemUsersComponent,
    AdminMailComponent,
    AdminSystemcodeComponent,
    ModalComponent,
    PopupCityComponent,
    PopupDistrictComponent,
    PopupWardComponent,
    AdminDomainComponent,

    /* Begin Module Client*/
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
    /* End Module CLient*/
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NguiAutoCompleteModule,
    NgxPaginationModule,
    Ng2CompleterModule,
    Ng2MapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyD19PqZRTYK9eFg0dt6WC8H6GnP4xVItu0'}),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AppServices, NotifyService, AuthService, AuthManager, ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
