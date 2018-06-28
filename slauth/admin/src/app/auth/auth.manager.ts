import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
declare var document:any;
@Injectable()
export class AuthManager implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {
  }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(next.url.length === 0){
      if(window.localStorage.getItem(document.location.origin)){
        this.router.navigate(['admin/home']);
        return true;
      }
      else {
        this.router.navigate(['admin/login']);
        return false;
      }
    }
    if(next.url[1].path == 'login'){
      if(window.localStorage.getItem(document.location.origin)){
        return false;
      }
      else {
        return true;
      }
    }
    if(window.localStorage.getItem(document.location.origin)) {
      return true;
    }
    this.router.navigate(['admin/login']);
    return false;
  }
}
