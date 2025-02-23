import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServices } from './../../app.services';
import { NotifyService } from './../../notify.service';
import { AuthService } from './../../auth/auth.service';
declare var $: any;
@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.css']
})
export class AdminMenuComponent implements OnInit {
  data_menu = [];; selected_menu; delete_menu = []; currentPage_menu = 1; itemsPerPage_menu = 5; total_menu = 0;
  data_app = [];
  f_menucode = ''; f_menuname = ''; f_menuurl = ''; f_app = '';
  propertyName ; order = 'ASC';

  constructor(private router: Router, private appServices: AppServices, private notifyService: NotifyService, private authService: AuthService) {
    this.itemsPerPage_menu = this.appServices.session.paginate ?  this.appServices.session.paginate[0].short : 12 ;
  }
  ngOnInit() {
    this.loadMenuData();
    this.loadAppData();
  }
  loadMenuData(param = '') {
    let skip = (this.currentPage_menu - 1) * this.itemsPerPage_menu;
    let limit = this.itemsPerPage_menu;
    this.delete_menu = [];
    let filter;
    if (param) {
      if(this.f_menucode.length > 0) filter = $.extend(filter, {'menucode': {like: this.f_menucode}});
      if(this.f_menuname.length > 0) filter = $.extend(filter, {'menuname': {like: this.f_menuname}});
      if(this.f_menuurl.length > 0) filter = $.extend(filter, {'menuurl': {like: this.f_menuurl}});
      if(this.f_app.length > 0) filter = $.extend(filter, {'app': {like: this.f_app}});
    }
    this.appServices.findMenu({ 'filter': JSON.stringify({ 'where': $.extend({ 'deleted': false }, filter), 'skip': skip, 'limit': limit, 'order': this.propertyName ? this.propertyName + " " + this.order : null }) }, this)
    .then(function (__) {
      let json = __.response.json();
      __.component.data_menu = json.res;
      __.component.total_menu = json.total;
    }).catch((err) => {
      this.authService.catchErr(err);
    })
  }
  loadAppData() {
    this.appServices.listApps({ 'obj': JSON.stringify({ 'parentuser': '', 'deleted': false }) }, this).then(function (__) {
      __.component.data_app = __.response.json().res;
    }).catch((err) => {
      this.authService.catchErr(err);
    })
  }
  insertMenuData(data) {
    data['currentuser'] = this.appServices.session.token.uid;
    this.appServices.insertMenu({ 'obj': JSON.stringify(data) }, this).then(function (__) {
      __.component.notifyService.show('Process Done');
      __.component.loadMenuData();
    }).catch((err) => {
      this.authService.catchErr(err);
    })
  }
  updateMenuData(data) {
    data['deleted'] = false;
    data['currentuser'] = this.appServices.session.token.uid;
    this.appServices.updateMenu({ 'obj': JSON.stringify(data) }, this).then(function (__) {
      __.component.notifyService.show('Process Done');
      __.component.loadMenuData();
    }).catch((err) => {
      this.authService.catchErr(err);
    })
  }
  onChoose(e, data) {
    if (e.target.checked) {
      this.delete_menu.push(data);
    }
    else {
      let index = this.delete_menu.indexOf(data);
      this.delete_menu.splice(index, 1);
    }
  }
  findMenuData(data) {
    this.selected_menu = Object.assign({}, data);;
  }
  deleteMenuData() {
    this.delete_menu.forEach((value, index, arr) => {
      value['deleted'] = true;
      value['currentuser'] = this.appServices.session.token.uid;
      this.appServices.updateMenu({ 'obj': JSON.stringify(value) }, this).then(function (success) {
        success.component.notifyService.show('Info', 'Process Done');
        success.component.loadMenuData();
      }).catch((err) => {
        this.authService.catchErr(err);
      })
    })
  }
  checkAll(e) {
    if (e.srcElement.checked) {
      this.data_menu.forEach(curr_data => {
        curr_data.state = e.target.checked;
        if (!this.delete_menu.includes(curr_data)) {
          this.delete_menu.push(curr_data);
        }
      })
    } else {
      this.data_menu.forEach(x => x.state = e.target.checked);
      this.delete_menu = [];
    }
  }
  isAllChecked() {
    return this.data_menu.every(_ => _.state);
  }
}
