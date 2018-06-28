import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServices } from './../../app.services';
import { NotifyService } from './../../notify.service';
import { AuthService } from './../../auth/auth.service';
declare var $:any;
@Component({
  selector: 'app-admin-apps',
  templateUrl: './admin-apps.component.html',
  styleUrls: ['./admin-apps.component.css']
})
export class AdminAppsComponent implements OnInit {
  data_app = []; ; selected_app; delete_app = []; currentPage_app = 1; itemsPerPage_app = 5; total_app = 0;
  f_appcode = ''; f_appname = ''; f_url = ''; f_signout_url = '';
  propertyName ; order = 'ASC';

  constructor(private router: Router, private appServices: AppServices, private notifyService: NotifyService, private authService: AuthService) {
    this.itemsPerPage_app = this.appServices.session.paginate ?  this.appServices.session.paginate[0].short : 12 ;
  }
  ngOnInit() {
    this.loadAppsData();
  }
  loadAppsData(param = '') {
    let skip = (this.currentPage_app-1)*this.itemsPerPage_app;
    let limit = this.itemsPerPage_app;
    this.delete_app = [];
    let filter;
    if(param) {
       if(this.f_appcode.length > 0) filter = $.extend(filter, {'appcode': {like: this.f_appcode}});
       if(this.f_appname.length > 0) filter = $.extend(filter, {'appname': {like: this.f_appname}});
       if(this.f_url.length > 0) filter = $.extend(filter, {'url': {like: this.f_url}});
       if(this.f_signout_url.length > 0) filter = $.extend(filter, {'signout_url': {like: this.f_signout_url}});
    }
    this.appServices.findApps({'filter': JSON.stringify({'where': $.extend({'deleted': false}, filter), 'skip': skip, 'limit': limit, 'order': this.propertyName ? this.propertyName + " " + this.order : null })}, this)
    .then(function(__){
      let json = __.response.json();
      __.component.data_app = json.res;
      __.component.total_app = json.total;
    }).catch((err)=>{
      this.authService.catchErr(err);
    })
  }
  insertAppsData(data) {
    data['deleted'] = false;
    data['currentuser'] = this.appServices.session.token.uid;
    this.appServices.insertApps({ "obj": JSON.stringify(data) }, this).then(function(__){
      __.component.notifyService.show('Process Done');
      __.component.loadAppsData();
    }).catch((err)=>{
      this.authService.catchErr(err);
    })
  }
  updateAppsData(data) {
    data['deleted'] = false;
    data['currentuser'] = this.appServices.session.token.uid;
    this.appServices.updateApps({ "obj": JSON.stringify(data) }, this).then(function(__){
      __.component.notifyService.show('Process Done');
      __.component.loadAppsData();
    }).catch((err)=>{
      this.authService.catchErr(err);
    })
  }
  onChoose(e, data){
    if(e.target.checked) {
      this.delete_app.push(data);
    }
    else {
      let index = this.delete_app.indexOf(data);
      this.delete_app.splice(index, 1);
    }
  }
  findAppsData(data){
    this.selected_app = Object.assign({}, data);;
  }
  deleteAppsData(){
    this.delete_app.forEach((value, index, arr) => {
      value['deleted'] = true;
      value['currentuser'] = this.appServices.session.token.uid;
      this.appServices.updateApps({ "obj": JSON.stringify(value) }, this).then(function(__){
        __.component.notifyService.show('Process Done');
        __.component.loadAppsData();
        $('#modalDelete').modal('hide');
      }).catch((err)=>{
        this.authService.catchErr(err);
      })
    })
  }
  checkAll(e) {
    if(e.srcElement.checked){
      this.data_app.forEach(curr_data=>{
        curr_data.state = e.target.checked;
        if(!this.delete_app.includes(curr_data)){
          this.delete_app.push(curr_data);
        }
      })
    } else {
      this.data_app.forEach(x=>x.state = e.target.checked);
      this.delete_app = [];
    }
  }
  isAllChecked() {
    return this.data_app.every(_ => _.state);
  }
};
