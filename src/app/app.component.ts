import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  isAlertVisible: boolean = false;

  constructor(private titleService:Title) {}

  ngOnInit() {
    // Set the browser tab title (<head><title>XXX</title></head).
    this.titleService.setTitle(environment.appName);
  }

}
