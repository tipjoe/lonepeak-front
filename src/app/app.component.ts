import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  constructor(private titleService:Title) {
    // Set the browser tab title.
    this.titleService.setTitle(environment.appName);
  }

}
