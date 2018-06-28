import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalService } from '../modal.service';
import { AppServices } from '../../app.services';
import { AuthService } from '../../auth/auth.service';
declare var $:any;

@Component({
  selector: 'app-popup-ward',
  templateUrl: './popup-ward.component.html',
  styleUrls: ['./popup-ward.component.css']
})
export class PopupWardComponent implements OnInit {
  data_ward = []; currentPage_ward = 1; itemsPerPage_ward = 0; total_ward = 0;
  f_districtcode = ''; f_wardcode = ''; f_wardname = '';
  propertyName ; order = 'ASC';
  districtcode = '';
  @Output() onSelect = new EventEmitter<any>();

  constructor(private modalService:ModalService,
    private appServices: AppServices,
    private authService: AuthService) {
      this.itemsPerPage_ward = this.appServices.session.paginate ?  this.appServices.session.paginate[0].short : 12 ;
    }

    ngOnInit() {
    }

    loadWardData(param = '') {
      let skip = (this.currentPage_ward-1)*this.itemsPerPage_ward;
      let limit =  this.itemsPerPage_ward;
      let filter;
      if(param) {
        if(this.f_districtcode.length > 0) filter = $.extend(filter, {'districtcode': {like: this.f_districtcode}});
        if(this.f_wardcode.length > 0) filter = $.extend(filter, {'wardcode': {like: this.f_wardcode}});
        if(this.f_wardname.length > 0) filter = $.extend(filter, {'wardname': {like: this.f_wardname}});
      }
      console.log(this.districtcode);
      
      this.appServices.findWard({'filter': JSON.stringify({'where': $.extend({'districtcode': this.districtcode} , filter), 'skip': skip, 'limit': limit, 'order': this.propertyName ? this.propertyName + " " + this.order : null})}, this)
      .then(function(__){
        let json = __.response.json();
        __.component.data_ward = json.res;
        __.component.total_ward = json.total;
      }).catch((err)=>{
        this.authService.catchErr(err);
      })
    }

    select(item){
      this.onSelect.emit(item);
      this.modalService.close("modal-ward");
    }
    openModal(districtcode) {
      this.districtcode = districtcode;
      this.modalService.open("modal-ward");
      this.loadWardData();
    }
    closeModal() {
      this.modalService.close("modal-ward");
    }

}
