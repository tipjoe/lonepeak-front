import { User } from "src/app/interfaces/user";

export namespace UserActions {

  export class Get {
    static readonly type = '[User] Get';
    constructor(public id: number) {}
  }

  export class GetIndex {
    static readonly type = '[User] GetIndex';
    constructor() {}
  }

  export class Create {
    static readonly type = '[User] Create';
    constructor(public entity: User) {}
  }

  export class Update {
    static readonly type = '[User] Update';
    constructor(public entity: User) {}
  }

  export class Delete {
    static readonly type = '[User] Delete';
    constructor(public id: number) {}
  }
  /** End of of actions implemented by entity.state parent. **/

  /** Define action unique to this state slice here. */
}
