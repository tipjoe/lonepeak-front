import { HttpClient } from '@angular/common/http';
import { Location } from 'src/app/interfaces/map/location';
import { AbstractEntityService } from 'src/app/services/abstract-entity/abstract-entity.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService extends AbstractEntityService<Location> {

  url = this.baseUrl + 'location';

  constructor(
    private httpConcrete: HttpClient
  ) {
    super(httpConcrete);
  }

  // Basic CRUD done in parent class. Add anything unique to this here.
}
