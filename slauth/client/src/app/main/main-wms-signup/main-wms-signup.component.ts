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
    data['currentuser'] = 'trial_'+data['username'];
    if(data.username.toLowerCase().indexOf('admin') === 0){
      this.notifyService.show('Username not allow start with "ADMIN" character!', 'danger');
    } else {
      this.appServices.signupUsers({'obj': JSON.stringify(data)}, this).then(function(__){
        let response = __.response.json().res;
        __.component.appServices.session = {'token': response.token};
        data['currentuser'] = data['username'];
        data['address1'] = data['username'];
        data['citycode'] = '79';
        data['districtcode'] = '765';
        data['wardcode'] = '26920';
        data['address'] = '207 D1';
        data['notes'] = 'Warehouse Trial';
        data['lat'] = '10.8035989';
        data['lng'] = '106.7213812';
        data['lottable'] = {"lottable01":{"label": "Batch No", "active": true},"lottable02":{"label": "lottable02", "active": false},"lottable03":{"label": "lottable03", "active": false},"lottable04":{"label": "Production Date", "active": true},"lottable05":{"label": "Expired Date", "active": true},"lottable06":{"label": "lottable06", "active": false},"lottable07":{"label": "lottable07", "active": false},"lottable08":{"label": "lottable08", "active": false},"lottable09":{"label": "lottable09", "active": false},"lottable10":{"label": "lottable10", "active": false},"lottable11":{"label": "lottable11", "active": false},"lottable12":{"label": "lottable12", "active": false}};
        __.component.appServices.initDataSampleAuth({ 'obj': JSON.stringify(data) }, this)
        .then(function(obj){
          let whseid = obj.response.json().res.warehousecode;
          let storerkey = obj.response.json().res.storerkey;
          data['warehousecode'] = whseid;
          data['storerkey'] = storerkey;
          __.component.appServices.initDataSample({ 'obj': JSON.stringify(data) }, this)
          .then(function(obj){
            __.component.notifyService.show('Signup Success! <br> Please Check Mail '+data['email']+' to get Account Info');
            window.location.href = response.app.url + response.token.id;
          }).catch(function(err){
            __.component.notifyService.show(typeof err.err === 'undefined' ? 'An unknown Error' : err.err.json().error.message, 'danger');
          })
        }).catch(function(err){
          __.component.notifyService.show(typeof err.err === 'undefined' ? 'An unknown Error' : err.err.json().error.message, 'danger');

        })
      }).catch((err)=>{
        this.notifyService.show(typeof err.err === 'undefined' ? 'An unknown Error' : err.err.json().error.message, 'danger');
      })
    }
  }

}
