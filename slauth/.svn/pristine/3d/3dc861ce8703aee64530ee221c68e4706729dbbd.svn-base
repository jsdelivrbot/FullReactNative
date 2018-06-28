import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServices } from './../../app.services';
import { NotifyService } from './../../notify.service';
import { AuthService } from './../../auth/auth.service';
declare var $:any;
@Component({
  selector: 'app-admin-roles',
  templateUrl: './admin-roles.component.html',
  styleUrls: ['./admin-roles.component.css']
})
export class AdminRolesComponent implements OnInit {
  data_role = []; selected_role; delete_role = []; currentPage_role = 1; itemsPerPage_role = 5; total_role = 0;
  data_parentuser = [];
  f_rolecode = ''; f_rolename = ''; f_parentuser = '';
  propertyName ; order = 'ASC';

  constructor(private router: Router, private appServices: AppServices, private notifyService: NotifyService, private authService: AuthService) {
    this.itemsPerPage_role = this.appServices.session.paginate ?  this.appServices.session.paginate[0].short : 12 ;
  }
  ngOnInit() {
    this.loadRolesData();
    this.loadParentUserData();
  }
  loadParentUserData() {
    this.appServices.findUsers({'filter': JSON.stringify({'where': {'parentuser': '', 'deleted': false, 'type': 1}})}, this)
    .then(function(__){
      __.component.data_parentuser = __.response.json().res;
    }).catch((err)=>{
      this.authService.catchErr(err);
    })
  }
  loadRolesData(param = '') {
    let skip = (this.currentPage_role-1)*this.itemsPerPage_role;
    let limit = this.itemsPerPage_role;
    this.delete_role = [];
    let filter;
    if(param) {
      if(this.f_rolecode.length > 0) filter = $.extend(filter, {'rolecode': {like: this.f_rolecode}});
      if(this.f_rolename.length > 0) filter = $.extend(filter, {'rolename': {like: this.f_rolename}});
      if(this.f_parentuser.length > 0) filter = $.extend(filter, {'parentuser': {like: this.f_parentuser}});
    }
    this.appServices.isSysUsers({'obj': JSON.stringify({'where': {'username': this.appServices.session.token.uid,'deleted': false}})}, this)
    .then(function(__){
      let response = __.response.json();
      let where = response.res > 0 ? {'deleted': false} : {'parentuser': __.component.appServices.session.token.uid, 'deleted': false};
      __.component.appServices.findRoles({'filter': JSON.stringify({'where': $.extend(where, filter), 'skip': skip, 'limit': limit, 'order': __.component.propertyName ? __.component.propertyName + " " + __.component.order : null })}, this)
      .then(function(obj){
        let json = obj.response.json();
        __.component.data_role = json.res;
        __.component.total_role = json.total;
      }).catch(function(err){
        __.component.authService.catchErr(err);
      })
    }).catch((err)=>{
      this.authService.catchErr(err);
    })
  }
  insertRolesData(data) {
    data['currentuser'] = this.appServices.session.token.uid;
    data['parentuser'] = data['parentuser']?data['parentuser']:(this.appServices.session.token.uid);
    this.appServices.insertRoles({'obj': JSON.stringify(data)}, this).then(function(__){
      let res = __.response.json().res;
      __.component.notifyService.show('Process Done');
      __.component.authService.closeModal();
      __.component.router.navigate(['admin/roles/' + res.id]);
    }).catch((err)=>{
      this.authService.catchErr(err);
    })
  }
  onChoose(e, data){
    if(e.target.checked) {
      this.delete_role.push(data);
    }
    else {
      let index = this.delete_role.indexOf(data);
      this.delete_role.splice(index, 1);
    }
  }
  findRolesData(data){
    this.router.navigate(['admin/roles/'+ Object.assign({}, data).id]);
  }
  deleteRolesData(){
    this.delete_role.forEach((value, index, arr) => {
      value['deleted'] = true;
      value['currentuser'] = this.appServices.session.token.uid;
      this.appServices.updateRoles({'obj': JSON.stringify(value)}, this).then(function(__){
        __.component.notifyService.show('Process Done');
        __.component.loadRolesData();
        $('#modalDelete').modal('hide');
      }).catch((err)=>{
        this.authService.catchErr(err);
      })
    })
  }
  checkAll(e) {
    if(e.srcElement.checked){
      this.data_role.forEach(curr_data=>{
        curr_data.state = e.target.checked;
        if(!this.delete_role.includes(curr_data)){
          this.delete_role.push(curr_data);
        }
      })
    } else {
      this.data_role.forEach(x=>x.state = e.target.checked);
      this.delete_role = [];
    }
  }
  isAllChecked() {
    return this.data_role.every(_ => _.state);
  }
}
