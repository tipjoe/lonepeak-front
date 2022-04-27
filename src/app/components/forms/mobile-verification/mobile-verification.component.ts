import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.verificationStateEvent.emit(this.verificationState);
    this.mobileFormGroup = this._formBuilder.group({
      mobile: ['', Validators.required],
    });
    this.verificationFormGroup = this._formBuilder.group({
      key: ['', Validators.required],
    });
    console.log(this.mobileFormGroup);
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
    if (this.verificationFormGroup.value.key.length === 5) {
      this.verificationState = this.verificationState !== 2 ? 2 : 1;
      this.updateVerificationStateEvent(this.verificationState);
    }
  }

  // Returns to entering mobile number state
  stateReset() {
    this.verificationState = 0;
    this.updateVerificationStateEvent(this.verificationState);
  }
}
