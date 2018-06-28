import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServices } from './../../app.services';
import { NotifyService } from './../../notify.service';
declare var $:any;
@Component({
  selector: 'app-main-sem-login',
  templateUrl: './main-sem-login.component.html',
  styleUrls: ['./main-sem-login.component.css']
})
export class MainSemLoginComponent implements OnInit {
  constructor(private router: Router, private appServices: AppServices, private notifyService: NotifyService) { }
  ngOnInit() {
  }
  signinSEM(data) {
    this.appServices.signinUsers({'obj': JSON.stringify({"username": data.username, "password": data.password})}, this).then((__)=>{
      let rs = __.response.json().res;
      this.appServices.getApps({'obj': JSON.stringify({'token': rs.token.id, 'username': rs.token.uid, 'deleted': false, 'appcode': 'sem' })}, this).then(function(obj){
        if(obj.response.json().res.length > 0){
          window.location.href = obj.response.json().res[0].url + __.response.json().res.token.id;
        } else {
          this.notifyService.show('User not existed!', 'danger');
        }
      }).catch(function(err){
        this.notifyService.show(typeof err.err === 'undefined' ? 'An unknown Error' : err.err.json().error.message, 'danger');
      })
    }).catch((err)=>{
      this.notifyService.show(typeof err.err === 'undefined' ? 'An unknown Error' : err.err.json().error.message, 'danger');
    })
  }
  forgotPasswordSEMData(data){
      this.appServices.forgotPasswordUsers({'obj': JSON.stringify({'appcode': 'sem','username': data.username, 'email': data.email, 'editwho': 'system'})}, this).then((__)=>{
      this.notifyService.show('Process Done! <br/> Check your mail, you will receive an email including a new password from Smartlog System');
      $('#modalForgotPasswordUsers').modal('hide');
    }).catch((err)=>{
      this.notifyService.show(typeof err.err === 'undefined' ? 'An unknown Error' : err.err.json().error.message, 'danger');
    })
  }
}
