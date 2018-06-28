import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServices } from './../../app.services';
import { NotifyService } from './../../notify.service';
import { AuthService } from './../../auth/auth.service';
declare var $:any;
@Component({
  selector: 'app-admin-systemusers',
  templateUrl: './admin-systemusers.component.html',
  styleUrls: ['./admin-systemusers.component.css']
})
export class AdminSystemUsersComponent implements OnInit {
  data_sysusers = []; selected_sysusers; delete_sysusers = []; currentPage_sysusers = 1; itemsPerPage_sysusers = 5; total_sysusers = 0;
  f_username = ''; f_email = ''; f_tel = ''; f_status = '';
  propertyName ; order = 'ASC';

  constructor(private router: Router, private appServices: AppServices, private notifyService: NotifyService, private authService: AuthService) {
    this.itemsPerPage_sysusers = this.appServices.session.paginate ?  this.appServices.session.paginate[0].short : 12 ;
  }
  ngOnInit() {
    this.loadSysUsersData();
  }

  loadSysUsersData(param = '') {
    let skip = (this.currentPage_sysusers-1)*this.itemsPerPage_sysusers;
    let limit = this.itemsPerPage_sysusers;
    this.delete_sysusers = [];
    let filter;
    if(param) {
      if(this.f_username.length > 0) filter = $.extend(filter, {'username': {like: this.f_username}});
      if(this.f_email.length > 0) filter = $.extend(filter, {'email': {like: this.f_email}});
      if(this.f_tel.length > 0) filter = $.extend(filter, {'tel': {like: this.f_tel}});
      if(this.f_status.length > 0) filter = $.extend(filter, {'status': this.f_status});
    }
    this.appServices.findSysUsers({'filter': JSON.stringify({'where': $.extend({'deleted': false}, filter), 'skip': skip, 'limit': limit, 'order': this.propertyName ? this.propertyName + " " + this.order : null})}, this)
    .then(function(__){
      let json = __.response.json();
      __.component.data_sysusers = json.res;
      __.component.total_sysusers = json.total;
    }).catch((err)=>{
      this.authService.catchErr(err);
    })
  }

  insertSysUsersData(data) {
    if(data.username.toLowerCase().indexOf('admin') === 0){
      this.notifyService.show('Username not allow start with "ADMIN" character!', 'danger');
    } else {
      if(data.password === data.comfirmpassword){
        data['currentuser'] = this.appServices.session.token.uid;
        data['username'] = 'admin-' + data['username'];
        if(typeof data['status'] === 'undefined'){
          data['status'] = 1;
        }
        this.appServices.insertSysUsers({'obj': JSON.stringify(data)}, this).then(function(__){
          let res = __.response.json().res;
          __.component.selected_sysusers = res;
          __.component.loadSysUsersData();
          __.component.notifyService.show('Process Done');
          $('#modalEdit').modal('show');
          $('#modalNew').modal('hide');
        }).catch((err)=>{
          this.authService.catchErr(err);
        });
      } else {
        this.notifyService.show('Comfirm password not correct!', 'danger');
      }
    }
  }

  updateSysUsersData(data) {
    data['deleted'] = false;
    data['currentuser'] = this.appServices.session.token.uid;
    this.appServices.updateSysUsers({'obj': JSON.stringify(data)}, this).then(function(__){
      __.component.notifyService.show('Process Done');
      __.component.loadSysUsersData();
    }).catch((err)=>{
      this.authService.catchErr(err);
    });

  }
  resetPasswordSysUsersData(username){
    this.appServices.resetPasswordSysUsers({'obj': JSON.stringify({'username': this.selected_sysusers.username, 'email': this.selected_sysusers.email, 'currentuser': this.appServices.session.token.uid})}, this)
    .then(function(__){
      __.component.notifyService.show('Process Done! <br/> Check your mail, you will receive an email including a new password from Smartlog System');
      $('#modalResetPasswordUsers').modal('hide');
    }).catch((err)=>{
      this.authService.catchErr(err);
    })
  }
  onChoose(e, data){
    if(e.target.checked) {
      this.delete_sysusers.push(data);
    }
    else {
      let index = this.delete_sysusers.indexOf(data);
      this.delete_sysusers.splice(index, 1);
    }
  }

  findSysUsersData(data){
    this.selected_sysusers = Object.assign({}, data);
  }

  deleteSysUsersData(){
    this.delete_sysusers.forEach((value, index, arr) => {
      value['deleted'] = true;
      value['currentuser'] = this.appServices.session.token.uid;
      this.appServices.updateSysUsers({'obj': JSON.stringify(value)}, this).then(function(success){
        success.component.notifyService.show('Process Done');
        success.component.loadSysUsersData();
      }).catch(function(err){
        err.component.authService.catchErr(err);
      })
    })
  }
  changeStatus(value, data){
    data['status'] = value;
  }
  checkAll(e) {
    if(e.srcElement.checked){
      this.data_sysusers.forEach(curr_data=>{
        curr_data.state = e.target.checked;
        if(!this.delete_sysusers.includes(curr_data)){
          this.delete_sysusers.push(curr_data);
        }
      })
    } else {
      this.data_sysusers.forEach(x=>x.state = e.target.checked);
      this.delete_sysusers = [];
    }
  }
  isAllChecked() {
    return this.data_sysusers.every(_ => _.state);
  }
}
