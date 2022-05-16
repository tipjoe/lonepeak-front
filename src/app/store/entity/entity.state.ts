import { Action, StateContext, createSelector } from '@ngxs/store';
import { of, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AbstractEntityService } from 'src/app/services/abstract-entity/abstract-entity.service';
import { EntityActions as EA } from './entity.action';

export interface Id {
  id: number;
}

// Extend this with a <T>ype in your concrete subclass.
export class EntityStateModel<T> {
	entities: T[] = [];
  current: T|null;
  expires: number = 0;
}

/**
 * Entity defaults are defined in the concrete subclass to have a unique name
 * key in the store. You can copy/paste this block and uncomment it.
 *
  @State<YOUR_STATE_MODEL_THAT_EXTENDS_ENTITY_STATE_MODEL>({
    name: 'entity_name',  // singular, not plural
    defaults: {
      entities: [],
      current: null,
      expires: 0
    }
  })
 */

// All entities T must extend the Id interface (guarantees numeric ID).
// to make entities searchable.
export class EntityState<T extends Id> {

  // Default to 20 minutes or override in child state class.
  protected expiresIn: number = (20 * 60 * 1000);

  /*** SELECTORS AND STATIC METHODS ***/
  static entities<T>() {
    return createSelector([this], (state: { entities: T[] }) => {
      return state.entities;
    });
  }

  static current<T>() {
    return createSelector([this], (state: { current: T | null }) => {
      return state.current;
    });
  }

  static expires() {
    return createSelector([this], (state: { expires: number }) => {
      return state.expires;
    });
  }

  // Get entity by ID.
  static entity<T extends Id>(id: number) {
    return createSelector([this], (state: { entities: T[] }) => {
      return state.entities.find(e => e.id === id);
    });
  }

  /**
   * CONSTRUCTOR - must be after selectors above.
   *
   * @param entityService concrete service subclass.
   */
	constructor(
    private entityService: AbstractEntityService<T>,
  ) {}

  /**
   * ACTIONS. See entity.actions.ts for declarations.
   *
   * Child states wrap these general CRUD functions.
   */

  // Get an entity by id and set to current.
	@Action(EA.Get)
	get(ctx: StateContext<EntityStateModel<T>>, payload: EA.Get) {
    const state = ctx.getState();
    const id = payload.id;

    // If already exists and not expired, set current and return.
    const found = state.entities.find(e => e.id === id);
    if (found && state.expires > Date.now()) {
      ctx.patchState({
        current: found,
      });
      return of<T>();
    }

    // Fetch via service, update expiration, and make it current.
    return this.entityService.get(id).pipe(
      tap(entity => {
        // Add to current list of entities in store.
        const entities = [...state.entities, entity];
        ctx.patchState({
          entities,
          expires: Date.now() + this.expiresIn,
          current: entity
        });
      })
    );
	}

  // Get multiple entities. API logic determines how many, etc.
  // TODO - implement payload param to limit number of index results.
  @Action(EA.GetIndex)
	getIndex(ctx: StateContext<EntityStateModel<T>>, payload: EA.GetIndex) {
    const state = ctx.getState();
    // console.log('slice before patch', state);
    // If already exists and not expired, return and get from local store.
    if (state.entities.length && state.expires > Date.now()) {
      return of(state.entities);
    }

    // Fetch it with its service, update expiration, and make it current.
    return this.entityService.getIndex().pipe(
      tap(entities => {
        ctx.patchState({
          entities,
          expires: Date.now() + this.expiresIn,
        });
      })
    );
	}

  @Action(EA.Create)
  create(ctx: StateContext<EntityStateModel<T>>, payload: EA.Create<T>) {
    const state = ctx.getState();

    // Ensure it doesn't already exist locally.
    const found = state.entities.find(e => payload.entity.id === e.id);

    if (found) {
      // Already in store so do nothing.
      return of<T>();
    }

    // Add to local store after it's succesfully created on the server.
    return this.entityService.create(payload.entity).pipe(
      tap(entity => {
        ctx.patchState({
          entities: [...state.entities, entity],
          current: entity,
          expires: Date.now() + this.expiresIn,
        });
      })
    );
  }

  @Action(EA.Update)
  update(ctx: StateContext<EntityStateModel<T>>, payload: EA.Update<T>) {
    const state = ctx.getState();

    // Ensure it exists locally.
    const found = state.entities.find(e => e.id === payload.entity.id);

    if (!found) {
      // No entity with this ID exists. Ignore.
      return of<T>();
    }

    // Update local store after it's succesfully updated on the server.
    // Had to do this the long way to avoid type errors with generics.
    return this.entityService.update(payload.entity).pipe(
      tap(entity => {
        const entities = state.entities.map(e => {
          if (e.id === payload.entity.id) {
            return entity;
          } else {
            return e;
          }
        });

        ctx.setState({
          entities: entities,
          current: entity,
          expires: Date.now() + this.expiresIn
        });
      })
    );
  }

  @Action(EA.Delete)
  delete(ctx: StateContext<EntityStateModel<T>>, payload: EA.Delete) {
    const state = ctx.getState();

    // Ensure it exists locally.
    const found = state.entities.find(e => e.id === payload.id);

    if (!found) {
      // No entity with this ID exists. Ignore.
      return of<boolean>();
    }

    // Remove entity from local store if successfully deleted on server.
    return this.entityService.delete(payload.id).pipe(
      tap(success => {
        if (success) {
          const entities = state.entities.filter(e => {
            return e.id !== payload.id;
          });

          ctx.patchState({
            entities: entities,
            current: null,
            expires: Date.now() + this.expiresIn
          });
        }
      })
    );
  }

}
