import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should continue to next state if all inputs are provided in step1Form', () => {
    // Arrange
    // Act
    // Assert
  });

  it("shouldn't continue if no inputs are provided in step1Form", () => {
    // Arrange
    // Act
    // Assert
  });

  it('should update mobileVerificationComponentState when mobileVerificationComponentStateHandler is called', () => {
    // Arrange
    // Act
    // Assert
  });
});
