import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameAddrFormComponent } from './name-addr-form.component';

describe('NameAddrFormComponent', () => {
  let component: NameAddrFormComponent;
  let fixture: ComponentFixture<NameAddrFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NameAddrFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NameAddrFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
