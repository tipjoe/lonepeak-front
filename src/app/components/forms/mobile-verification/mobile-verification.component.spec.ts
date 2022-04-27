import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MobileVerificationComponent } from './mobile-verification.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('VerificationFormComponent', () => {
  let component: MobileVerificationComponent;
  let fixture: ComponentFixture<MobileVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MobileVerificationComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileVerificationComponent);
    component = fixture.componentInstance;
    component.verificationState = 0;
    fixture.detectChanges();
  });

  it('should create with the correct initial state (0)', () => {
    expect(component).toBeTruthy();
    expect(component.verificationState).toBe(0);
  });

  it('should update verificationStateEvent to provided value', () => {
    // Arrange
    const value = 2;
    spyOn(component.verificationStateEvent, 'emit');

    // Act
    component.updateVerificationStateEvent(value);

    // Assert
    expect(component.verificationStateEvent.emit).toHaveBeenCalledWith(value);
  });

  it('calls submitMobile with valid form on submit and updates state)', () => {
    // Arrange
    const value = '8011234567';
    spyOn(component.verificationStateEvent, 'emit');

    // Act
    component.mobileFormGroup.value.mobile = value;
    component.submitMobile();

    // Assert
    // Emitting 1 will update component state to show the verify key state
    expect(component.verificationState).toBe(1);
    expect(component.verificationStateEvent.emit).toHaveBeenCalledWith(1);
  });

  it('calls submitMobile with empty or partial form, but fails', () => {
    // Arrange
    // Any value length < 10
    const value = '';
    spyOn(component.verificationStateEvent, 'emit');

    // Act
    component.mobileFormGroup.value.mobile = value;
    component.submitMobile();

    // Assert
    // The component state should remain at 0
    expect(component.verificationState).toBe(0);
    // verificationStateEvent should not emit in a failed submitMobile()
    expect(component.verificationStateEvent.emit).not.toHaveBeenCalled();
  });

  it('calls submitKey with valid form value and updates state)', () => {
    // Arrange
    const value = '54392';
    spyOn(component.verificationStateEvent, 'emit');

    // Act
    component.verificationFormGroup.value.key = value;
    component.submitKey();

    // Assert
    expect(component.verificationState).toBe(2);
    // Emitting 2 will update component state to show the successful verification
    expect(component.verificationStateEvent.emit).toHaveBeenCalledWith(2);
  });

  it('calls submitKey with empty or partial form, but fails', () => {
    // Arrange
    // Any value length < 5
    const value = '1234';
    // Component state for displaying the verificationFormGroup
    component.verificationState = 1;
    spyOn(component.verificationStateEvent, 'emit');

    // Act
    component.verificationFormGroup.value.key = value;
    component.submitKey();

    // Assert
    // The component state should remain at 1
    expect(component.verificationState).toBe(1);
    // verificationStateEvent should not emit in a failed submitKey()
    expect(component.verificationStateEvent.emit).not.toHaveBeenCalled();
  });
});
