import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-name-addr-form',
  templateUrl: './name-addr-form.component.html',
  styleUrls: ['./name-addr-form.component.sass'],
})
export class NameAddrFormComponent implements OnInit {
  first: string = '';
  last: string = '';
  address: string = '';

  constructor() {}

  ngOnInit(): void {}
}
