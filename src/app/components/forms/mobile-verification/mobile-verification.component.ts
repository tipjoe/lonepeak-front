import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-mobile-verification',
  templateUrl: './mobile-verification.component.html',
  styleUrls: ['./mobile-verification.component.sass'],
})
export class MobileVerificationComponent implements OnInit {
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

  submitMobile() {
    this.verificationState = 1;
    console.log(this.mobileFormGroup);
  }

  submitKey() {
    this.verificationState = 2;
    console.log(this.verificationFormGroup);
  }

  stateReset() {
    this.verificationState = 0;
  }
}
