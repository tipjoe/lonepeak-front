import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass']
})
export class PostsComponent implements OnInit {

  // myArray = Array.from(Array(10).keys());
  // postTiming: string = moment(1625796961 * 1000).fromNow();
  postTiming: string = moment(Date.now()).fromNow();

  constructor() { }

  ngOnInit(): void {
  }

}
