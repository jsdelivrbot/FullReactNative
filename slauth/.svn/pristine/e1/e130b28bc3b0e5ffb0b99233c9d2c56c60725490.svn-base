import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServices } from './../../app.services';
import { NotifyService } from './../../notify.service';
import { AuthService } from './../../auth/auth.service';
declare var $:any;

@Component({
  selector: 'app-admin-domain',
  templateUrl: './admin-domain.component.html',
  styleUrls: ['./admin-domain.component.css']
})
export class AdminDomainComponent implements OnInit {
  data_domain = []; selected_domain; delete_domain = []; currentPage_domain = 1; itemsPerPage_domain = 5; total_domain = 0; data_itemsPerPage = [];
  data_parentuser = [];
  f_code = ''; f_parentuser = ''; f_url = ''; f_description = '';
  propertyName ; order = 'ASC';

  constructor(private router: Router, private appServices: AppServices, private notifyService: NotifyService, private authService: AuthService) {
    this.itemsPerPage_domain = this.appServices.session.paginate ?  this.appServices.session.paginate[0].short : 12 ;
  }
  ngOnInit() {
    this.loadDomainData();
    this.loadParentUserData();
  }
  loadDomainData(param = '') {
    let skip = (this.currentPage_domain-1)*this.itemsPerPage_domain;
    let limit = this.itemsPerPage_domain;
    this.delete_domain = [];
    let filter;
    if(param) {
      if(this.f_code.length > 0) filter = $.extend(filter, {'code': {like: this.f_code}});
      if(this.f_parentuser.length > 0) filter = $.extend(filter, {'parentuser': {like: this.f_parentuser}});
      if(this.f_url.length > 0) filter = $.extend(filter, {'url': {like: this.f_url}});
      if(this.f_description.length > 0) filter = $.extend(filter, {'description': {like: this.f_description}});
    }

    this.appServices.findDomain({'filter': JSON.stringify({'where': $.extend({'deleted': false}, filter), 'skip': skip, 'limit': limit, 'order': this.propertyName ? this.propertyName + " " + this.order : null})}, this)
    .then(function(__){
      let json = __.response.json();
      __.component.data_domain = json.res;
      __.component.total_domain = json.total;
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

  insertDomainData(data) {
    data['currentuser'] = this.appServices.session.token.uid;
    this.appServices.insertDomain({'obj': JSON.stringify(data)}, this).then(function(__){
      __.component.notifyService.show('Process Done');
      __.component.loadDomainData();
    }).catch((err)=>{
      this.authService.catchErr(err);
    })
  }

  updateDomainData(data) {
    data['deleted'] = false;
    data['currentuser'] = this.appServices.session.token.uid;
    this.appServices.updateDomain({'obj': JSON.stringify(data)}, this).then(function(__){
      __.component.notifyService.show('Process Done');
      __.component.loadDomainData();
    }).catch((err)=>{
      this.authService.catchErr(err);
    })
  }

  onChoose(e, data){
    if(e.target.checked) {
      this.delete_domain.push(data);
    }
    else {
      let index = this.delete_domain.indexOf(data);
      this.delete_domain.splice(index, 1);
    }
  }

  findDomainData(data){
    this.selected_domain = Object.assign({}, data);
  }

  deleteDomainData(){
    this.delete_domain.forEach((value, index, arr) => {
      value['deleted'] = true;
      value['currentuser'] = this.appServices.session.token.uid;
      this.appServices.updateDomain({'obj': JSON.stringify(value)}, this).then(function(__){
        __.component.notifyService.show('Process Done');
        __.component.loadDomainData();
        $('#modalDelete').modal('hide');
      }).catch((err)=>{
        this.authService.catchErr(err);
      })
    })
  }

  checkAll(e) {
    if(e.srcElement.checked){
      this.data_domain.forEach(curr_data=>{
        curr_data.state = e.target.checked;
        if(!this.delete_domain.includes(curr_data)){
          this.delete_domain.push(curr_data);
        }
      })
    } else {
      this.data_domain.forEach(x=>x.state = e.target.checked);
      this.delete_domain = [];
    }
  }

  isAllChecked() {
    return this.data_domain.every(_ => _.state);
  }

}
