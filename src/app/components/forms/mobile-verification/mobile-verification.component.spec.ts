import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileVerificationComponent } from './mobile-verification.component';

describe('VerificationFormComponent', () => {
  let component: MobileVerificationComponent;
  let fixture: ComponentFixture<MobileVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MobileVerificationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
