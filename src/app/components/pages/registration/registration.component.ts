import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {

  // State of registration page. Determines display.
  // 0 - entry
  // 1 - join stepper
  // 2 - learn more side nav
  currentState: number = 0

  // Name and address.
  step1FormGroup: FormGroup
  // Phone and verification
  step2FormGroup: FormGroup

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.step1FormGroup = this._formBuilder.group({
      first: ['', Validators.required],
      last: ['', Validators.required],
      address: ['', Validators.required],
    })
    this.step2FormGroup = this._formBuilder.group({
      mobile: ['', Validators.required],
    })
  }

  // Toggle the join registration form.
  join() {
    this.currentState = this.currentState !== 1 ? 1 : 0
  }

  // Toggle learn more side nav.
  learnMore() {
    this.currentState = this.currentState !== 2 ? 2 : 0
  }
}
