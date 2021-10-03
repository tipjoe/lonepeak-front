import { Component, Input, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.sass']
})
export class PostFormComponent implements OnInit {

  isForm: boolean = false;

  constructor(
    // private router: Router
  ) { }

  ngOnInit(): void {
    // this.isForm = this.router.url == '/add-post';
  }

  toggleForm() {
    this.isForm = !this.isForm;
  }
}
