import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';

import { MapComponent } from './map.component';


// Here, we're not testing the store (ngxs) but it's a dependency of this
// component so we'll mock it. See providers array below.
class StoreMock {
  select = jasmine.createSpy().and.returnValue(of())
  dispatch = jasmine.createSpy()
}

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // imports: [] for modules.

      // declarations: [] for components.
      declarations: [ MapComponent ],

      // TODO: Http stuff with test fakes.
      // providers: [] for services.
      providers: [
        {
          provide: Store,
          useClass: StoreMock
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    console.log('map comp', component);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should render a neighborhood map', () => {

  // });

});
