import { HttpClient } from '@angular/common/http';
import { Location } from 'src/app/interfaces/map/location';
import { AbstractEntityService } from 'src/app/services/abstract-entity/abstract-entity.service';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

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

  /**
   * Get list of location IDs with addreseses (address1).
   *
   * @returns {Observable<Location[]>}
   */
  getIndexAddresses(): Observable<Location[]> {
    return this.httpConcrete.get<Location[]>(this.url + '/addresses')
      .pipe(
        catchError(this.handleError)
      );
  }

}
