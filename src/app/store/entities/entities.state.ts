import { Injectable } from "@angular/core";
import { State, Selector } from "@ngxs/store";
import { tap } from "rxjs/operators";

// NOTE: leaving here for later possible use but ignoring for now.

// This is a special meta state that can be used with any state that
// represents a list of entities (think collections of a type, such as users
// or locations).
export class EntitiesState {

  constructor() {}

  // Select the entities of a given type.
  @Selector()
  static entities<T>(state: { entities: T[]} ) {
    return state.entities;
  }
}
