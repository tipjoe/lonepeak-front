import { Road } from '../../interfaces/map/road';

export namespace RoadActions {

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
    static readonly type = '[Road] Get';
    constructor(public id: number) {}
  }

  export class GetIndex {
    static readonly type = '[Road] GetIndex';
    constructor() {}
  }

  export class Create {
    static readonly type = '[Road] Create';
    constructor(public entity: Road) {}
  }

  export class Update {
    static readonly type = '[Road] Update';
    constructor(public entity: Road) {}
  }

  export class Delete {
    static readonly type = '[Road] Delete';
    constructor(public id: number) {}
  }
  /** End of of actions implemented by entity.state parent. **/

  /** Define action unique to this state slice here. */
}
