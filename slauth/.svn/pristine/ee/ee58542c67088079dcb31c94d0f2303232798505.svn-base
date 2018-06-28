import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppServices } from './../../app.services';
import { NotifyService } from './../../notify.service';
import { AuthService } from './../../auth/auth.service';
import * as md5 from "md5";
declare var $:any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  data_currentuser; isChangePassword = false;
  constructor(private appServices: AppServices,  private notifyService: NotifyService, private router: Router, private authService:AuthService, private cdr: ChangeDetectorRef) { }
  ngOnInit() {
    this.cdr.detectChanges();
  }
  Signout(){
    if(this.appServices.session.token !== undefined){
      this.appServices.signout({'obj': JSON.stringify({'username': this.appServices.session.token.uid})}, this).then( function(__){
      }).catch((err)=>{
      })
    }
    this.authService.logout();
    this.notifyService.show('Signout Success', 'warning');
  }
  LoadProfileData() {
    this.appServices.findAdmin({'obj': JSON.stringify({ 'username': this.appServices.session.token.uid, 'status': 1, 'deleted': false })}, this)
    .then(function (__) {
      let rs_user = __.response.json().res;
      __.component.data_currentuser = rs_user.user;
    }).catch((err)=>{
      this.authService.catchErr(err);
    })
  }
  updateProfileData(data){
    data['deleted'] = false;
    data['status'] = 1;
    data['isadmin'] = this.appServices.session.isAdmin;
    this.appServices.updateAdmin({'obj': JSON.stringify(data)}, this).then(function(__){
      let rs_user = __.response.json().res;
      if(data['currentpassword']){
        if(data['password'] === data['comfirmpassword']){
          if(md5(data['currentpassword']) === rs_user.user.password){
            __.component.appServices.changePasswordAdmin({'obj': JSON.stringify(data)}, this).then(function(obj){
              __.component.isChangePassword = false;
              __.component.authService.updateService({'user': {'fullname': rs_user.user.fullname}, 'token': {'uid': __.component.appServices.session.token.uid, 'id': __.component.appServices.session.token.id}, 'isAdmin': rs_user.isAdmin});
              __.component.notifyService.show('Process Done');
            }).catch(function(err){
              __.component.authService.catchErr(err);
            });
          } else {
            __.component.notifyService.show('Current Password not correct!', 'danger');
          }
        } else {
          __.component.notifyService.show('Comfirm password not correct!', 'danger');
        }
      } else {
        __.component.authService.updateService({'user': {'fullname': rs_user.user.fullname}, 'token': {'uid': __.component.appServices.session.token.uid, 'id': __.component.appServices.session.token.id}, 'isAdmin': rs_user.isAdmin});
        __.component.notifyService.show('Process Done');
      }
    }).catch((err)=>{
      this.authService.catchErr(err);
    })
  }
}
