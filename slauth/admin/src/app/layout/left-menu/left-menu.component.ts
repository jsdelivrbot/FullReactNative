import { Component, OnInit } from '@angular/core';
import { AppServices } from './../../app.services';
@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {
  constructor(private appServices: AppServices) { }
  ngOnInit() {
  }
}
