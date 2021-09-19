import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  myArray = Array.from(Array(10).keys());
  postTiming: string = moment(1625796961 * 1000).fromNow();

  constructor() { }

  ngOnInit(): void {
  }

}
