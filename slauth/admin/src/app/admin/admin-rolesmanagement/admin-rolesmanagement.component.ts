import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AppServices } from './../../app.services';
import { NotifyService } from './../../notify.service';
import { AuthService } from './../../auth/auth.service';
declare var $: any;
@Component({
  selector: 'app-admin-rolesmanagement',
  templateUrl: './admin-rolesmanagement.component.html',
  styleUrls: ['./admin-rolesmanagement.component.css']
})
export class AdminRolesmanagementComponent implements OnInit {
  data_role; _id;
  data_parentuser = [];
  data_warehouse = []; data_rolexwarehouse = [];
  data_storer = []; data_rolexstorer = []; data_strwarehousecode = "''"; data_arrwarehousecode = [];
  data_rolexmenu = []; data_app = []; selected_appcode; currentPage_rolexmenu = 1; itemsPerPage_rolexmenu = 5; total_rolexmenu = 0; data_itemsPerPage = []; filter;

  constructor(private router: Router, private appServices: AppServices, private notifyService: NotifyService, private activatedRoute: ActivatedRoute, private authService: AuthService) {
    this.itemsPerPage_rolexmenu = this.appServices.session.paginate ?  this.appServices.session.paginate[0].short : 12 ;
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this._id = params['id'];
      this.loadRolesData(this._id);
      this.loadParentUserData();
    });
  }
  filterStorerData(rolexstorer, strwarehousecode, parentuser) {
    this.appServices.getAllByWarehouseStorer({ 'obj': JSON.stringify({ 'strwarehousecode': strwarehousecode, 'type': '1', 'parentuser': parentuser, 'deleted': false }) }, this)
      .then(function (__) {
        if (rolexstorer.length > 0) {
          let data = __.response.json().res;
          __.component.data_storer = data.filter(function (f) {
            if (rolexstorer.findIndex(function (z) {
              if (f.storerkey === z.storerkey && f.warehousecode === z.warehousecode) return z;
            }) < 0) {
              return f;
            }
          })
        } else {
          __.component.data_storer = __.response.json().res;
        }
      }).catch((err) => {
        this.authService.catchErr(err);
      })
  }
  loadAppData() {
    this.appServices.queryUserxApp({ 'obj': JSON.stringify({ 'username': this.data_role.parentuser}) }, this)
      .then(function (__) {
        __.component.data_app = __.response.json().res;
      }).catch((err) => {
        this.authService.catchErr(err);
      })
  }
  loadParentUserData() {
    this.appServices.findUsers({ 'filter': JSON.stringify({ 'where': { 'parentuser': '', 'deleted': false, 'type': 1 } }) }, this)
      .then(function (__) {
        __.component.data_parentuser = __.response.json().res;
      }).catch((err) => {
        this.authService.catchErr(err);
      })
  }
  loadWarehouseCode(warehousecode) {
    if (this.data_arrwarehousecode.includes(warehousecode)) {
      let i = this.data_arrwarehousecode.indexOf(warehousecode);
      this.data_arrwarehousecode.splice(i, 1);
      this.data_rolexstorer = this.data_rolexstorer.filter(function (z) {
        if (z.warehousecode !== warehousecode) {
          return z;
        }
      })
      let temp = "''";
      this.data_arrwarehousecode.forEach((val, index, arr) => {
        temp += "," + "'" + val + "'";
      })
      this.data_strwarehousecode = temp;
      this.filterStorerData(this.data_rolexstorer, this.data_strwarehousecode, this.data_role.parentuser);
    } else {
      this.data_arrwarehousecode.push(warehousecode);
      let temp = "''";
      this.data_arrwarehousecode.forEach((val, index, arr) => {
        temp += "," + "'" + val + "'";
      })
      this.data_strwarehousecode = temp;
      this.filterStorerData(this.data_rolexstorer, this.data_strwarehousecode, this.data_role.parentuser);
    }
  }
  loadRolesData(id) {
    this.appServices.loadRoleByIDRoles({ 'obj': JSON.stringify({ 'id': id }) }, this).then(function (__) {
      let res = __.response.json().res;
      __.component.data_role = res.role;
      __.component.data_rolexwarehouse = res.rolexwarehouse;
      __.component.data_warehouse = res.warehouse;
      __.component.data_rolexstorer = res.rolexstorer;
      __.component.data_storer = res.storer;
      __.component.data_arrwarehousecode = res.arrwarehousecode;
      __.component.data_strwarehousecode = res.strwarehousecode;
      __.component.loadAppData();
    }).catch((err) => {
      this.authService.catchErr(err);
    })
  }
  loadRolexMenuData(appcode, param = '') {
    let skip = (this.currentPage_rolexmenu - 1) * this.itemsPerPage_rolexmenu;
    let limit = this.itemsPerPage_rolexmenu;
    if (param) {
      this.filter = $.extend(this.filter, param);
      let paramIndex = Object.keys(this.filter).indexOf(Object.keys(param)[0]);
      if (!(Object.values(this.filter)[paramIndex])) {
        delete this.filter[Object.keys(param)[0]];
      }
    }
    this.appServices.listRolexMenu({ 'obj': JSON.stringify({ 'appcode': appcode, 'rolecode': this.data_role.rolecode, 'skip': skip, 'limit': limit }), 'filter': JSON.stringify(this.filter) }, this).then(function (__) {
      let json = __.response.json();
      __.component.data_rolexmenu = [];
      __.component.data_rolexmenu = json.res;
      __.component.total_rolexmenu = json.total;
    }).catch((err) => {
      this.authService.catchErr(err);
    })
  }
  updateRolesData(data) {
    data['currentuser'] = this.appServices.session.token.uid;
    data['deleted'] = false;
    data['parentuser'] = data['parentuser'] ? data['parentuser'] : (this.appServices.session.isAdmin ? '' : this.appServices.session.token.uid);
    this.appServices.updateRoles({ 'obj': JSON.stringify(data) }, this).then(function (__) {
      let res_role = __.response.json().res;
      __.component.appServices.updateRolexWarehouse({ 'obj': JSON.stringify({ 'rolecode': data.rolecode, 'rolexwarehouse': __.component.data_rolexwarehouse, 'currentuser': __.component.appServices.session.token.uid  }) }, this)
        .then(function (obj_rolexwarehouse) {
          console.log(__.component.data_rolexstorer);

          __.component.appServices.updateRolexStorer({ 'obj': JSON.stringify({ 'rolecode': data.rolecode, 'rolexstorer': __.component.data_rolexstorer, 'currentuser': __.component.appServices.session.token.uid }) }, this)
            .then(function (obj_rolexstorer) {
              if (__.component.selected_appcode) {
                __.component.appServices.updateRolexMenu({ 'obj': JSON.stringify({ 'rolecode': data.rolecode, 'rolexmenu': __.component.data_rolexmenu, 'currentuser': __.component.appServices.session.token.uid  }) }, this)
                  .then(function (obj_rolexmenu) {
                    __.component.notifyService.show('Process Done');
                  }).catch(function (err) {
                    __.component.authService.catchErr(err);
                  })
              } else {
                __.component.notifyService.show('Process Done');
              }
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

  deleteRolesData(data) {
    data['deleted'] = true;
    data['currentuser'] = this.appServices.session.token.uid;
    this.appServices.updateRoles({ 'obj': JSON.stringify(data) }, this).then(function (__) {
      __.component.appServices.deleteRolexWarehouse({ 'obj': JSON.stringify(data) }, this).then(function () {
      }).catch(function (err) {
      })
      __.component.appServices.deleteRolexStorer({ 'obj': JSON.stringify(data) }, this).then(function () {
      }).catch(function (err) {
      })
      __.component.appServices.deleteRolexMenu({ 'obj': JSON.stringify(data) }, this).then(function () {
      }).catch(function (err) {
      })
      __.component.router.navigate(['admin/roles']);
      __.component.notifyService.show('Process Done');
      $('#modalDelete').modal('hide');
    }).catch((err) => {
      this.authService.catchErr(err);
    })
  }
  addAllWarehouse() {
    this.appServices.findWarehouse({ 'filter': JSON.stringify({ 'where': { 'deleted': false, 'hide': false, 'parentuser': this.data_role.parentuser } }) }, this)
      .then(function (__) {
        __.component.data_warehouse = [];
        __.component.data_rolexwarehouse = __.response.json().res;
        __.component.data_arrwarehousecode = [];
        let temp = "''";
        __.component.data_rolexwarehouse.forEach((val, index, arr) => {
          __.component.data_arrwarehousecode.push(val.warehousecode);
          temp += "," + "'" + val.warehousecode + "'";
        })
        __.component.data_strwarehousecode = temp;
        __.component.filterStorerData(__.component.data_rolexstorer, __.component.data_strwarehousecode, __.component.data_role.parentuser);

      }).catch((err) => {
        this.authService.catchErr(err);
      })
  }
  removeAllWarehouse() {
    this.appServices.findWarehouse({ 'filter': JSON.stringify({ 'where': { 'deleted': false, 'hide': false, 'parentuser': this.data_role.parentuser } }) }, this)
      .then(function (__) {
        __.component.data_rolexwarehouse = [];
        __.component.data_warehouse = __.response.json().res;
        __.component.data_arrwarehousecode = [];
        let temp = "''";
        __.component.data_strwarehousecode = temp;
        __.component.data_rolexstorer = [];
        __.component.data_storer = [];
      }).catch((err) => {
        this.authService.catchErr(err);
      })
  }
  addWarehouse(data) {
    if (!this.data_rolexwarehouse.includes(data)) {
      this.data_rolexwarehouse.unshift(data);
      let i = this.data_warehouse.indexOf(data);
      this.data_warehouse.splice(i, 1);
      this.loadWarehouseCode(data.warehousecode);
    }
  }
  removeWarehouse(data) {
    if (!this.data_warehouse.includes(data)) {
      this.data_warehouse.unshift(data);
      let i = this.data_rolexwarehouse.indexOf(data);
      this.data_rolexwarehouse.splice(i, 1);
      this.loadWarehouseCode(data.warehousecode);
    }
  }
  addAllStorer() {
    this.appServices.getAllByWarehouseStorer({ 'obj': JSON.stringify({ 'strwarehousecode': this.data_strwarehousecode, 'type': '1', 'parentuser': this.data_role.parentuser, 'deleted': false }) }, this)
      .then(function (__) {
        __.component.data_storer = [];
        __.component.data_rolexstorer = __.response.json().res;
      }).catch((err) => {
        this.authService.catchErr(err);
      })
  }
  removeAllStorer() {
    this.appServices.getAllByWarehouseStorer({ 'obj': JSON.stringify({ 'strwarehousecode': this.data_strwarehousecode, 'type': '1', 'parentuser': this.data_role.parentuser, 'deleted': false }) }, this)
      .then(function (__) {
        __.component.data_rolexstorer = [];
        __.component.data_storer = __.response.json().res;
      }).catch((err) => {
        this.authService.catchErr(err);
      })
  }
  addStorer(data) {
    if (!this.data_rolexstorer.includes(data)) {
      this.data_rolexstorer.unshift(data);
      let i = this.data_storer.indexOf(data);
      this.data_storer.splice(i, 1);
    }
  }
  removeStorer(data) {
    if (!this.data_storer.includes(data)) {
      this.data_storer.unshift(data);
      let i = this.data_rolexstorer.indexOf(data);
      this.data_rolexstorer.splice(i, 1);
    }
  }
  checkAllReadOnly(e) {
    this.data_rolexmenu.forEach(curr_data => {
      curr_data.readonly = e.target.checked;
    })
  }
  isAllCheckedReadOnly() {
    return this.data_rolexmenu.every(_ => _.readonly);
  }
  checkAllEdit(e) {
    this.data_rolexmenu.forEach(curr_data => {
      curr_data.edit = e.target.checked;
    })
  }
  isAllCheckedEdit() {
    return this.data_rolexmenu.every(_ => _.edit);
  }
}
