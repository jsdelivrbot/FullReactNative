import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServices } from './../../app.services';
import { NotifyService } from './../../notify.service';
import { AuthService } from './../../auth/auth.service';
declare var $:any;
@Component({
  selector: 'app-admin-mail',
  templateUrl: './admin-mail.component.html',
  styleUrls: ['./admin-mail.component.css']
})
export class AdminMailComponent implements OnInit {
  data_sysmail = []; selected_sysmail; delete_sysmail = []; currentPage_sysmail = 1; itemsPerPage_sysmail = 5; total_sysmail = 0; data_itemsPerPage = [];
  data_apps = [];
  f_appcode = ''; f_user = ''; f_type = ''; f_host = ''; f_port = ''; f_secure = '';
  propertyName ; order = 'ASC';

  constructor(private router: Router, private appServices: AppServices, private notifyService: NotifyService, private authService: AuthService) {
    this.itemsPerPage_sysmail = this.appServices.session.paginate ?  this.appServices.session.paginate[0].short : 12 ;
  }
  ngOnInit() {
    this.loadSysMailData();
  }
  loadSysMailData(param = '') {
    let skip = (this.currentPage_sysmail-1)*this.itemsPerPage_sysmail;
    let limit = this.itemsPerPage_sysmail;
    this.delete_sysmail = [];
    let filter;
    if(param) {
      if(this.f_appcode.length > 0) filter = $.extend(filter, {'appcode': {like: this.f_appcode}});
      if(this.f_user.length > 0) filter = $.extend(filter, {'user': {like: this.f_user}});
      if(this.f_type.length > 0) filter = $.extend(filter, {'type': {like: this.f_type}});
      if(this.f_host.length > 0) filter = $.extend(filter, {'host': {like: this.f_host}});
      if(this.f_secure.length > 0) filter = $.extend(filter, {'secure': this.f_secure});
      let p_port;
      if(this.f_port.length > 0) {
        p_port = parseInt(this.f_port.trim().replace('>=', '').replace('<=', '').replace('>', '').replace('<', ''));
        filter = this.f_port.indexOf('>=') > -1 ? $.extend(filter, {'port': {gte: p_port}}) : (this.f_port.indexOf('<=') > -1 ? $.extend(filter, {'port': {lte: p_port}}) :
        (this.f_port.indexOf('>') > -1 ? $.extend(filter, {'port': {gt: p_port}}) : (this.f_port.indexOf('<') > -1 ?  $.extend(filter, {'port': {lt: p_port}}) :  $.extend(filter, {'port': p_port}) )));
      }
    }
    this.appServices.findSysMail({'filter': JSON.stringify({'where': $.extend({'deleted': false}, filter), 'skip': skip, 'limit': limit, 'order': this.propertyName ? this.propertyName + " " + this.order : null})}, this)
    .then(function(__){
      let json = __.response.json();
      __.component.data_sysmail = json.res;
      __.component.total_sysmail = json.total;
    }).catch((err)=>{
      this.authService.catchErr(err);
    })
  }
  loadAppsData() {
    this.appServices.findApps({'filter': JSON.stringify({'where': {'deleted': false}})}, this)
    .then(function(__){
      __.component.data_apps = __.response.json().res;
    }).catch((err)=>{
      this.authService.catchErr(err);
    })
  }
  insertSysMailData(data) {
    data['currentuser'] = this.appServices.session.token.uid;
    data['isdefault'] = typeof data['isdefault'] === 'undefined'?false:data['isdefault'];
    data['secure'] = typeof data['secure'] === 'undefined'?false:data['secure'];
    this.appServices.insertSysMail({'obj': JSON.stringify(data)}, this).then(function(__){
      __.component.notifyService.show('Process Done');
      __.component.loadSysMailData();
    }).catch((err)=>{
      this.authService.catchErr(err);
    })
  }
  updateSysMailData(data) {
    data['isdefault'] = this.selected_sysmail['isdefault'];
    data['deleted'] = false;
    data['currentuser'] = this.appServices.session.token.uid;
    this.appServices.updateSysMail({'obj': JSON.stringify(data)}, this).then(function(__){
      __.component.notifyService.show('Process Done');
      __.component.loadSysMailData();
    }).catch((err)=>{
      this.authService.catchErr(err);
    })
  }
  onChoose(e, data){
    if(e.target.checked) {
      this.delete_sysmail.push(data);
    }
    else {
      let index = this.delete_sysmail.indexOf(data);
      this.delete_sysmail.splice(index, 1);
    }
  }
  findSysMailData(data){
    if(this.data_apps.length <= 0){
      this.loadAppsData();
    }
    this.selected_sysmail = Object.assign({}, data);
  }
  deleteSysMailData(){
    this.delete_sysmail.forEach((value, index, arr) => {
      value['deleted'] = true;
      value['isdefault'] = false;
      value['currentuser'] = this.appServices.session.token.uid;
      this.appServices.updateSysMail({'obj': JSON.stringify(value)}, this).then(function(__){
        __.component.notifyService.show('Process Done');
        __.component.loadSysMailData();
        $('#modalDelete').modal('hide');
      }).catch((err)=>{
        this.authService.catchErr(err);
      })
    })
  }
  setDefault(data){
    data['isdefault'] = true;
    this.updateSysMailData(data);
  }
  checkAll(e) {
    if(e.srcElement.checked){
      this.data_sysmail.forEach(curr_data=>{
        curr_data.state = e.target.checked;
        if(!this.delete_sysmail.includes(curr_data)){
          this.delete_sysmail.push(curr_data);
        }
      })
    } else {
      this.data_sysmail.forEach(x=>x.state = e.target.checked);
      this.delete_sysmail = [];
    }
  }
  isAllChecked() {
    return this.data_sysmail.every(_ => _.state);
  }
}
