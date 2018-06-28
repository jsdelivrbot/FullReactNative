import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServices } from './../../app.services';
import { NotifyService } from './../../notify.service';
import { UserType } from './../../enumtype';
declare var $:any;
@Component({
  selector: 'app-main-wms-signup',
  templateUrl: './main-wms-signup.component.html',
  styleUrls: ['./main-wms-signup.component.css']
})
export class MainWmsSignupComponent implements OnInit {
  constructor(private router: Router, private appServices: AppServices, private notifyService: NotifyService) { }
  ngOnInit() {
  }
  signup(data) {
    data['appcode'] = 'wms';
    data['type'] = UserType.trial;
    data['status'] = 1;
    data['deleted'] = false;
    data['currentuser'] = 'TRIAL';
    data['parentuser'] = 'trial';
    if(data.username.toLowerCase().indexOf('admin') === 0){
      this.notifyService.show('Username not allow start with "ADMIN" character!', 'danger');
    } else {
      this.appServices.signupUsers({'obj': JSON.stringify(data)}, this).then(function(__){
        data['userxrole'] = [{'rolecode': 'trial'}];
        __.component.appServices.updateUserxRole({ 'obj': JSON.stringify(data) }, this)
        .then(function(obj){
          __.component.notifyService.show('Signup Success! <br> Please Check Mail '+data['email']+' to get Account');
          __.component.router.navigate(['main/wms-login']);
        }).catch(function(err){
          __.component.notifyService.show(typeof err.err === 'undefined' ? 'An unknown Error' : err.err.json().error.message, 'danger');
        })
      }).catch((err)=>{
        this.notifyService.show(typeof err.err === 'undefined' ? 'An unknown Error' : err.err.json().error.message, 'danger');
      })
    }
  }

}
