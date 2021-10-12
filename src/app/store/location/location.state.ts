import { MapService } from './../../services/map/map.service';
import { Injectable } from "@angular/core";
import { Store, State, Select, Selector, Action, StateContext } from "@ngxs/store";
import { Location } from "src/app/interfaces/map/location";
import { GetLocations, GetRoads } from "./location.actions";
import { tap } from "rxjs/operators";

// import needed models.
// import actions.
// import services.
// import other states.

export interface LocationStateModel {
  locations: Location[];
};

// You may need multiple payload interfaces as used in your actions.
// export interface LocationPayload {}
// See if you need to define it.


// This defines a segment of the global state with <___StateModel>.
// `name` is the key used to access this state.
// `default` initializes this state's values.
@State<LocationStateModel>({
  name: 'locations',
  // This default should match the shape of the state model above.
  // Define both index/list and current/individual elements.
  defaults: {
    locations: []
  },

})

@Injectable()
export class LocationState {

  // Inject private services needed by this state.
  constructor(
    // private store: Store,
    private mapService: MapService,
  ) {}

  // Define @Select, @Action, private methods, etc.

  @Action(GetLocations)
  getLocations(ctx: StateContext<LocationStateModel>) {
    const state = ctx.getState();
    return this.mapService.getLocations().pipe(
      tap(locations => {
        ctx.patchState({ locations });
      })
    );
  }
}
