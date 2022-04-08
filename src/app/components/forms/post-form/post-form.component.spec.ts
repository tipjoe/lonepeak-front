import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { NgxImageCompressService } from 'ngx-image-compress';

import { PostFormComponent } from './post-form.component';

describe('PostFormComponent', () => {
  let component: PostFormComponent;
  let fixture: ComponentFixture<PostFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // imports: [] for modules.
      // declarations: [] for components.
      declarations: [ PostFormComponent ],
      // providers: [] for services.
      providers: [
        // NgxImageCompressService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
