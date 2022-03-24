import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.sass'],
})
export class RegistrationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  referrer = 'Joe Tippets';
}
