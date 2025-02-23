import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServices } from './../../app.services';
import { NotifyService } from './../../notify.service';
declare var $:any;
@Component({
  selector: 'app-main-sem-signup',
  templateUrl: './main-sem-signup.component.html',
  styleUrls: ['./main-sem-signup.component.css']
})
export class MainSemSignupComponent implements OnInit {
  constructor(private router: Router, private appServices: AppServices, private notifyService: NotifyService) { }
  ngOnInit() {
  }
  signup(data) {
    data['appcode'] = 'sem';
    data['type'] = 1;
    data['status'] = 2;
    data['deleted'] = false;
    data['addwho'] = 'system';
    if(data.username.toLowerCase().indexOf('admin') === 0){
      this.notifyService.show('Username not include "ADMIN" character!', 'danger');
    } else {
      this.appServices.signupUsers({'obj': JSON.stringify(data)}, this).then(function(__){
        __.component.notifyService.show('Signup Success! <br> Please Check Mail '+data['email']+' to get Account');
        __.component.router.navigate(['main/sem-login']);
      }).catch((err)=>{
        this.notifyService.show(typeof err.err === 'undefined' ? 'An unknown Error' : err.err.json().error.message, 'danger');
      })
    }
  }
}
