import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeFormComponent } from './me-form.component';

describe('MeFormComponent', () => {
  let component: MeFormComponent;
  let fixture: ComponentFixture<MeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
