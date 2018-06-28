import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServices } from './../../app.services';
import { NotifyService } from './../../notify.service';
import { AuthService } from './../../auth/auth.service';
declare var $: any;
declare var google: any;
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  data_company = [];
  data_so; data_asn;
  map; mapOptions; marker = null; place;
  positions = []; data_warehouse = [];
  infowindow;

  constructor(public router: Router, public appServices: AppServices, private notifyService: NotifyService, private authService: AuthService) {  }

  ngOnInit() {
    setTimeout(() => {
      this.mapOptions = {
        zoom: 13,
        disableDefaultUI: true,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#f5f5f5"
              }
            ]
          },
          {
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#f5f5f5"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#bdbdbd"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#eeeeee"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e5e5e5"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#ffffff"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#757575"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#dadada"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#616161"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#e5e5e5"
              }
            ]
          },
          {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#eeeeee"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#c9c9c9"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#9e9e9e"
              }
            ]
          }
        ]
      };

      this.loadCompanyData();
    }, 1000)

  }

  onMapReady(map) {
    this.map = map;
  }

  onMarkerInit(marker){
    this.map.panTo(marker.getPosition())
  }
  markerClick(e, data) {
    this.place = data;
    this.map.panTo(e.latLng);
    if(this.infowindow) this.infowindow.close();
    this.infowindow = new google.maps.InfoWindow({
      content:  `<h3 class="text-danger">`+ data.warehousecode +` - `+ data.warehousename +` </h3>` + `<h5 class="text-primary">`+ data.address + ` - ` + data.wardname + ` - ` + data.districtname + ` - ` + data.cityname + `</h5>`
    });
    this.infowindow.setPosition(e.latLng);
    this.infowindow.open(this.map);
  }

  loadWarehouseByCompanyData(parentuser){
    let objd = parentuser ? {'obj': JSON.stringify({}), 'filter': JSON.stringify({'parentuser=': parentuser})} : {'obj': JSON.stringify({}), 'filter': JSON.stringify({})};
    this.appServices.listWarehouse(objd, this)
    .then(function(__){
      let json = __.response.json();
      let str_whseid = "''";
      __.component.data_warehouse = json.res;
      __.component.data_warehouse.forEach((value, index, arr)=>{
        str_whseid += "," + "'" + value.warehousecode + "'";
      });
      __.component.loadSO(parentuser, str_whseid);
      __.component.loadASN(parentuser, str_whseid);
    }).catch((err)=>{
      this.authService.catchErr(err);
    })
  }

  loadCompanyData() {
    let where = this.appServices.session.isAdmin ? { 'where': { 'deleted': false, 'type': 1 } } : { 'where': { 'deleted': false, 'type': 1, 'username': this.appServices.session.token.uid } };
    this.appServices.findUsers({ 'filter': JSON.stringify(where) }, this).then(function (__) {
      __.component.data_company = __.response.json().res;
      if(__.component.data_company.length == 1){
        __.component.loadWarehouseByCompanyData(__.component.data_company[0].username);
        __.component.loadTotalChart(__.component.data_company[0].username);
        __.component.loadTotalDeletedChart(__.component.data_company[0].username);
      } else {
        __.component.loadWarehouseByCompanyData('');
        __.component.loadTotalChart('');
        __.component.loadTotalDeletedChart('');
      }
    }).catch((err) => {
      this.authService.catchErr(err);
    })
  }

  loadTotalChart(parentuser) {
    if(parentuser){
      this.appServices.totalByCompanyStatistics({ 'obj': JSON.stringify({ 'deleted': false, 'parentuser': parentuser }) }, this).then(function (__) {
        let _rs = __.response.json().res;
        let data = new google.visualization.DataTable();
        data.addColumn('string', 'Year');
        data.addColumn('number', 'Total User');
        data.addColumn('number', 'Total Warehouse');
        data.addColumn('number', 'Total Owner');
        _rs.forEach((value, index, arr) => {
          data.addRow([value.year.toString(), value.totaluser, value.totalwarehouse, value.totalowner]);
        });
        let options = {
          legend: { position: 'none' },
        };
        let chart = new google.charts.Bar(document.getElementById('total_div'));
        chart.draw(data, google.charts.Bar.convertOptions(options));
      }).catch((err) => {
        this.authService.catchErr(err);
      })
    } else {
      this.appServices.totalStatistics({ 'obj': JSON.stringify({ 'deleted': false }) }, this).then(function (__) {
        let _rs = __.response.json().res;
        let data = new google.visualization.DataTable();
        data.addColumn('string', 'Year');
        data.addColumn('number', 'Total Company');
        data.addColumn('number', 'Total User');
        data.addColumn('number', 'Total Warehouse');
        data.addColumn('number', 'Total Owner');
        _rs.forEach((value, index, arr) => {
          data.addRow([value.year.toString(), value.totalcompany, value.totaluser, value.totalwarehouse, value.totalowner]);
        });
        let options = {
          legend: { position: 'none' },
        };
        let chart = new google.charts.Bar(document.getElementById('total_div'));
        chart.draw(data, google.charts.Bar.convertOptions(options));
      }).catch((err) => {
        this.authService.catchErr(err);
      })
    }
  }

  loadTotalDeletedChart(parentuser) {
    if(parentuser){
      this.appServices.totalByCompanyStatistics({ 'obj': JSON.stringify({ 'deleted': true, 'parentuser': parentuser }) }, this).then(function (__) {
        let _rs = __.response.json().res;
        let data = new google.visualization.DataTable();
        data.addColumn('string', 'Year');
        data.addColumn('number', 'Total User');
        data.addColumn('number', 'Total Warehouse');
        data.addColumn('number', 'Total Owner');
        _rs.forEach((value, index, arr) => {
          data.addRow([value.year.toString(), value.totaluser, value.totalwarehouse, value.totalowner]);
        });
        let options = {
          legend: { position: 'none' },
        };
        let chart = new google.charts.Bar(document.getElementById('totaldeleted_div'));
        chart.draw(data, google.charts.Bar.convertOptions(options));
      }).catch((err) => {
        this.authService.catchErr(err);
      })
    } else {
      this.appServices.totalStatistics({ 'obj': JSON.stringify({ 'deleted': true }) }, this).then(function (__) {
        let _rs = __.response.json().res;
        let data = new google.visualization.DataTable();
        data.addColumn('string', 'Year');
        data.addColumn('number', 'Total Company');
        data.addColumn('number', 'Total User');
        data.addColumn('number', 'Total Warehouse');
        data.addColumn('number', 'Total Owner');
        _rs.forEach((value, index, arr) => {
          data.addRow([value.year.toString(), value.totalcompany, value.totaluser, value.totalwarehouse, value.totalowner]);
        });
        let options = {
          legend: { position: 'none' },
        };
        let chart = new google.charts.Bar(document.getElementById('totaldeleted_div'));
        chart.draw(data, google.charts.Bar.convertOptions(options));
      }).catch((err) => {
        this.authService.catchErr(err);
      })
    }
  }

  loadSO(parentuser, str_whseid){
    this.appServices.SO_Statistics({ 'obj': JSON.stringify({ 'deleted': false, 'str_whseid': str_whseid }) }, this).then(function (__) {
      let _rs = __.response.json().res;
      __.component.data_so = _rs[0];
    }).catch((err) => {
      this.authService.catchErr(err);
    })
  }

  loadASN(parentuser, str_whseid){
    this.appServices.ASN_Statistics({ 'obj': JSON.stringify({ 'deleted': false, 'str_whseid': str_whseid }) }, this).then(function (__) {
      let _rs = __.response.json().res;
      __.component.data_asn = _rs[0];
    }).catch((err) => {
      this.authService.catchErr(err);
    })
  }

}
