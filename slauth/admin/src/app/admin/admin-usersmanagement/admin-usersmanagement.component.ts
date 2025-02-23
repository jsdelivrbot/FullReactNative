import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppServices } from './../../app.services';
import { NotifyService } from './../../notify.service';
import { AuthService } from './../../auth/auth.service';
import { NgStyle } from '@angular/common';
import * as md5 from "md5";
declare var $: any;
@Component({
  selector: 'app-admin-usersmanagement',
  templateUrl: './admin-usersmanagement.component.html',
  styleUrls: ['./admin-usersmanagement.component.css']
})
export class AdminUsersmanagementComponent implements OnInit {
  data_user; type = 1; _id;
  data_parentuser = [];
  filter;
  data_userlist = []; data_warehouselist = []; data_rolelist = []; data_ownerlist = [];
  data_roles = []; data_userroles = []; collect_roles = []; collect_userroles = [];
  data_apps = []; data_userapps = []; collect_apps = []; collect_userapps = [];
  constructor(private router: Router, private appServices: AppServices, private notifyService: NotifyService, private activatedRoute: ActivatedRoute, private authService: AuthService) { }
  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this._id = params['id'];
      this.loadUsersData(this._id);
      this.loadParentUserData();
    });
  }
  loadParentUserData() {
    this.appServices.findUsers({ 'filter': JSON.stringify({ 'where': { 'parentuser': '', 'deleted': false, 'type': 1 } }) }, this)
      .then(function (__) {
        __.component.data_parentuser = __.response.json().res;
      }).catch((err) => {
        this.authService.catchErr(err);
      })
  }
  loadUsersData(id) {
    this.appServices.loadUserByIDUsers({ 'obj': JSON.stringify({ 'id': id }) }, this).then(function (__) {
      let res = __.response.json().res;
      __.component.data_user = res.user;
      __.component.type = res.user.type;
      __.component.data_userroles = res.userxrole;
      __.component.data_roles = res.role;
      __.component.data_userapps = res.userxapp;
      __.component.data_apps = res.app;
      __.component.data_userlist = res.listuser;
      __.component.data_ownerlist = res.listowner;
      __.component.data_rolelist = res.listrole;
      __.component.data_warehouselist = res.listwarehouse;
    }).catch((err) => {
      this.authService.catchErr(err);
    })

  }
  updateUsersData(data) {
    data['deleted'] = false;
    data['type'] = parseInt(data['type']);
    data['parentuser'] = data['parentuser'] ? data['parentuser'] : (this.appServices.session.isAdmin ? '' : this.appServices.session.token.uid);
    data['status'] = data['status'] ? data['status'] : this.data_user['status'];
    data['currentuser'] = this.appServices.session.token.uid;
    this.appServices.updateUsers({ 'obj': JSON.stringify(data) }, this).then(function (__) {
      let res_user = __.response.json().res;
      __.component.appServices.updateUserxRole({ 'obj': JSON.stringify({ 'username': res_user.username, 'userxrole': __.component.data_userroles, 'currentuser': __.component.appServices.session.token.uid }) }, this)
        .then(function (obj_userxrole) {
          __.component.appServices.updateUserxApp({ 'obj': JSON.stringify({ 'username': res_user.username, 'userxapp': __.component.data_userapps, 'currentuser': __.component.appServices.session.token.uid }) }, this)
            .then(function (obj_userxapp) {
              if (__.component.data_userapps.findIndex(function (z) {
                if (z.appcode === 'sem') return z;
              }) >= 0) {
                data['phonenumber'] = data['tel'];
                __.component.appServices.SEM_saveUser({ 'obj': JSON.stringify(data) }, this).then(function (objs) {
                }).catch(function (err) {
                })
              }
              __.component.loadUsersData(__.component._id);
              __.component.notifyService.show('Process Done');
            }).catch(function (err) {
              __.component.authService.catchErr(err);
            })
        }).catch(function (err) {
          __.component.authService.catchErr(err);
        })
    }).catch((err) => {
      this.authService.catchErr(err);
    })
  }
  deleteUsersData(data) {
    data['deleted'] = true;
    data['currentuser'] = this.appServices.session.token.uid;
    this.appServices.updateUsers({ 'obj': JSON.stringify(data) }, this).then(function (__) {
      __.component.appServices.deleteUserxApp({ 'obj': JSON.stringify(data) }, this).then(function () {
      }).catch(function (err) {
      })
      __.component.appServices.deleteUserxRole({ 'obj': JSON.stringify(data) }, this).then(function () {
      }).catch(function (err) {
      })
      __.component.appServices.findUserxApp({ 'filter': JSON.stringify({ 'where': { 'appcode': 'sem', 'deleted': false, 'username': data.username } }) }, this)
        .then(function (obj) {
          let json = obj.response.json();
          if (json.total > 0) {
            data['phonenumber'] = data['tel'];
            __.component.appServices.SEM_saveUser({ 'obj': JSON.stringify(data) }, this).then(function (objs) {
            }).catch(function (err) {
            })
          }
        }).catch(function (err) {
        })
      __.component.router.navigate(['admin/users']);
      __.component.notifyService.show('Process Done');
      $('#modalDelete').modal('hide');
    }).catch((err) => {
      this.authService.catchErr(err);
    })
  }
  resetPasswordUsersData() {
    this.appServices.resetPasswordUsers({ 'obj': JSON.stringify({ 'username': this.data_user.username, 'email': this.data_user.email, 'currentuser': this.appServices.session.token.uid }) }, this)
      .then(function (__) {
        __.component.notifyService.show('Process Done! <br/> Check your mail, you will receive an email including a new password from Smartlog System');
        $('#modalResetPasswordUsers').modal('hide');
      }).catch((err) => {
        this.authService.catchErr(err);
      })
  }
  addAllRoles() {
    this.appServices.findRoles({ 'filter': JSON.stringify({ 'where': { 'deleted': false, 'parentuser': this.data_user.parentuser } }) }, this)
      .then(function (__) {
        __.component.collect_roles = __.component.collect_userroles = [];
        __.component.data_roles = [];
        __.component.data_userroles = __.response.json().res;
      }).catch((err) => {
        this.authService.catchErr(err);
      })
  }
  removeAllRoles() {
    this.appServices.findRoles({ 'filter': JSON.stringify({ 'where': { 'deleted': false, 'parentuser': this.data_user.parentuser } }) }, this)
      .then(function (__) {
        __.component.collect_roles = __.component.collect_userroles = [];
        __.component.data_userroles = [];
        __.component.data_roles = __.response.json().res;
      }).catch((err) => {
        this.authService.catchErr(err);
      })
  }
  addRoles(data) {
    if (!this.data_userroles.includes(data)) {
      this.data_userroles.unshift(data);
      let i = this.data_roles.indexOf(data);
      this.data_roles.splice(i, 1);
    }
  }
  removeRoles(data) {
    if (!this.data_roles.includes(data)) {
      this.data_roles.unshift(data);
      let i = this.data_userroles.indexOf(data);
      this.data_userroles.splice(i, 1);
    }
  }
  addAllApps() {
    this.appServices.listApps({ 'obj': JSON.stringify({ 'deleted': false, 'parentuser': this.data_user.parentuser }) }, this)
      .then(function (__) {
        __.component.collect_apps = __.component.collect_userapps = [];
        __.component.data_apps = [];
        __.component.data_userapps = __.response.json().res;
      }).catch((err) => {
        this.authService.catchErr(err);
      })
  }
  removeAllApps() {
    this.appServices.listApps({ 'obj': JSON.stringify({ 'deleted': false, 'parentuser': this.data_user.parentuser }) }, this)
      .then(function (__) {
        __.component.collect_roles = __.component.collect_userroles = [];
        __.component.data_userapps = [];
        __.component.data_apps = __.response.json().res;
      }).catch((err) => {
        this.authService.catchErr(err);
      })
  }
  addApps(data) {
    if (!this.data_userapps.includes(data)) {
      this.data_userapps.unshift(data);
      let i = this.data_apps.indexOf(data);
      this.data_apps.splice(i, 1);
    }
  }
  removeApps(data) {
    if (!this.data_apps.includes(data)) {
      this.data_apps.unshift(data);
      let i = this.data_userapps.indexOf(data);
      this.data_userapps.splice(i, 1);
    }
  }
  activeAccount(data) {
    data['status'] = 1;
    this.updateUsersData(data);
  }

}
