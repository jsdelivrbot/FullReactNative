import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalService } from '../modal.service';
import { AppServices } from '../../app.services';
import { AuthService } from '../../auth/auth.service';
declare var $:any;

@Component({
  selector: 'app-popup-city',
  templateUrl: './popup-city.component.html',
  styleUrls: ['./popup-city.component.css']
})
export class PopupCityComponent implements OnInit {
  data_city = []; currentPage_city = 1; itemsPerPage_city = 0; total_city = 0;
  f_citycode = ''; f_cityname = '';
  propertyName ; order = 'ASC';
  @Output() onSelect = new EventEmitter<any>();

  constructor(private modalService:ModalService,
    private appServices: AppServices,
    private authService: AuthService) {
      this.itemsPerPage_city = this.appServices.session.paginate ?  this.appServices.session.paginate[0].short : 12 ;
    }

    ngOnInit() {
    }

    loadCityData(param = '') {
      let skip = (this.currentPage_city-1)*this.itemsPerPage_city;
      let limit =  this.itemsPerPage_city;
      let filter;
      if(param) {
        if(this.f_citycode.length > 0) filter = $.extend(filter, {'citycode': {like: this.f_citycode}});
        if(this.f_cityname.length > 0) filter = $.extend(filter, {'cityname': {like: this.f_cityname}});
      }
      this.appServices.findCity({'filter': JSON.stringify({'where': filter, 'skip': skip, 'limit': limit, 'order': this.propertyName ? this.propertyName + " " + this.order : null})}, this)
      .then(function(__){
        let json = __.response.json();
        __.component.data_city = json.res;
        __.component.total_city = json.total;
      }).catch((err)=>{
        this.authService.catchErr(err);
      })
    }

    select(item){
      this.onSelect.emit(item);
      this.modalService.close("modal-city");
    }
    openModal() {
      this.modalService.open("modal-city");
      this.loadCityData();
    }
    closeModal() {
      this.modalService.close("modal-city");
    }

  }
