import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationFormComponent } from './verification-form.component';

describe('VerificationFormComponent', () => {
  let component: VerificationFormComponent;
  let fixture: ComponentFixture<VerificationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerificationFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
