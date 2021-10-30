import { TestBed } from '@angular/core/testing';
import { RoadService } from './road.service';

describe('LocationService', () => {
  let service: RoadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
