import { Road } from './../../interfaces/map/road';
import { HttpClient } from '@angular/common/http';
import { AbstractEntityService } from 'src/app/services/abstract-entity/abstract-entity.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoadService extends AbstractEntityService<Road> {

  url = this.baseUrl + 'road';

  constructor(
    private httpConcrete: HttpClient
  ) {
    super(httpConcrete);
  }

  // Basic CRUD done in parent class. Add anything unique to this here.
}
