import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppServices } from './../../app.services';
import { NotifyService } from './../../notify.service';
import { AuthService } from './../../auth/auth.service';
declare var $:any;
@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  data_users = []; delete_users = []; selected_users; currentPage_users = 1; itemsPerPage_users = 5; total_users = 0;
  data_parentuser = [];
  f_username = ''; f_fullname = ''; f_email = ''; f_tel = ''; f_type = ''; f_parentuser = ''; f_status = '';
  propertyName ; order = 'ASC';
  constructor(private router: Router, private appServices: AppServices, private notifyService: NotifyService, private authService: AuthService) {
    this.itemsPerPage_users = this.appServices.session.paginate ?  this.appServices.session.paginate[0].short : 12 ;
  }
  ngOnInit() {
    this.loadUsersData();
    this.loadParentUserData();
  }
  loadUsersData(param = '') {
    let skip = (this.currentPage_users-1)*this.itemsPerPage_users;
    let limit = this.itemsPerPage_users;
    this.delete_users = [];
    let filter;
    if(param) {
      if(this.f_username.length > 0) filter = $.extend(filter, {'username': {like: this.f_username}});
      if(this.f_fullname.length > 0) filter = $.extend(filter, {'fullname': {like: this.f_fullname}});
      if(this.f_email.length > 0) filter = $.extend(filter, {'email': {like: this.f_email}});
      if(this.f_tel.length > 0) filter = $.extend(filter, {'tel': {like: this.f_tel}});
      if(this.f_parentuser.length > 0) filter = $.extend(filter, {'parentuser': {like: this.f_parentuser}});
      if(this.f_type.length > 0) filter = $.extend(filter, {'type': this.f_type});
      if(this.f_status.length > 0) filter = $.extend(filter, {'status': this.f_status});
    }
    this.appServices.isSysUsers({'obj': JSON.stringify({'where': {'username': this.appServices.session.token.uid,'deleted': false}})}, this)
    .then(function(__){
      let response = __.response.json();
      let where = response.res > 0 ? {'deleted': false} : {'parentuser': __.component.appServices.session.token.uid, 'deleted': false};
        __.component.appServices.findUsers({'filter': JSON.stringify({'where': $.extend(where, filter), 'skip': skip, 'limit': limit, 'order': __.component.propertyName ? __.component.propertyName + " " + __.component.order : null})}, this)
        .then(function(obj){
          let json = obj.response.json();
          __.component.data_users = json.res;
          __.component.total_users = json.total;
        }).catch(function(err){
          __.component.authService.catchErr(err);
        })
    }).catch((err)=>{
      this.authService.catchErr(err);
    })
  }
  loadParentUserData() {
    this.appServices.findUsers({'filter': JSON.stringify({'where': {'parentuser': '', 'deleted': false, 'type': 1}})}, this)
    .then(function(__){
      __.component.data_parentuser = __.response.json().res;
    }).catch((err)=>{
      this.authService.catchErr(err);
    })
  }
  insertUsersData(data) {
    if(data.username.toLowerCase().indexOf('admin') === 0){
      this.notifyService.show('Username not allow start with "ADMIN" character!', 'danger');
    } else {
      if(data.password === data.comfirmpassword){
        data['type'] = parseInt(data['type']);
        if(typeof data['status'] === 'undefined'){
          data['status'] = 1;
        }
        data['currentuser'] = this.appServices.session.token.uid;
        data['parentuser'] = data['parentuser']?data['parentuser']:(this.appServices.session.isAdmin?'':this.appServices.session.token.uid);
        this.appServices.insertUsers({'obj': JSON.stringify(data)}, this).then(function(__){
          let res = __.response.json().res;
          __.component.notifyService.show('Process Done');
          __.component.authService.closeModal();
          __.component.router.navigate(['admin/users/' + res.id]);
        }).catch((err)=>{
          this.authService.catchErr(err);
        });
      } else {
        this.notifyService.show('Comfirm password not correct!', 'danger');
      }
    }

  }
  onChoose(e, data){
    if(e.target.checked) {
      this.delete_users.push(data);
    }
    else {
      let index = this.delete_users.indexOf(data);
      this.delete_users.splice(index, 1);
    }
  }
  findUsersData(data){
    this.router.navigate(['admin/users/'+ Object.assign({}, data).id]);
  }
  deleteUsersData(){
    this.delete_users.forEach((value, index, arr) => {
      value['deleted'] = true;
      value['type'] = parseInt(value['type']);
      value['currentuser'] = this.appServices.session.token.uid;
      this.appServices.updateUsers({'obj': JSON.stringify(value)}, this).then(function(__){
        __.component.appServices.deleteUserxApp({'obj': JSON.stringify(value)}, this).then(function(){
        }).catch(function(err){
          __.component.authService.catchErr(err);
        })
        __.component.appServices.deleteUserxRole({'obj': JSON.stringify(value)}, this).then(function(){
        }).catch(function(err){
          __.component.authService.catchErr(err);
        })
        __.component.appServices.findUserxApp({'filter': JSON.stringify({'where': {'appcode': 'sem', 'deleted': false, 'username': value.username}})}, this)
        .then(function(obj){
          let json = obj.response.json();
          if(json.total > 0){
            __.component.appServices.SEM_updateUser({'obj': JSON.stringify(value)}, this).then(function(obj){
            }).catch(function(err){
            })
          }
        }).catch(function(err){
        })
        __.component.loadUsersData();
        __.component.notifyService.show('Process Done');
        $('#modalDelete').modal('hide');
      }).catch((err)=>{
        this.authService.catchErr(err);
      })
    })
  }
  changeStatus(value, data){
    data['status'] = value;
  }
  checkAll(e) {
    if(e.srcElement.checked){
      this.data_users.forEach(curr_data=>{
        curr_data.state = e.target.checked;
        if(!this.delete_users.includes(curr_data)){
          this.delete_users.push(curr_data);
        }
      })
    } else {
      this.data_users.forEach(x=>x.state = e.target.checked);
      this.delete_users = [];
    }
  }
  isAllChecked() {
    return this.data_users.every(_ => _.state);
  }
}
