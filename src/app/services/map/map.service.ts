import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as e } from 'src/environments/environment';
import { Location } from 'src/app/interfaces/map/location';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(
    private http: HttpClient
  ) { }

  // Get map locations.
  getLocations(group: number = 0): Observable<Location[]> {
    return this.http.get<Location[]>(e.apiUrl + 'mapdata/parcels');
  }

  // Get map roads.
  getRoads(group: number = 0) {

  }

}
