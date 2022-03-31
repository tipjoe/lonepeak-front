import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { LocationService } from './location.service';

describe('LocationService', () => {
  let service: LocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // imports: [] for modules.

      // declarations: [] for components.

      // TODO: Http stuff with test fakes.
      // providers: [] for services.
      providers: [
        // Fake the HttpClient.
        {
          provide: HttpClient,
          useValue: {}
        },
      ]
    });
    service = TestBed.inject(LocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
