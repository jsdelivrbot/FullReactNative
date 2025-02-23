import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServices } from './../../app.services';
import { NotifyService } from './../../notify.service';
import { AuthService } from './../../auth/auth.service';
declare var $:any;
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  constructor(private router: Router, private appServices: AppServices, private notifyService:NotifyService, private authService:AuthService) { }
  ngOnInit() {
  }

  signin(data) {
    this.appServices.signinAdmin({'obj': JSON.stringify({"username": data.username, "password": data.password})}, this).then(function(__){
      let res = __.response.json().res;
      __.component.appServices.findCodelkup({'filter': JSON.stringify({'where': {'listname': 'Paginate', 'deleted': false}, 'order': 'woflag'})}, this)
      .then(function(obj){
        let paginate = obj.response.json().res;
        __.component.authService.login({
          'user': {
            'fullname': res.user.fullname
          },
          'token': {
            'uid': res.token.uid,
            'id': __.response.json().res.token.id
          },
          'paginate': paginate,
          'isAdmin': __.response.json().res.isAdmin
        });
        __.component.notifyService.show('Signin Success!');
      }).catch(function(err){
        __.component.catchErr(err);
      })
    }).catch((err)=>{
      this.authService.catchErr(err);
    })
  }

  forgotPasswordAdminData(data){
    this.appServices.forgotPasswordAdmin({'obj': JSON.stringify({'username': data.username, 'email': data.email, 'editwho': 'system'})}, this).then(function(__){
      __.component.notifyService.show('Process Done! <br/> Check your mail, you will receive an email including a new password from Smartlog System');
      $('#modalForgotPasswordUsers').modal('hide');
    }).catch((err)=>{
      this.authService.catchErr(err);
    })
  }
}
