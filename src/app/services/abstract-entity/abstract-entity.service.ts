import { environment } from './../../../environments/environment';
import { Id } from './../../store/entity/entity.state';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Use this with any entity service to avoid duplicating common actions.
 * T is the entity type this services handles.
 */
export abstract class AbstractEntityService<T extends Id> {

  baseUrl: string = environment.apiUrl;
  // Add path as baseurl + '/...' in child classes.
  url: string;

  /**
   * Instatiate the service.
   *
   * @param {HttpClient} http - The http client service.
   */
  constructor(private http: HttpClient) {}

  /**
   * Get a single entity by id.
   *
   * @param {number} id - Unique id of the entity to fetch.
   * @returns {Observable<T>} - The entity.
   */
  get(id: number): Observable<T> {
    return this.http.get<T>(this.url + '/' + id).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Get multiple entities.
   *
   * @returns {Observable<T[]>}
   */
  getIndex(): Observable<T[]> {
    return this.http.get<T[]>(this.url).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Create the new entity and return it.
   *
   * @param {T} entity - The entity to create.
   * @returns {T} - The new entity.
   */
  create(entity: T): Observable<T> {
    return this.http.post<T>(this.url, entity).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Update the entity and return it.
   *
   * @param {T} entity - The entity to update.
   * @returns {T} - The updated entity.
   */
  update(entity: T): Observable<T> {
    return this.http.put<T>(this.url + '/' + entity.id, entity).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Delete the entity and return whether it succeeded.
   *
   * @param {number} id - Unique id for the entity.
   * @returns {Observable<boolean>} - Whether delete succeeded.
   */
  delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.url + '/' + id).pipe(
      catchError(this.handleError)
    );
  }

  // Make error handler static so non-entity services can use it.
  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something went wrong.');
  }
}
