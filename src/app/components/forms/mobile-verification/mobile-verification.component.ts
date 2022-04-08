import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-mobile-verification',
  templateUrl: './mobile-verification.component.html',
  styleUrls: ['./mobile-verification.component.sass'],
})
export class MobileVerificationComponent implements OnInit {
  // State for displayed forms max of 3 states (0-2)
  verificationState: number = 0;
  mobileFormGroup: FormGroup;
  verificationFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.mobileFormGroup = this._formBuilder.group({
      mobile: ['', Validators.required],
    });
    this.verificationFormGroup = this._formBuilder.group({
      key: ['', Validators.required],
    });
  }

  // Captures mobile number from form submit
  submitMobile() {
    this.verificationState = 1;
    console.log(this.mobileFormGroup);
  }

  // Authentication for mobile verification key
  submitKey() {
    this.verificationState = 2;
    console.log(this.verificationFormGroup);
  }

  // Returns to entering mobile number state
  stateReset() {
    this.verificationState = 0;
  }
}
