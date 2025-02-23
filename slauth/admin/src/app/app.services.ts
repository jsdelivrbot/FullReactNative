import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { NotifyService } from './notify.service';
import 'rxjs/add/operator/toPromise';
declare var $: any;
@Injectable()
export class AppServices {
  session;
  // host = 'http://localhost:2999';
  // host_sem = "http://localhost:3100";
  // host_wms = "http://localhost:3000";

  host = 'http://slauth-lb.gogoviet.com';
  host_sem = "http://sem-lb.gogoviet.com";
  host_wms = "http://swm-lb.gogoviet.com";

  SO_STATISTICS = this.host_wms + '/api/Statistics/so';
  ASN_STATISTICS = this.host_wms + '/api/Statistics/asn';

  SEM_SAVE_USER = this.host_sem + "/api/users/saveUser";
  SEM_SAVE_USERSXADDRESS = this.host_sem + "/api/usersxaddresses/saveUsersxaddress";

  IS_SYSUSERS = this.host + '/api/SysUsers/is';
  FIND_SYSUSERS = this.host + '/api/SysUsers/find';
  FIND_ADMIN = this.host + '/api/SysUsers/findadmin';
  SIGNIN_ADMIN = this.host + '/api/SysUsers/signinadmin';
  INSERT_SYSUSERS = this.host + '/api/SysUsers/insert';
  UPDATE_SYSUSERS = this.host + '/api/SysUsers/update';
  UPDATE_ADMIN = this.host + '/api/SysUsers/updateadmin';
  CHANGEPASSWORD_ADMIN = this.host + '/api/SysUsers/changepasswordadmin';
  RESETPASSWORD_SYSUSERS = this.host + '/api/SysUsers/resetpassword';
  FORGOTPASSWORD_ADMIN = this.host + '/api/SysUsers/forgotpassword';

  TOTAL_STATISTICS = this.host + '/api/Statistics/total';
  TOTALBYCOMPANY_STATISTICS = this.host + '/api/Statistics/totalbycompany';

  FIND_SYSMAIL = this.host + '/api/SysMails/find';
  LIST_SYSMAIL = this.host + '/api/SysMails/list';
  INSERT_SYSMAIL = this.host + '/api/SysMails/insert';
  UPDATE_SYSMAIL = this.host + '/api/SysMails/update';

  CHECK_TOKEN = this.host + '/api/Users/checktoken';
  FIND_USERS = this.host + '/api/Users/find';
  INSERT_USERS = this.host + '/api/Users/insert';
  UPDATE_USERS = this.host + '/api/Users/update';
  CHANGEPASSWORD_USERS = this.host + '/api/Users/changepassword';
  RESETPASSWORD_USERS = this.host + '/api/Users/resetpassword';
  SIGNUP_USERS = this.host + '/api/Users/signup';
  SIGNIN_USER = this.host + '/api/Users/signin';
  AFTERSIGNIN_USER = this.host + '/api/Users/aftersignin';
  SIGNOUT = this.host + '/api/Users/signout';
  FORGOTPASSWORD_USERS = this.host + '/api/Users/forgotpassword';
  LOADUSERBYID_USERS = this.host + '/api/Users/loaduserbyid';

  FIND_MENU = this.host + '/api/Menus/find';
  INSERT_MENU = this.host + '/api/Menus/insert';
  UPDATE_MENU = this.host + '/api/Menus/update';

  FIND_ROLES = this.host + '/api/Roles/find';
  INSERT_ROLES = this.host + '/api/Roles/insert';
  UPDATE_ROLES = this.host + '/api/Roles/update';
  LOADROLEBYID_ROLES = this.host + '/api/Roles/loadrolebyid';

  FIND_WAREHOUSE = this.host + '/api/Warehouses/find';
  LIST_WAREHOUSE = this.host + '/api/Warehouses/list';
  INSERT_WAREHOUSE = this.host + '/api/Warehouses/insert';
  UPDATE_WAREHOUSE = this.host + '/api/Warehouses/update';
  CHANGE_WAREHOUSE = this.host + '/api/Warehouses/change';

  FIND_STORER = this.host + '/api/Storers/find';
  INSERT_STORER = this.host + '/api/Storers/insert';
  UPDATE_STORER = this.host + '/api/Storers/update';
  GETALLBYWAREHOUSE_STORER = this.host + '/api/Storers/getallbywarehouse';

  LIST_USERXROLE = this.host + '/api/UserxRoles/list';
  FIND_USERXROLE = this.host + '/api/UserxRoles/find';
  SAVE_USERXROLE = this.host + '/api/UserxRoles/save';
  GETROLES_USERXROLE = this.host + '/api/UserxRoles/getroles';
  DELETE_USERXROLE = this.host + '/api/UserxRoles/delete';
  UPDATE_USERXROLE = this.host + '/api/UserxRoles/update';

  FIND_APPS = this.host + '/api/Apps/find';
  LIST_APPS = this.host + '/api/Apps/list';
  INSERT_APPS = this.host + '/api/Apps/insert';
  UPDATE_APPS = this.host + '/api/Apps/update';
  GET_APPS = this.host + '/api/Apps/get';

  FIND_USERXAPP = this.host + '/api/UserxApps/find';
  DELETE_USERXAPP = this.host + '/api/UserxApps/delete';
  UPDATE_USERXAPP = this.host + '/api/UserxApps/update';
  QUERY_USERXAPP = this.host + '/api/UserxApps/query';

  FIND_ROLEXWAREHOUSE = this.host + '/api/RolexWarehouses/find';
  DELETE_ROLEXWAREHOUSE = this.host + '/api/RolexWarehouses/delete';
  UPDATE_ROLEXWAREHOUSE = this.host + '/api/RolexWarehouses/update';

  LIST_ROLEXMENU = this.host + '/api/RolexMenus/list';
  FIND_ROLEXMENU = this.host + '/api/RolexMenus/find';
  DELETE_ROLEXMENU = this.host + '/api/RolexMenus/delete';
  UPDATE_ROLEXMENU = this.host + '/api/RolexMenus/update';

  LIST_ROLEXSTORER = this.host + '/api/RolexStorers/list';
  FIND_ROLEXSTORER = this.host + '/api/RolexStorers/find';
  DELETE_ROLEXSTORER = this.host + '/api/RolexStorers/delete';
  UPDATE_ROLEXSTORER = this.host + '/api/RolexStorers/update';

  FIND_CODELIST = this.host + '/api/Codelists/find';
  INSERT_CODELIST = this.host + '/api/Codelists/insert';
  UPDATE_CODELIST = this.host + '/api/Codelists/update';

  FIND_CODELKUP = this.host + '/api/Codelkups/find';
  INSERT_CODELKUP = this.host + '/api/Codelkups/insert';
  UPDATE_CODELKUP = this.host + '/api/Codelkups/update  ';

  FIND_CITY = this.host + '/api/cities/find';
  FIND_DISTRICT = this.host + '/api/districts/find';
  FIND_WARD = this.host + '/api/wards/find';

  FIND_DOMAIN = this.host + '/api/Domains/find';
  INSERT_DOMAIN = this.host + '/api/Domains/insert';
  UPDATE_DOMAIN = this.host + '/api/Domains/update';

  constructor(private http: Http, private router: Router, private notifyService: NotifyService) {
    if (localStorage.getItem(document.location.origin)) {
      let _var = JSON.parse(localStorage.getItem(document.location.origin));
      this.session = { 'user': { 'fullname': '' }, 'token': { 'uid': _var.u, 'id': _var.id }, 'isAdmin': '' };
      if (_var.id !== undefined) {
        this.checkToken({ 'token': _var.id }, this).then(function (__) {
          let res_token = __.response.json().res;
          __.component.findSysUsers({ 'filter': JSON.stringify({ 'where': { 'username': res_token.uid, 'status': 1, 'deleted': false } }) }, this).then(function (obj_sysUser) {
            let res_sysUser = obj_sysUser.response.json().res;
            if (res_sysUser.length > 0) {
              __.component.findCodelkup({'filter': JSON.stringify({'where': {'listname': 'Paginate', 'deleted': false}, 'order': 'woflag'})}, this)
              .then(function(obj){
                let paginate = obj.response.json().res;
                __.component.session = { 'user': { 'fullname': res_sysUser[0].fullname }, 'token': { 'uid': res_token.uid, 'id': res_token.id }, 'paginate': paginate, 'isAdmin': true };
                localStorage.setItem(document.location.origin, JSON.stringify({ 'id': res_token.id, 'u': res_token.uid }));
              }).catch(function(){
                localStorage.removeItem(document.location.origin);
                __.component.router.navigate(['admin/login']);
              })
            } else {
              __.component.findUsers({ 'filter': JSON.stringify({ 'where': { 'username': res_token.uid, 'type': 1, 'status': 1, 'deleted': false } }) }, this).then(function (obj_user) {
                let res_user = obj_user.response.json().res;
                if (res_user.length > 0) {
                  __.component.findCodelkup({'filter': JSON.stringify({'where': {'listname': 'Paginate', 'deleted': false}, 'order': 'woflag'})}, this)
                  .then(function(obj){
                    let paginate = obj.response.json().res;
                    __.component.session = { 'user': { 'fullname': res_user[0].fullname }, 'token': { 'uid': res_token.uid, 'id': res_token.id }, 'paginate': paginate, 'isAdmin': false };
                    localStorage.setItem(document.location.origin, JSON.stringify({ 'id': res_token.id, 'u': res_token.uid }));
                  }).catch(function(){
                    localStorage.removeItem(document.location.origin);
                    __.component.router.navigate(['admin/login']);
                  })
                } else {
                  localStorage.removeItem(document.location.origin);
                  __.component.router.navigate(['admin/login']);
                }
              }).catch(function (err) {
                localStorage.removeItem(document.location.origin);
                __.component.router.navigate(['admin/login']);
              })
            }
          }).catch(function (err) {
            localStorage.removeItem(document.location.origin);
            __.component.router.navigate(['admin/login']);
          })
        }).catch((err) => {
          localStorage.removeItem(document.location.origin);
          this.router.navigate(['admin/login']);
        })
      } else {
        localStorage.removeItem(document.location.origin);
        this.router.navigate(['admin/login']);
      }
    } else {
      this.router.navigate(['admin/login']);
    }
  }

  /* FUNCTION */
  SO_Statistics(data, component): any {
    return this.handleAPI(this.SO_STATISTICS, data, component);
  }
  ASN_Statistics(data, component): any {
    return this.handleAPI(this.ASN_STATISTICS, data, component);
  }

  SEM_saveUsersxaddress(data, component): any {
    return this.handleAPI(this.SEM_SAVE_USERSXADDRESS, data, component);
  }
  SEM_saveUser(data, component): any {
    return this.handleAPI(this.SEM_SAVE_USER, data, component);
  }

  isSysUsers(data, component): any {
    return this.handleAPI(this.IS_SYSUSERS, data, component);
  }
  findSysUsers(data, component): any {
    return this.handleAPI(this.FIND_SYSUSERS, data, component);
  }
  findAdmin(data, component): any {
    return this.handleAPI(this.FIND_ADMIN, data, component);
  }
  insertSysUsers(data, component): any {
    return this.handleAPI(this.INSERT_SYSUSERS, data, component);
  }
  updateSysUsers(data, component): any {
    return this.handleAPI(this.UPDATE_SYSUSERS, data, component);
  }
  updateAdmin(data, component): any {
    return this.handleAPI(this.UPDATE_ADMIN, data, component);
  }
  signinAdmin(data, component): any {
    return this.handleAPI(this.SIGNIN_ADMIN, data, component);
  }
  changePasswordAdmin(data, component): any {
    return this.handleAPI(this.CHANGEPASSWORD_ADMIN, data, component);
  }
  resetPasswordSysUsers(data, component): any {
    return this.handleAPI(this.RESETPASSWORD_SYSUSERS, data, component);
  }
  forgotPasswordAdmin(data, component): any {
    return this.handleAPI(this.FORGOTPASSWORD_ADMIN, data, component);
  }
  totalStatistics(data, component): any {
    return this.handleAPI(this.TOTAL_STATISTICS, data, component);
  }
  totalByCompanyStatistics(data, component): any {
    return this.handleAPI(this.TOTALBYCOMPANY_STATISTICS, data, component);
  }

  findSysMail(data, component): any {
    return this.handleAPI(this.FIND_SYSMAIL, data, component);
  }
  listSysMail(data, component): any {
    return this.handleAPI(this.LIST_SYSMAIL, data, component);
  }
  insertSysMail(data, component): any {
    return this.handleAPI(this.INSERT_SYSMAIL, data, component);
  }
  updateSysMail(data, component): any {
    return this.handleAPI(this.UPDATE_SYSMAIL, data, component);
  }

  findMenu(data, component): any {
    return this.handleAPI(this.FIND_MENU, data, component);
  }
  insertMenu(data, component): any {
    return this.handleAPI(this.INSERT_MENU, data, component);
  }
  updateMenu(data, component): any {
    return this.handleAPI(this.UPDATE_MENU, data, component);
  }

  findRoles(data, component): any {
    return this.handleAPI(this.FIND_ROLES, data, component);
  }
  insertRoles(data, component): any {
    return this.handleAPI(this.INSERT_ROLES, data, component);
  }
  updateRoles(data, component): any {
    return this.handleAPI(this.UPDATE_ROLES, data, component);
  }
  loadRoleByIDRoles(data, component): any {
    return this.handleAPI(this.LOADROLEBYID_ROLES, data, component);
  }

  findWarehouse(data, component): any {
    return this.handleAPI(this.FIND_WAREHOUSE, data, component);
  }
  listWarehouse(data, component): any {
    return this.handleAPI(this.LIST_WAREHOUSE, data, component);
  }
  insertWarehouse(data, component): any {
    return this.handleAPI(this.INSERT_WAREHOUSE, data, component);
  }
  updateWarehouse(data, component): any {
    return this.handleAPI(this.UPDATE_WAREHOUSE, data, component);
  }
  changeWarehouse(data, component): any {
    return this.handleAPI(this.CHANGE_WAREHOUSE, data, component);
  }

  findStorer(data, component): any {
    return this.handleAPI(this.FIND_STORER, data, component);
  }
  insertStorer(data, component): any {
    return this.handleAPI(this.INSERT_STORER, data, component);
  }
  updateStorer(data, component): any {
    return this.handleAPI(this.UPDATE_STORER, data, component);
  }
  getAllByWarehouseStorer(data, component): any {
    return this.handleAPI(this.GETALLBYWAREHOUSE_STORER, data, component);
  }

  checkToken(data, component): any {
    return this.handleAPI(this.CHECK_TOKEN, data, component);
  }
  findUsers(data, component): any {
    return this.handleAPI(this.FIND_USERS, data, component);
  }
  insertUsers(data, component): any {
    return this.handleAPI(this.INSERT_USERS, data, component);
  }
  updateUsers(data, component): any {
    return this.handleAPI(this.UPDATE_USERS, data, component);
  }
  changePasswordUsers(data, component): any {
    return this.handleAPI(this.CHANGEPASSWORD_USERS, data, component);
  }
  resetPasswordUsers(data, component): any {
    return this.handleAPI(this.RESETPASSWORD_USERS, data, component);
  }
  signupUsers(data, component): any {
    return this.handleAPI(this.SIGNUP_USERS, data, component);
  }
  signinUser(data, component): any {
    return this.handleAPI(this.SIGNIN_USER, data, component);
  }
  afterSigninUser(data, component): any {
    return this.handleAPI(this.AFTERSIGNIN_USER, data, component);
  }
  signout(data, component): any {
    return this.handleAPI(this.SIGNOUT, data, component);
  }
  forgotPasswordUsers(data, component): any {
    return this.handleAPI(this.FORGOTPASSWORD_USERS, data, component);
  }
  loadUserByIDUsers(data, component): any {
    return this.handleAPI(this.LOADUSERBYID_USERS, data, component);
  }

  listUserxRole(data, component): any {
    return this.handleAPI(this.LIST_USERXROLE, data, component);
  }
  saveUserxRole(data, component): any {
    return this.handleAPI(this.SAVE_USERXROLE, data, component);
  }
  findUserxRole(data, component): any {
    return this.handleAPI(this.FIND_USERXROLE, data, component);
  }
  getRolesUserxRole(data, component): any {
    return this.handleAPI(this.GETROLES_USERXROLE, data, component);
  }
  deleteUserxRole(data, component): any {
    return this.handleAPI(this.DELETE_USERXROLE, data, component);
  }
  updateUserxRole(data, component): any {
    return this.handleAPI(this.UPDATE_USERXROLE, data, component);
  }

  findApps(data, component): any {
    return this.handleAPI(this.FIND_APPS, data, component);
  }
  listApps(data, component): any {
    return this.handleAPI(this.LIST_APPS, data, component);
  }
  insertApps(data, component): any {
    return this.handleAPI(this.INSERT_APPS, data, component);
  }
  updateApps(data, component): any {
    return this.handleAPI(this.UPDATE_APPS, data, component);
  }
  getApps(data, component): any {
    return this.handleAPI(this.GET_APPS, data, component);
  }

  findUserxApp(data, component): any {
    return this.handleAPI(this.FIND_USERXAPP, data, component);
  }
  deleteUserxApp(data, component): any {
    return this.handleAPI(this.DELETE_USERXAPP, data, component);
  }
  updateUserxApp(data, component): any {
    return this.handleAPI(this.UPDATE_USERXAPP, data, component);
  }
  queryUserxApp(data, component): any {
    return this.handleAPI(this.QUERY_USERXAPP, data, component);
  }

  findRolexWarehouse(data, component): any {
    return this.handleAPI(this.FIND_ROLEXWAREHOUSE, data, component);
  }
  deleteRolexWarehouse(data, component): any {
    return this.handleAPI(this.DELETE_ROLEXWAREHOUSE, data, component);
  }
  updateRolexWarehouse(data, component): any {
    return this.handleAPI(this.UPDATE_ROLEXWAREHOUSE, data, component);
  }

  listRolexMenu(data, component): any {
    return this.handleAPI(this.LIST_ROLEXMENU, data, component);
  }
  findRolexMenu(data, component): any {
    return this.handleAPI(this.FIND_ROLEXMENU, data, component);
  }
  deleteRolexMenu(data, component): any {
    return this.handleAPI(this.DELETE_ROLEXMENU, data, component);
  }
  updateRolexMenu(data, component): any {
    return this.handleAPI(this.UPDATE_ROLEXMENU, data, component);
  }

  listRolexStorer(data, component): any {
    return this.handleAPI(this.LIST_ROLEXSTORER, data, component);
  }
  findRolexStorer(data, component): any {
    return this.handleAPI(this.FIND_ROLEXSTORER, data, component);
  }
  deleteRolexStorer(data, component): any {
    return this.handleAPI(this.DELETE_ROLEXSTORER, data, component);
  }
  updateRolexStorer(data, component): any {
    return this.handleAPI(this.UPDATE_ROLEXSTORER, data, component);
  }

  findCodelist(data, component): any {
    return this.handleAPI(this.FIND_CODELIST, data, component);
  }
  insertCodelist(data, component): any {
    return this.handleAPI(this.INSERT_CODELIST, data, component);
  }
  updateCodelist(data, component): any {
    return this.handleAPI(this.UPDATE_CODELIST, data, component);
  }

  findCodelkup(data, component): any {
    return this.handleAPI(this.FIND_CODELKUP, data, component);
  }
  insertCodelkup(data, component): any {
    return this.handleAPI(this.INSERT_CODELKUP, data, component);
  }
  updateCodelkup(data, component): any {
    return this.handleAPI(this.UPDATE_CODELKUP, data, component);
  }

  findCity(data, component): any {
    return this.handleAPI(this.FIND_CITY, data, component);
  }
  findDistrict(data, component): any {
    return this.handleAPI(this.FIND_DISTRICT, data, component);
  }
  findWard(data, component): any {
    return this.handleAPI(this.FIND_WARD, data, component);
  }

  findDomain(data, component): any {
    return this.handleAPI(this.FIND_DOMAIN, data, component);
  }
  insertDomain(data, component): any {
    return this.handleAPI(this.INSERT_DOMAIN, data, component);
  }
  updateDomain(data, component): any {
    return this.handleAPI(this.UPDATE_DOMAIN, data, component);
  }

  /* Insert Codelist, Codelkup cross Domain */
  CROSS_DOMAIN_INSERT_CODELIST = '/api/Codelists/insert';
  CROSS_DOMAIN_INSERT_CODELKUP = '/api/Codelkups/insert';
  CROSS_DOMAIN_FIND_CODELIST = '/api/Codelkups/find';
  CROSS_DOMAIN_FIND_CODELKUP = '/api/Codelkups/find';

  CallAPICrossDomain(api, data, component): any {
    return this.handleAPI(api, data, component);
  }

  /* Common Function */
  private handleAPI(URL, data, component) {
    $('.loading').fadeIn();
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('token', this.session !== undefined ? this.session.token.id : '');
    return new Promise((resolve, reject) => {
      this.http.post(URL, data, { headers })
      .toPromise()
      .then(function (response) {
        setTimeout(function () {
          $('.loading').fadeOut();
        }, 500);
        resolve({ response, component });
      }).catch(function (err) {
        setTimeout(function () {
          $('.loading').fadeOut();
        }, 500);
        reject({ err, component });
      });
    });
  }
}
