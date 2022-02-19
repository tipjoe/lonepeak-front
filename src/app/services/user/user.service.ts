import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/interfaces/user';
import { AbstractEntityService } from 'src/app/services/abstract-entity/abstract-entity.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractEntityService<User> {

  url = this.baseUrl + 'user';

  constructor(
    private httpConcrete: HttpClient
  ) {
    super(httpConcrete);
  }

  // Basic CRUD done in parent class. Add anything unique to this here.
}
