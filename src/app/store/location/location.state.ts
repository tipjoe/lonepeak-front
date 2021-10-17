import { MapService } from './../../services/map/map.service';
import { Injectable } from "@angular/core";
import { State, Action, StateContext, createSelector, Selector } from "@ngxs/store";
import { Location } from "src/app/interfaces/map/location";
import { AddLocation, GetLocations, GetRoads, RemoveLocation,
         SetCurrentLocation
       } from "./location.actions";
import { tap } from "rxjs/operators";


export interface LocationStateModel {
  current: Location | null;
  entities: Location[];
}

@State<LocationStateModel>({
  name: 'location',
  defaults: {
    current: null,
    entities: [],
  }
})

@Injectable()
export class LocationState {

  // Inject private services needed by this state.
  constructor(
    private mapService: MapService,
  ) {}


  /*** SELECTORS ***/

  @Selector([LocationState])
  static locations(state: LocationStateModel) {
    return state.entities;
  }

  @Selector([LocationState])
  static current(state: LocationStateModel) {
    return state.current;
  }

  /*** DYNAMIC SELECTORS ***/

  static locationById(id: number) {
    return createSelector([LocationState], (state: LocationStateModel) => {
      return state.entities.find(e => e.id === id);
    });
  }


  /*** ACTIONS ***/

  // Add a location to entities list.
  @Action(AddLocation)
  addLocation({ getState, patchState }: StateContext<LocationStateModel>, payload: AddLocation) {
    const state = getState();

    // Do nothing if ID already exists.
    const location = state.entities.find(e => e.id === payload.location.id);
    if (location) return;

    patchState({
      entities: [
        ...state.entities,
        payload.location
      ]
    });
  }

  // Get all locations for user's top-level neighborhood group.
  @Action(GetLocations)
  getLocations(ctx: StateContext<LocationStateModel>) {
    const state = ctx.getState();

    // If they've already been loaded from api, use local cached values.
    // They will be available in the locations$ property.
    if (state.entities.length > 1) return;

    return this.mapService.getLocations().pipe(
      tap(locations => {
        ctx.setState({
          entities: locations,
          current: null
        });
      })
    );
  }

  // Remove a location from entities list.
  @Action(RemoveLocation)
  removeLocation({ getState, patchState }: StateContext<LocationStateModel>, payload: RemoveLocation) {
    const state = getState();

    // Get list of all but removed location.
    const locations = state.entities.filter(e => e.id !== payload.id);

    patchState({
      entities: locations
    });

    // If current location has been deleted, set it to null.
    if (state.current?.id === payload.id) {
      patchState({
        current: null
      });
    }
  }

  // Set current location by ID.
  @Action(SetCurrentLocation)
  setCurrentLocation(ctx: StateContext<LocationStateModel>, payload: SetCurrentLocation) {
    const location = ctx.getState().entities.find(l => l.id == payload.id);
    ctx.patchState({
      current: location
    });
  }

}
