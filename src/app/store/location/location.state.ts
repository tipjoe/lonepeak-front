import { Observable, of, tap } from 'rxjs';
import { LocationService } from '../../services/location/location.service';
import { EntityState } from '../entity/entity.state';
import { Injectable } from "@angular/core";
import { State, Action, StateContext } from "@ngxs/store";
import { LocationActions as LA } from "./location.action";
import { EntityStateModel } from '../entity/entity.state';
import { Location } from "src/app/interfaces/map/location";

export interface LocationStateModel extends EntityStateModel<Location> {};

@State<LocationStateModel>({
  name: 'location',
  defaults: {
    entities: [],
    current: null,
    expires: 0
  }
})

// This injectable decorator makes this available as a global service.
@Injectable({ providedIn: 'root' })
export class LocationState extends EntityState<Location>{

  // Inject private services needed by this state.
  constructor(
    private concreteEntityService: LocationService,
  ) {
    super(concreteEntityService);

    // Keep default location info for 365 days. They will rarely change
    // (if ever) and this will improve pwa app performance.
    // D * H * M * S * 1000 (ms)
    this.expiresIn = Date.now() + (365 * 24 * 60 * 60 * 1000);
  }

  /*** SELECTORS ***/

  /*** ACTIONS ***/
  // For generic entity actions, just call the super method.
  @Action(LA.GetIndex)
  getIndex(ctx: StateContext<LocationStateModel>, payload: LA.GetIndex): Observable<Location[]> {
    return super.getIndex(ctx, payload);
  }

  // Other actions that don't inherit from the generic entity service.
  @Action(LA.GetIndexAddresses)
  getIndexAddresses(ctx: StateContext<LocationStateModel>, payload: LA.GetIndexAddresses): Observable<Location[]> {
    // This pattern copied from entity.state.ts::getIndex().
    const state = ctx.getState();

    // If already exists and not expired, return and get from local store.
    if (state.entities.length && state.expires > Date.now()) {
      return of(state.entities);
    }

    // Fetch it with its service, update expiration, and make it current.
    return this.concreteEntityService.getIndexAddresses().pipe(
      tap(entities => {
        ctx.patchState({
          entities,
          expires: Date.now() + this.expiresIn,
        });
      })
    );
  }
}
