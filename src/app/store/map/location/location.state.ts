import { Observable } from 'rxjs';
import { LocationService } from './../../../services/location/location.service';
import { EntityState } from './../../entity/entity.state';
import { Injectable } from "@angular/core";
import { State, Action, StateContext } from "@ngxs/store";
import { Location } from "src/app/interfaces/map/location";
import { LocationActions as LA } from "./location.action";
import { EntityStateModel } from '../../entity/entity.state';

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

  // Keep roads for 365 days. They will rarely change (if ever) and this will
  // improve pwa app performance.
  // D * H * M * S * 1000 (ms)
  private expiresAt: number = Date.now() + (365 * 24 * 60 * 60 * 1000);

  // Inject private services needed by this state.
  constructor(
    private concreteEntityService: LocationService,
  ) {
    super(concreteEntityService);
  }

  /*** SELECTORS ***/

  /*** ACTIONS ***/
  // For generic entity actions, just call the super method.
  @Action(LA.GetIndex)
  getIndex(ctx: StateContext<LocationStateModel>, payload: LA.GetIndex) {
    return super.getIndex(ctx, payload);
  }

  // Wrap other methods from EntityState if/when needed.
}
