import { Injectable } from "@angular/core";
import { Store, State, Select, Selector, Action, StateContext } from "@ngxs/store";
// import needed models.
// import actions.
// import services.
// import other states.

export class GacStateModel {

}

// You may need multiple payload interfaces as used in your actions.
export interface GacPayload {}


@Injectable()

// This defines a segment of the global state with <___StateModel>.
// `name` is the key used to access this state.
// `default` initializes this state's values.
@State<GacStateModel>({
  name: 'gac',
  // This default should match the shape of the state model above.
  // Define both index/list and current/individual elements.
  defaults: {}

})

export class GacState {

  // Inject private services needed by this state.
  constructor(
    private store: Store,
  ) {}

  // Define @Select, @Action, private methods, etc.


}
