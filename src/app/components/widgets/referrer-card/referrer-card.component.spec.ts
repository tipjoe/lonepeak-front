import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferrerCardComponent } from './referrer-card.component';

describe('ReferrerCardComponent', () => {
  let component: ReferrerCardComponent;
  let fixture: ComponentFixture<ReferrerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferrerCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferrerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
