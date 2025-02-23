import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppServices } from './../app.services';
import { Router } from '@angular/router';
import { NotifyService } from './../notify.service';
declare var $:any;
declare var document:any;
@Injectable()
export class AuthService {
  constructor(private http: Http, private router: Router, private appServices: AppServices, private notifyService: NotifyService) {
  }
  login(session) {
    this.closeModal();
    localStorage.setItem(document.location.origin, JSON.stringify({'id': session.token.id, 'u': session.token.uid}));
    this.appServices.session = session;
    this.router.navigate(['admin/home']);
  }
  logout() {
    this.closeModal();
    localStorage.removeItem(document.location.origin);
    this.initService();
    this.router.navigate(['admin/login']);
  }
  initService(){
    this.appServices.session = {'user': {'fullname': ''},'token': {'uid': '','id': ''},'isAdmin': false};
  }
  updateService(session){
    localStorage.setItem(document.location.origin, JSON.stringify({'id': session.token.id, 'u': session.token.uid}));
    this.appServices.session = session;
  }
  closeModal(){
    $('.modal').modal('hide');
    $('.modal-backdrop').hide();
  }
  catchErr(err){
    let message = typeof err.err === 'undefined' ? 'An unknown Error' : err.err.json().error.message;
    this.notifyService.show(message, 'danger');
    if(message === 'TOKEN_EXPIRED' || message === 'INVALID_ACCESS' || message === 'TOKEN_REQUIRED'){
      this.logout();
    }
  }
}
