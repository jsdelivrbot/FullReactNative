import { Component, OnInit } from '@angular/core';
import { AppServices } from './../../app.services';
declare var $:any;
@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  constructor(private appServices: AppServices) { }

  ngOnInit() {
    $('[data-toggle="offcanvas"]').click(function () {
      $('.row-offcanvas').toggleClass('active')
    });
  }

}
