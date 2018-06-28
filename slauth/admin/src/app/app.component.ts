import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppServices } from './app.services';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private appServices: AppServices, private router: Router) {
  }
}
