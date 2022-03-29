import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-name-address-form',
  templateUrl: './name-address-form.component.html',
  styleUrls: ['./name-address-form.component.sass'],
})
export class NameAddressFormComponent implements OnInit {
  first: string = '';
  last: string = '';
  address: string = '';

  constructor() {}

  ngOnInit(): void {}
}
