import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppServices } from './../../app.services';
import { NotifyService } from './../../notify.service';
import { AuthService } from './../../auth/auth.service';
import { CompleterService, CompleterData } from 'ng2-completer';
import { PopupCityComponent } from '../../popup/popup-city/popup-city.component';
import { PopupDistrictComponent } from '../../popup/popup-district/popup-district.component';
import { PopupWardComponent } from '../../popup/popup-ward/popup-ward.component';
declare var $:any;
declare var document:any;
declare var google:any;

@Component({
  selector: 'app-admin-warehouse',
  templateUrl: './admin-warehouse.component.html',
  styleUrls: ['./admin-warehouse.component.css']
})
export class AdminWarehouseComponent implements OnInit {
  data_warehouse = []; selected_warehouse; delete_warehouse = []; currentPage_warehouse = 1; itemsPerPage_warehouse = 5; total_warehouse = 0;
  data_parentuser = [];
  data_domain = [];
  data_city; data_district; data_ward;
  map; mapOptions; marker = null;
  f_warehousecode = ''; f_warehousename = ''; f_parentuser = ''; f_hide = '';
  propertyName ; order = 'ASC';

  constructor(private router: Router,
    private appServices: AppServices,
    private notifyService: NotifyService,
    private authService: AuthService,
    private completerService: CompleterService) {
      this.itemsPerPage_warehouse = this.appServices.session.paginate ?  this.appServices.session.paginate[0].short : 12 ;
    }
    ngOnInit() {
      this.mapOptions = {
        zoom: 13,
        disableDefaultUI: true,
        fullscreenControl: true,
        zoomControl: true
      };
      this.loadWarehouseData();
      this.loadParentUserData();
    }

    onMapReady(map) {
      this.map = map;
      if(typeof this.selected_warehouse.warehousecode != 'undefined'){
        this.marker = new google.maps.Marker({
          position: { lat: parseFloat(this.selected_warehouse.lat), lng: parseFloat(this.selected_warehouse.lng) },
          map: map
        });
        map.panTo(new google.maps.LatLng(parseFloat(this.selected_warehouse.lat), parseFloat(this.selected_warehouse.lng)));
      }
    }

    onMapClick(e) {
      e.target.panTo(e.latLng);
      if (!this.marker) {
        this.marker = new google.maps.Marker({
          position: { lat: e.latLng.lat(), lng: e.latLng.lng() },
          map: this.map
        });
      } else {
        // this.marker.setMap(null);
        this.marker.setPosition(new google.maps.LatLng(e.latLng.lat(), e.latLng.lng()));
        this.marker.setMap(this.map);
      }
    }

    loadParentUserData() {
      this.appServices.findUsers({'filter': JSON.stringify({'where': {'parentuser': '', 'deleted': false, 'type': 1}})}, this)
      .then(function(__){
        __.component.data_parentuser = __.response.json().res;
      }).catch((err)=>{
        this.authService.catchErr(err);
      })
    }

    loadDomainData() {
      this.appServices.findDomain({'filter': JSON.stringify({'where': {'deleted': false}})}, this)
      .then(function(__){
        __.component.data_domain = __.response.json().res;
      }).catch((err)=>{
        this.authService.catchErr(err);
      })
    }

    loadWarehouseData(param = '') {
      let skip = (this.currentPage_warehouse-1)*this.itemsPerPage_warehouse;
      let limit = this.itemsPerPage_warehouse;
      this.delete_warehouse = [];
      let filter;
      if(param) {
        if(this.f_warehousecode.length > 0) filter = $.extend(filter, {'warehouse.warehousecode like ': this.f_warehousecode});
        if(this.f_warehousename.length > 0) filter = $.extend(filter, {'warehouse.warehousename like ': this.f_warehousename});
        if(this.f_parentuser.length > 0) filter = $.extend(filter, {'warehouse.parentuser like ': this.f_parentuser});
        if(this.f_hide.length > 0) filter = $.extend(filter, {'warehouse.hide = ': this.f_hide});
      }
      this.appServices.isSysUsers({'obj': JSON.stringify({'where': {'username': this.appServices.session.token.uid,'deleted': false}})}, this)
      .then(function(__){
        let response = __.response.json();
        if(response.res == 0){
          filter = $.extend(filter, {'warehouse.parentuser = ': __.component.appServices.session.token.uid});
        }
        __.component.appServices.listWarehouse({'obj': JSON.stringify({'skip': skip, 'limit': limit, 'order': __.component.propertyName ? __.component.propertyName + " " + __.component.order : null}), 'filter': JSON.stringify(filter)}, this)
        .then(function(obj){
          let json = obj.response.json();
          __.component.data_warehouse = json.res;
          __.component.total_warehouse = json.total;
        }).catch(function(err){
          __.component.authService.catchErr(err);
        })
      }).catch((err)=>{
        this.authService.catchErr(err);
      })
    }

    saveWarehouseData(data){
      if(data.addwho){
        this.updateWarehouseData(data);
      } else {
        this.insertWarehouseData(data);
      }
    }

    insertWarehouseData(data) {
      if(this.marker){
        data['lat'] = this.marker.position.lat();
        data['lng'] = this.marker.position.lng();
        data['currentuser'] = this.appServices.session.token.uid;
        data['parentuser'] = data['parentuser'] ? data['parentuser'] : (this.appServices.session.isAdmin ? '' : this.appServices.session.token.uid);
        this.appServices.findDomain({'filter': JSON.stringify({'where': {'parentuser': data['parentuser'],'deleted': false}})}, this)
        .then((_)=>{
          let js = _.response.json();
          if(js.total > 0){
            this.appServices.insertWarehouse({'obj': JSON.stringify(data)}, this).then((__)=>{
              let res = __.response.json().res;
              // Check SEM
              this.appServices.findUserxApp({'filter': JSON.stringify({'where': {'appcode': 'sem', 'deleted': false, 'username': res.parentuser}})}, this)
              .then((obj)=>{
                let json = obj.response.json();
                if(json.total > 0) {
                  res['addresscode'] = res.warehousecode;
                  res['addressname'] = res.warehousename;
                  res['username'] = res.parentuser;
                  res['status'] = res.hide?0:1;
                  this.appServices.SEM_saveUsersxaddress({'obj': JSON.stringify(res)}, this)
                  .then((rs)=>{ })
                  .catch((err)=>{ })
                }
              })
              .catch((err)=>{ })
              // Find Codelist
              this.appServices.CallAPICrossDomain(js.res[0].url + this.appServices.CROSS_DOMAIN_FIND_CODELIST, {'filter': JSON.stringify({'where': {'deleted': false}})}, this)
              .then((objd)=>{
                let jsond = objd.response.json();
                if(jsond.total == 0){
                  // Init Data Sample Codelist,
                  this.appServices.findCodelist({'filter': JSON.stringify({'where': {'deleted': false}})}, this)
                  .then((obj)=>{
                    let json = obj.response.json();
                    json.res.forEach((value, index, arr)=>{
                      value['whseid'] = res['warehousecode'];
                      this.appServices.CallAPICrossDomain(js.res[0].url + this.appServices.CROSS_DOMAIN_INSERT_CODELIST, {'obj': JSON.stringify(value)}, this)
                      .then((rs)=>{ })
                      .catch((err)=>{ })
                    });
                  })
                  .catch((err)=>{ })
                }
              })
              .catch((err)=>{ })
              // Find Codelkup
              this.appServices.CallAPICrossDomain(js.res[0].url + this.appServices.CROSS_DOMAIN_FIND_CODELKUP, {'filter': JSON.stringify({'where': {'deleted': false}})}, this)
              .then((objd)=>{
                let jsond = objd.response.json();
                if(jsond.total == 0){
                  // Init Data Sample , Codelkups
                  this.appServices.findCodelkup({'filter': JSON.stringify({'where': {'deleted': false}})}, this)
                  .then((obj)=>{
                    let json = obj.response.json();
                    json.res.forEach((value, index, arr)=>{
                      value['whseid'] = res['warehousecode'];
                      this.appServices.CallAPICrossDomain(js.res[0].url + this.appServices.CROSS_DOMAIN_INSERT_CODELKUP, {'obj': JSON.stringify(value)}, this)
                      .then((rs)=>{ })
                      .catch((err)=>{ })
                    });
                  })
                  .catch((err)=>{ })
                }
              })
              .catch((err)=>{ })
              this.notifyService.show('Process Done');
              this.loadWarehouseData();
            })
            .catch((err)=>{
              this.authService.catchErr(err);
            })
          } else {
              this.notifyService.show('Please create a domain for this company first', 'danger');
          }
        })
        .catch((err)=>{
          this.authService.catchErr(err);
        })
      } else {
        this.notifyService.show("Please select location on Map ", "danger");
      }
    }

    c_yes(){
      this.selected_warehouse.lat = this.marker.lat;
      this.selected_warehouse.lng = this.marker.lng;
      this.changeLocation(this.selected_warehouse);
    }

    c_no(){
      this.changeLocation(this.selected_warehouse);
    }

    changeLocation(data){
      data['deleted'] = false;
      data['lat'] = this.marker.position.lat();
      data['lng'] = this.marker.position.lng();
      data['currentuser'] = this.appServices.session.token.uid;
      data['parentuser'] = data['parentuser']?data['parentuser']:(this.appServices.session.isAdmin?'': this.appServices.session.token.uid);
      this.appServices.updateWarehouse({'obj': JSON.stringify(data)}, this).then(function(__){
        __.component.appServices.findUserxApp({'filter': JSON.stringify({'where': {'appcode': 'sem', 'deleted': false, 'username': data.parentuser}})}, this)
        .then(function(obj){
          let json = obj.response.json();
          if(json.total > 0){
            data['addresscode'] = data.warehousecode;
            data['addressname'] = data.warehousename;
            data['username'] = data.parentuser;
            data['status'] = data.hide?0:1;
            __.component.appServices.SEM_saveUsersxaddress({'obj': JSON.stringify(data)}, this).then(function(objs){
            }).catch(function(err){
            })
          }
        }).catch(function(err){
        })

        $('#modalConfirmUpdate').modal('hide');
        __.component.notifyService.show('Process Done');
        __.component.loadWarehouseData();
      }).catch((err)=>{
        this.authService.catchErr(err);
      })
    }

    updateWarehouseData(data) {
      if(this.marker.getPosition().lat() != data.lat || this.marker.getPosition().lng() != data.lng){
        $('#modalConfirmUpdate').modal('show');
      } else {
        this.changeLocation(data);
      }
    }

    onChoose(e, data){
      if(e.target.checked) {
        this.delete_warehouse.push(data);
      }
      else {
        let index = this.delete_warehouse.indexOf(data);
        this.delete_warehouse.splice(index, 1);
      }
    }

    findWarehouseData(data){
      this.selected_warehouse = Object.assign({}, data);
      if (this.marker) {
        this.marker.setPosition(new google.maps.LatLng(parseFloat(this.selected_warehouse.lat), parseFloat(this.selected_warehouse.lng)));
        this.marker.setMap(this.map);
        this.map.panTo(new google.maps.LatLng(parseFloat(this.selected_warehouse.lat), parseFloat(this.selected_warehouse.lng)));
      }
    }

    deleteWarehouseData(){
      this.delete_warehouse.forEach((value, index, arr) => {
        value['deleted'] = true;
        value['currentuser'] = this.appServices.session.token.uid;
        this.appServices.updateWarehouse({'obj': JSON.stringify(value)}, this).then(function(__){
          __.component.appServices.findUserxApp({'filter': JSON.stringify({'where': {'appcode': 'sem', 'deleted': false, 'username': value.parentuser}})}, this)
          .then(function(obj){
            let json = obj.response.json();
            if(json.total > 0){
              __.component.appServices.SEM_saveUsersxaddress({'obj': JSON.stringify(value)}, this).then(function(objs){
              }).catch(function(err){
              })
            }
          }).catch(function(err){
          })
          __.component.notifyService.show('Process Done');
          __.component.loadWarehouseData();
          $('#modalDelete').nodal('hide');
        }).catch((err)=>{
          this.authService.catchErr(err);
        })
      })
    }

    checkAll(e) {
      if(e.srcElement.checked){
        this.data_warehouse.forEach(curr_data=>{
          curr_data.state = e.target.checked;
          if(!this.delete_warehouse.includes(curr_data)){
            this.delete_warehouse.push(curr_data);
          }
        })
      } else {
        this.data_warehouse.forEach(x=>x.state = e.target.checked);
        this.delete_warehouse = [];
      }
    }

    isAllChecked() {
      return this.data_warehouse.every(_ => _.state);
    }

    go(data){
      this.appServices.findUserxApp({'filter': JSON.stringify({'where': {'appcode': 'wms', 'deleted': false, 'username': data.parentuser}})}, this)
      .then(function(__){
        let json = __.response.json();
        if(json.total > 0){
          __.component.appServices.findApps({'filter': JSON.stringify({'where': {'appcode': 'wms'}})}, this).then(function(obj){
            let json = obj.response.json().res;
            if(json.length > 0){
              window.open(json[0].url + __.component.appServices.session.token.id + '/' + data.warehousecode + '^*^' + data.warehousename, '_blank');
            } else {
              __.component.notifyService.show('Error! <br /> Please check URL App Warehouse Management System!', 'danger');
            }
          }).catch((err)=>{
            this.authService.catchErr(err);
          })
        } else {
          __.component.notifyService.show('Error! <br />This warehouse is not owned by the Warehouse Manage System!', 'danger');
        }
      }).catch((err)=>{
        this.authService.catchErr(err);
      })
    }

    new(){
      if(this.marker) {
        this.marker.setMap(null);
        this.map.setCenter();
      }
      this.selected_warehouse = {};
      $('a[href="#tabdetail"]').trigger('click');
    }

    clickTablist() {
      $('#tabdetail').removeClass('active');
      $('a[href="#tablist"]').trigger('click');
    }
    clickTabdetail() {
      $('#tablist').removeClass('active');
      $('a[href="#tabdetail"]').trigger('click');
    }

    // Modal City
    @ViewChild('modalCity') child_city: PopupCityComponent;
    openModalCity() {
      this.child_city.openModal();
    }
    selectCity(data) {
      this.selected_warehouse.citycode = data.citycode;
      this.selected_warehouse.cityname = data.cityname;
      this.selected_warehouse.districtcode = '';
      this.selected_warehouse.wardcode = '';
    }
    // Modal District
    @ViewChild('modalDistrict') child_district: PopupDistrictComponent;
    openModalDistrict() {
      if(this.selected_warehouse.citycode.length > 0) this.child_district.openModal(this.selected_warehouse.citycode);
      else this.notifyService.show('Please select City before', 'warning');
    }
    selectDistrict(data) {
      this.selected_warehouse.districtcode = data.districtcode;
      this.selected_warehouse.districtname = data.districtname;
      this.selected_warehouse.wardcode = '';
    }
    // Modal Ward
    @ViewChild('modalWard') child_ward: PopupWardComponent;
    openModalWard() {
      if(this.selected_warehouse.districtcode.length > 0) this.child_ward.openModal(this.selected_warehouse.districtcode);
      else this.notifyService.show('Please select District before', 'warning');
    }
    selectWard(data) {
      this.selected_warehouse.wardcode = data.wardcode;
      this.selected_warehouse.wardname = data.wardname;
    }

  }
