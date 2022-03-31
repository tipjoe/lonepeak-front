import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

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
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
