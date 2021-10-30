export namespace EntityActions {
  /**
   * Get the entity from the local store or api.
   */
  export class Get {
    static readonly type = '[Entity] Get';
    constructor(public id: number) {}
  }

  /**
   * Get a list of entities from the local store or api.
   */
  export class GetIndex {
    static readonly type = '[Entity] GetIndex';
    constructor() {}
  }

  /**
   * Create a new entity.
   */
  export class Create<T> {
    static readonly type = '[Entity] Create';
    constructor(public entity: T) {}
  }

  /**
   * Update an existing entity.
   */
  export class Update<T> {
    static readonly type = '[Entity] Update';
    constructor(public entity: T) {}
  }

  /**
   * Delete an entity.
   */
  export class Delete {
    static readonly type = '[Entity] Delete';
    constructor(public id: number) {}
  }

  // Add other generic crud actions here to make them available to all
  // entity stores that extend this.

}
