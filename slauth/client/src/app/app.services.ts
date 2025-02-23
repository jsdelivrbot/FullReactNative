import { Injectable }    from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

declare var $:any;

@Injectable()
export class AppServices {

  session;

  // host = 'http://localhost:2999';
  // host_wms = "http://localhost:3000";

  host = 'http://slauth-lb.gogoviet.com';
  host_wms = "http://swm-lb.gogoviet.com";

  INITDATASAMPLE = this.host_wms + '/api/Statistics/initdatasample';

  SIGNIN_USERS = this.host + '/api/Users/signin';
  SIGNUP_USERS = this.host + '/api/Users/signup';
  FORGOTPASSWORD_USERS = this.host + '/api/Users/forgotpassword';
  INTIDATASAMPLEAUTH_USERS = this.host + '/api/Users/initdatasampleauth';

  FIND_APPS = this.host + '/api/Apps/find';
  LIST_APPS = this.host + '/api/Apps/list';
  LISTALL_APPS = this.host + '/api/Apps/listall';
  INSERT_APPS = this.host + '/api/Apps/insert';
  UPDATE_APPS = this.host + '/api/Apps/update';
  GET_APPS = this.host + '/api/Apps/get';

  LIST_USERXAPP = this.host + '/api/UserxApps/list';
  FIND_USERXAPP = this.host + '/api/UserxApps/find';
  SAVE_USERXAPP = this.host + '/api/UserxApps/save';
  GETAPPS_USERXAPP = this.host + '/api/UserxApps/getapps';
  DELETE_USERXAPP = this.host + '/api/UserxApps/delete';

  INSERT_WAREHOUSE = this.host + '/api/Warehouses/insert';
  INSERT_ROLES = this.host + '/api/Roles/insert';
  INSERT_STORER = this.host + '/api/Storers/insert';
  UPDATE_USERXROLE = this.host + '/api/UserxRoles/update';

  UPDATE_ROLEXSTORER = this.host + '/api/RolexStorers/update';

  UPDATE_ROLEXWAREHOUSE = this.host + '/api/RolexWarehouses/update';

  SAVE_USERXROLE = this.host + '/api/UserxRoles/save';

  UPDATE_ROLEXMENU = this.host + '/api/RolexMenus/update';

  FIND_MENU = this.host + '/api/Menus/find';

  constructor(private http: Http) { }

  /* FUNCTION */
  initDataSample(data, component): any {
    return this.handleAPI(this.INITDATASAMPLE, data, component);
  }

  signinUsers(data, component): any {
    return this.handleAPI(this.SIGNIN_USERS, data, component);
  }
  signupUsers(data, component): any {
    return this.handleAPI(this.SIGNUP_USERS, data, component);
  }
  forgotPasswordUsers(data, component): any {
    return this.handleAPI(this.FORGOTPASSWORD_USERS, data, component);
  }
  initDataSampleAuth(data, component): any {
    return this.handleAPI(this.INTIDATASAMPLEAUTH_USERS, data, component);
  }

  findApps(data, component): any {
    return this.handleAPI(this.FIND_APPS, data, component);
  }
  listApps(data, component): any {
    return this.handleAPI(this.LIST_APPS, data, component);
  }
  listAllApps(data, component): any {
    return this.handleAPI(this.LISTALL_APPS, data, component);
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

  listUserxApp(data, component): any {
    return this.handleAPI(this.LIST_USERXAPP, data, component);
  }
  saveUserxApp(data, component): any {
    return this.handleAPI(this.SAVE_USERXAPP, data, component);
  }
  findUserxApp(data, component): any {
    return this.handleAPI(this.FIND_USERXAPP, data, component);
  }
  getAppsUserxApp(data, component): any {
    return this.handleAPI(this.GETAPPS_USERXAPP, data, component);
  }
  deleteUserxApp(data, component): any {
    return this.handleAPI(this.DELETE_USERXAPP, data, component);
  }

  insertWarehouse(data, component): any {
    return this.handleAPI(this.INSERT_WAREHOUSE, data, component);
  }
  insertRoles(data, component): any {
    return this.handleAPI(this.INSERT_ROLES, data, component);
  }
  insertStorer(data, component): any {
    return this.handleAPI(this.INSERT_STORER, data, component);
  }
  updateUserxRole(data, component): any {
    return this.handleAPI(this.UPDATE_USERXROLE, data, component);
  }

  updateRolexStorer(data, component): any {
    return this.handleAPI(this.UPDATE_ROLEXSTORER, data, component);
  }

  updateRolexWarehouse(data, component): any {
    return this.handleAPI(this.UPDATE_ROLEXWAREHOUSE, data, component);
  }

  saveUserxRole(data, component): any {
    return this.handleAPI(this.SAVE_USERXROLE, data, component);
  }

  updateRolexMenu(data, component): any {
    return this.handleAPI(this.UPDATE_ROLEXMENU, data, component);
  }

  findMenu(data, component): any {
    return this.handleAPI(this.FIND_MENU, data, component);
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
        setTimeout(function(){
          $('.loading').fadeOut();
        }, 500);
        resolve({response, component});
      })
      .catch(function(err){
        setTimeout(function(){
          $('.loading').fadeOut();
        }, 500);
        reject({err, component});
      });
    });
  }
}
