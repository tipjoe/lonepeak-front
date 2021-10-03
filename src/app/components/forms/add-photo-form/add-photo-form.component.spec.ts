import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPhotoFormComponent } from './add-photo-form.component';

describe('AddPhotoFormComponent', () => {
  let component: AddPhotoFormComponent;
  let fixture: ComponentFixture<AddPhotoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPhotoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPhotoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
