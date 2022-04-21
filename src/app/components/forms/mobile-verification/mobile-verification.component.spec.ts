import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MobileVerificationComponent } from './mobile-verification.component';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import {Output, EventEmitter } from '@angular/core';

describe('VerificationFormComponent', () => {
  let component: MobileVerificationComponent;
  let fixture: ComponentFixture<MobileVerificationComponent>;
  let getInputById: (value: string) => HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MobileVerificationComponent,
        FormGroup,
        FormBuilder,
        Validators,
        // Output,
        // EventEmitter
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileVerificationComponent);
    component = fixture.componentInstance;
    component.verificationState = 0;
    component.verificationStateEvent.emit(0);
    fixture.detectChanges();

    getInputById = (value) => {
      const debugEl = fixture.debugElement.nativeElement;
      const el = debugEl.query(By.css(value));
      return el;
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    spyOn(component.verificationStateEvent, 'emit');
    expect(component.verificationStateEvent.emit).toBe(0);
  });

  it('should update verificationStateEvent to provided value of 3', () => {
    // Arrange
    const value = 3;
    spyOn(component.verificationStateEvent, 'emit');

    // Act
    component.updateVerificationStateEvent(3);

    // Assert
    expect(component.verificationStateEvent.emit).toBe(3);
  });

  it('calling submitMobile should submit form and update verificationState and verificationStateEvent to provided values', () => {
    // Arrange
    const mobileInput = getInputById('#mobile');
    const value = '8011234567';
    spyOn(component.verificationStateEvent, 'emit');

    // Act
    mobileInput.value = value;
    component.submitMobile();

    // Assert
    expect(component.mobileFormGroup.value.mobile).toBe(value);
    expect(component.verificationStateEvent.emit).toBe(1);
  });
});
