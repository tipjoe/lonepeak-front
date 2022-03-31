import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatMenu } from '@angular/material/menu';

import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // imports: [] for modules.
      declarations: [
        NavComponent,
        MatMenu
      ],
      // providers: [] for services.
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
