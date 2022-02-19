import { Location } from "src/app/interfaces/map/location";

export namespace LocationActions {

  /**
   * Actions implemented by entity.state.ts parent. Ngxs needs each class that
   * extends EntityState to uniquely define them so it knows how to
   * register and dispatch them.
   *
   * These are copied from entity.action.ts and modified with the concrete
   * Type in the [Type] label and parameter types. If additional methods are
   * defined in the parent, they need to be added to all the children.
   */
  export class Get {
    static readonly type = '[Location] Get';
    constructor(public id: number) {}
  }

  export class GetIndex {
    static readonly type = '[Location] GetIndex';
    constructor() {}
  }

  export class Create {
    static readonly type = '[Location] Create';
    constructor(public entity: Location) {}
  }

  export class Update {
    static readonly type = '[Location] Update';
    constructor(public entity: Location) {}
  }

  export class Delete {
    static readonly type = '[Location] Delete';
    constructor(public id: number) {}
  }
  /** End of of actions implemented by entity.state parent. **/

  /** Define action unique to this state slice here. */
}
