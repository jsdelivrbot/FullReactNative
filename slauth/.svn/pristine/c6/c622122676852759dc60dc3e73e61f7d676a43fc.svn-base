import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalService } from '../modal.service';
import { AppServices } from '../../app.services';
import { AuthService } from '../../auth/auth.service';
declare var $:any;

@Component({
  selector: 'app-popup-district',
  templateUrl: './popup-district.component.html',
  styleUrls: ['./popup-district.component.css']
})
export class PopupDistrictComponent implements OnInit {
  data_district = []; currentPage_district = 1; itemsPerPage_district = 0; total_district = 0;
  f_citycode = ''; f_districtcode = ''; f_districtname = '';
  propertyName ; order = 'ASC';
  citycode = '';
  @Output() onSelect = new EventEmitter<any>();

  constructor(private modalService:ModalService,
    private appServices: AppServices,
    private authService: AuthService) {
      this.itemsPerPage_district = this.appServices.session.paginate ?  this.appServices.session.paginate[0].short : 12 ;
    }

    ngOnInit() {
    }

    loadDistrictData(param = '') {
      let skip = (this.currentPage_district-1)*this.itemsPerPage_district;
      let limit =  this.itemsPerPage_district;
      let filter;
      if(param) {
        if(this.f_citycode.length > 0) filter = $.extend(filter, {'citycode': {like: this.f_citycode}});
        if(this.f_districtcode.length > 0) filter = $.extend(filter, {'districtcode': {like: this.f_districtcode}});
        if(this.f_districtname.length > 0) filter = $.extend(filter, {'districtname': {like: this.f_districtname}});
      }
      console.log(this.citycode);

      this.appServices.findDistrict({'filter': JSON.stringify({'where': $.extend({'citycode': this.citycode} , filter), 'skip': skip, 'limit': limit, 'order': this.propertyName ? this.propertyName + " " + this.order : null})}, this)
      .then(function(__){
        let json = __.response.json();
        __.component.data_district = json.res;
        __.component.total_district = json.total;
      }).catch((err)=>{
        this.authService.catchErr(err);
      })
    }

    select(item){
      this.onSelect.emit(item);
      this.modalService.close("modal-district");
    }
    openModal(citycode) {
      this.citycode = citycode;
      this.modalService.open("modal-district");
      this.loadDistrictData();
    }
    closeModal() {
      this.modalService.close("modal-district");
    }


}
