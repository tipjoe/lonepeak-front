import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-verification',
  templateUrl: './mobile-verification.component.html',
  styleUrls: ['./mobile-verification.component.sass'],
})
export class MobileVerificationComponent implements OnInit {
  // State for displayed forms max of 3 states (0-2)
  verificationState: number = 0;
  // State Output for Parent Components
  @Output() verificationStateEvent = new EventEmitter<number>();
  mobileFormGroup: FormGroup;
  verificationFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.verificationStateEvent.emit(this.verificationState);
    this.mobileFormGroup = this._formBuilder.group({
      mobile: ['', Validators.required],
    });
    this.verificationFormGroup = this._formBuilder.group({
      key: ['', Validators.required],
    });
  }

  // Updates verificationStateEvent to the passed through number
  updateVerificationStateEvent(newValue: number) {
    this.verificationStateEvent.emit(newValue);
  }

  // Captures mobile number from form submit
  submitMobile() {
    if (this.mobileFormGroup.value.mobile.length === 10) {
      this.verificationState = this.verificationState !== 1 ? 1 : 0;
      this.updateVerificationStateEvent(this.verificationState);
    }
  }

  // Authentication for mobile verification key
  submitKey() {
    // TODO: verify code here and show spinner. If successful, redirect
    // to welcome (new intro page) else tell user code is wrong.
    this.router.navigate(['/home']);
  }

  // Returns to entering mobile number state
  stateReset() {
    this.verificationState = 0;
    this.updateVerificationStateEvent(this.verificationState);
  }
}
