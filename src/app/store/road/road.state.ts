import { Road } from '../../interfaces/map/road';
import { Injectable } from "@angular/core";
import { State, Action, StateContext } from "@ngxs/store";
import { Observable } from 'rxjs';
import { RoadService } from 'src/app/services/road/road.service';
import { EntityState, EntityStateModel } from '../entity/entity.state';
import { RoadActions as RA } from "./road.action";

export interface RoadStateModel extends EntityStateModel<Road> {};

@State<RoadStateModel>({
  name: 'road',
  defaults: {
    entities: [],
    current: null,
    expires: 0,
  }
})

// This injectable decorator makes this available as a global service.
@Injectable({ providedIn: 'root' })
export class RoadState extends EntityState<Road> {

  // Keep roads for 365 days. They will rarely change (if ever) and this will
  // improve pwa app performance.
  // D * H * M * S * 1000 (ms)
  private expiresAt: number = Date.now() + (365 * 24 * 60 * 60 * 1000);

  // Inject private services needed by this state.
  constructor(
    private concreteEntityService: RoadService,
  ) {
    super(concreteEntityService);
  }

  /*** SELECTORS ***/

  /*** ACTIONS ***/
  // Get all for user's top-level neighborhood group.
  @Action(RA.GetIndex)
  getIndex(ctx: StateContext<RoadStateModel>, payload: RA.GetIndex): Observable<Road[]> {
    return super.getIndex(ctx, payload);
  }

  // Wrap other methods from EntityState if/when needed.
}
