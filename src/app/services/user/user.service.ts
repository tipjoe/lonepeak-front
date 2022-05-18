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

  // Before making our first request that requires authentication, we call
  // /sanctum/csrf-cookie. The response headers come with an XSRF-COOKIE that
  // will be included in future requests.

  // This is also returned with other requests, such as getting the list of
  // addresses for registration. We need to allow /join/XXXXX requests where
  // XXXXX is an expiring token to protect access to the referrer's name and
  // photo.

  // this.httpConcrete.get('http://localhost/sanctum/csrf-cookie', { observe: 'response' })
  //   .subscribe(r => {
  //     console.log('cookie', r.headers.get('SOME-HEADER'))
  //   });

  // Basic CRUD done in parent class. Add anything unique to this here.
}
