import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameAddressFormComponent } from './name-address-form.component';

describe('NameAddressFormComponent', () => {
  let component: NameAddressFormComponent;
  let fixture: ComponentFixture<NameAddressFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NameAddressFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NameAddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
