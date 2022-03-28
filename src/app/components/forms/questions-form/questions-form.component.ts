import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questions-form',
  templateUrl: './questions-form.component.html',
  styleUrls: ['./questions-form.component.sass'],
})
export class QuestionsFormComponent implements OnInit {
  extroIntro: number | null = 50;
  prepValue: number | null = 50;
  pronounsValue: number | null = 2;
  touchyTouchy: number | null = 50;

  getExtroValue() {
    return this.extroIntro;
  }

  constructor() {}

  ngOnInit(): void {}
}
