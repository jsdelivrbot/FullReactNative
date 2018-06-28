import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServices } from './../../app.services';
import { NotifyService } from './../../notify.service';
import { AuthService } from './../../auth/auth.service';
declare var $: any;
@Component({
  selector: 'app-admin-systemcode',
  templateUrl: './admin-systemcode.component.html',
  styleUrls: ['./admin-systemcode.component.css']
})
export class AdminSystemcodeComponent implements OnInit {
  data_codelist = []; selected_codelist; currentPage_codelist = 1; itemsPerPage_codelist = 5; total_codelist = 0;
  data_codelkup = []; selected_codelkup; delete_codelkup = []; currentPage_codelkup = 1; itemsPerPage_codelkup = 5; total_codelkup = 0;
  data_temp;
  data_parentuser = [];
  fl_listname = ''; fl_description = ''; fl_parentuser = '';
  propertyName_list ; order_list = 'ASC';
  fd_code = ''; fd_description = ''; fd_short = ''; fd_long_value = ''; fd_woflag = ''; fd_lot1 = ''; fd_notes = '';
  propertyName_detail ; order_detail = 'ASC';

  constructor(private router: Router, private appServices: AppServices, private notifyService: NotifyService, private authService: AuthService) {
    this.itemsPerPage_codelist = this.itemsPerPage_codelkup = this.appServices.session.paginate ?  this.appServices.session.paginate[0].short : 12 ;
  }
  ngOnInit() {
    this.loadCodelistData();
    this.loadParentUserData();
  }
  loadCodelistData(param = '') {
    let skip = (this.currentPage_codelist - 1) * this.itemsPerPage_codelist;
    let limit = this.itemsPerPage_codelist;
    this.data_temp = null;
    let filter;
    if (param) {
      if(this.fl_listname.length > 0) filter = $.extend(filter, {'listname': {like: this.fl_listname}});
      if(this.fl_description.length > 0) filter = $.extend(filter, {'description': {like: this.fl_description}});
      if(this.fl_parentuser.length > 0) filter = $.extend(filter, {'parentuser': {like: this.fl_parentuser}});
    }
    this.appServices.findCodelist({ 'filter': JSON.stringify({ 'where': $.extend({ 'deleted': false }, filter), 'skip': skip, 'limit': limit, 'order': this.propertyName_list ? this.propertyName_list + " " + this.order_list : null }) }, this)
    .then(function (__) {
      let json = __.response.json();
      __.component.data_codelist = json.res;
      __.component.total_codelist = json.total;
    }).catch((err) => {
      this.authService.catchErr(err);
    })
  }
  loadCodelkupData(param = '') {
    let skip = (this.currentPage_codelkup - 1) * this.itemsPerPage_codelkup;
    let limit = this.itemsPerPage_codelkup;
    this.data_temp = null;
    this.delete_codelkup = [];

    let filter;
    if (param) {
      if(this.fd_code.length > 0) filter = $.extend(filter, {'code': {like: this.fd_code}});
      if(this.fd_description.length > 0) filter = $.extend(filter, {'description': {like: this.fd_description}});
      if(this.fd_short.length > 0) filter = $.extend(filter, {'short': {like: this.fd_short}});
      if(this.fd_long_value.length > 0) filter = $.extend(filter, {'long_value': {like: this.fd_long_value}});
      if(this.fd_notes.length > 0) filter = $.extend(filter, {'notes': {like: this.fd_notes}});
      let pd_woflag, pd_lot1;
      if(this.fd_woflag.length > 0) {
        pd_woflag = parseInt(this.fd_woflag.trim().replace('>=', '').replace('<=', '').replace('>', '').replace('<', ''));
        filter = this.fd_woflag.indexOf('>=') > -1 ? $.extend(filter, {'woflag': {gte: pd_woflag}}) : (this.fd_woflag.indexOf('<=') > -1 ? $.extend(filter, {'woflag': {lte: pd_woflag}}) :
        (this.fd_woflag.indexOf('>') > -1 ? $.extend(filter, {'woflag': {gt: pd_woflag}}) : (this.fd_woflag.indexOf('<') > -1 ?  $.extend(filter, {'woflag': {lt: pd_woflag}}) :  $.extend(filter, {'woflag': pd_woflag}) )));
      }
      if(this.fd_lot1.length > 0) {
        pd_lot1 = parseInt(this.fd_lot1.trim().replace('>=', '').replace('<=', '').replace('>', '').replace('<', ''));
        filter = this.fd_lot1.indexOf('>=') > -1 ? $.extend(filter, {'lot1': {gte: pd_lot1}}) : (this.fd_lot1.indexOf('<=') > -1 ? $.extend(filter, {'lot1': {lte: pd_lot1}}) :
        (this.fd_lot1.indexOf('>') > -1 ? $.extend(filter, {'lot1': {gt: pd_lot1}}) : (this.fd_lot1.indexOf('<') > -1 ?  $.extend(filter, {'lot1': {lt: pd_lot1}}) :  $.extend(filter, {'lot1': pd_lot1}) )));
      }
    }
    this.appServices.findCodelkup({ 'filter': JSON.stringify({ 'where': $.extend({ 'listname': this.selected_codelist.listname, 'deleted': false }, filter), 'skip': skip, 'limit': limit, 'order': this.propertyName_detail ? this.propertyName_detail + " " + this.order_detail : null }) }, this)
    .then(function (__) {
      let json = __.response.json();
      __.component.data_codelkup = json.res;
      __.component.total_codelkup = json.total;
    }).catch((err) => {
      this.authService.catchErr(err);
    })
  }
  loadParentUserData() {
    this.appServices.findUsers({ 'filter': JSON.stringify({ 'where': { 'deleted': false, 'type': 1 } }) }, this)
    .then(function (__) {
      __.component.data_parentuser = __.response.json().res;
    }).catch((err) => {
      this.authService.catchErr(err);
    })
  }
  findCodelistData(data) {
    this.selected_codelist = Object.assign({}, data);
    this.loadCodelkupData();
    $('a[href="#tabdetail"]').trigger('click');
  }
  saveCodelistData(data) {
    data['currentuser'] = this.appServices.session.token.uid;
    data['deleted'] = false;
    data['parentuser'] = data['parentuser'] !== undefined ? data['parentuser'] : this.appServices.session.token.uid;
    if (data.id) {
      this.appServices.updateCodelist({ 'obj': JSON.stringify(data) }, this).then(function (__) {
        __.component.notifyService.show('Process Done');
        __.component.loadCodelistData();
      }).catch((err) => {
        this.authService.catchErr(err);
      })
    } else {
      this.appServices.insertCodelist({ 'obj': JSON.stringify(data) }, this).then(function (__) {
        let res = __.response.json().res;
        __.component.selected_codelist = res;
        __.component.notifyService.show('Process Done');
        __.component.loadCodelistData();
        __.component.loadCodelkupData();
      }).catch((err) => {
        this.authService.catchErr(err);
      });
    }

  }
  deleteCodelistData() {
    let data = Object.assign({}, this.selected_codelist);
    data['deleted'] = true;
    data['currentuser'] = this.appServices.session.token.uid;
    this.appServices.updateCodelist({ 'obj': JSON.stringify(data) }, this).then(function (__) {
      __.component.notifyService.show('Process Done');
      __.component.selected_codelist = {};
      __.component.data_codelkup = [];
      __.component.loadCodelistData();
      $('#modalDeleteCodelistData').modal('hide');
      $('a[href="#tablist"]').trigger('click');
    }).catch((err) => {
      this.authService.catchErr(err);
    })
  }
  new() {
    this.selected_codelist = {};
    this.data_codelkup = [];
    $('a[href="#tabdetail"]').trigger('click');
  }
  addNewRow() {
    $('#tbldetail').scrollTop(0);
    this.data_temp = {
      'parentuser': this.selected_codelist.parentuser,
      'listname': this.selected_codelist.listname,
      'code': '',
      'description': '',
      'short': '',
      'long_value': '',
      'woflag': '',
      'lot1': '',
      'notes': '',
      'deleted': false
    };
  }
  saveRow(data) {
    if (data.id) {
      this.appServices.updateCodelkup({ 'obj': JSON.stringify(data) }, this).then(function (__) {
        __.component.notifyService.show('Process Done');
        __.component.loadCodelkupData();
      }).catch((err) => {
        this.authService.catchErr(err);
      })
    } else {
      this.appServices.insertCodelkup({ 'obj': JSON.stringify(data) }, this).then(function (__) {
        __.component.notifyService.show('Process Done');
        __.component.loadCodelkupData();
      }).catch((err) => {
        this.authService.catchErr(err);
      })
    }
  }
  deleteCodelkupRow() {
    let data = Object.assign({}, this.selected_codelkup);
    data['deleted'] = true;
    this.appServices.updateCodelkup({ 'obj': JSON.stringify(data) }, this).then(function (__) {
      let res = __.response.json().res;
      __.component.notifyService.show('Process Done');
      __.component.loadCodelkupData();
      $('#modalDeleteCodelkupRow').modal('hide');
    }).catch((err) => {
      this.authService.catchErr(err);
    })
  }
  deleteCodelkupData() {
    this.delete_codelkup.forEach((value, index, arr) => {
      value['deleted'] = true;
      this.appServices.updateCodelkup({ 'obj': JSON.stringify(value) }, this).then(function (__) {
        let res = __.response.json().res;
        __.component.notifyService.show('Process Done');
        __.component.loadCodelkupData();
        $('#modalDeleteCodelkupData').modal('hide');
      }).catch((err) => {
        this.authService.catchErr(err);
      })
    })
  }
  onChoose(e, data) {
    if (e.target.checked) {
      this.delete_codelkup.push(data);
    }
    else {
      let index = this.delete_codelkup.indexOf(data);
      this.delete_codelkup.splice(index, 1);
    }
  }
  checkAll(e) {
    if (e.srcElement.checked) {
      this.data_codelkup.forEach(curr_data => {
        curr_data.state = e.target.checked;
        if (!this.delete_codelkup.includes(curr_data)) {
          this.delete_codelkup.push(curr_data);
        }
      })
    } else {
      this.data_codelkup.forEach(x => x.state = e.target.checked);
      this.delete_codelkup = [];
    }
  }
  isAllChecked() {
    return this.data_codelkup.every(_ => _.state);
  }
  clickTablist() {
    $('#tabdetail').removeClass('active');
  }
  clickTabdetail() {
    $('#tablist').removeClass('active');
  }

}
