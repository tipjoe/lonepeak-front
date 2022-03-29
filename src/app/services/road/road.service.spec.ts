import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RoadService } from './road.service';

describe('RoadService', () => {
  let service: RoadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // imports: [] for modules.

      // declarations: [] for components.

      // providers: [] for services.
      providers: [
        // Fake the HttpClient.
        {
          provide: HttpClient,
          useValue: {}
        },
      ]
    });
    service = TestBed.inject(RoadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
