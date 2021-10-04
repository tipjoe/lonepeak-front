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
  comment: string = "The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from <b>Japan</b>.<br><br><script>alert('hi');</script>A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.";

  constructor() { }

  ngOnInit(): void {
  }

}
