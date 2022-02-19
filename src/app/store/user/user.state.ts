import { User } from './../../interfaces/user';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { EntityState } from '../entity/entity.state';
import { Injectable } from "@angular/core";
import { State, Action, StateContext } from "@ngxs/store";
import { EntityStateModel } from '../entity/entity.state';

import { UserActions as UA } from "./user.actions";

export interface UserStateModel extends EntityStateModel<User> {};

@State<UserStateModel>({
  name: 'user',
  defaults: {
    entities: [],
    // Logged in user.
    current: null,
    expires: 0,
  }
})

// This injectable decorator makes this available as a global service.
@Injectable({ providedIn: 'root' })
export class UserState extends EntityState<User>{

  // Keep roads for 365 days. They will rarely change (if ever) and this will
  // improve pwa app performance.
  // D * H * M * S * 1000 (ms)
  private expiresAt: number = Date.now() + (365 * 24 * 60 * 60 * 1000);

  // Inject private services needed by this state.
  constructor(
    private concreteEntityService: UserService,
  ) {
    super(concreteEntityService);
  }

  /*** SELECTORS ***/

  /*** ACTIONS ***/
  @Action(UA.GetIndex)
  getIndex(ctx: StateContext<EntityStateModel<User>>, payload: UA.GetIndex): Observable<User[]> {
    return super.getIndex(ctx, payload);
  }

  // Wrap other methods from EntityState if/when needed.
}
