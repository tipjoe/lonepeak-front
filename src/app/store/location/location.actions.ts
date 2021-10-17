import { Location } from "src/app/interfaces/map/location";
export class AddLocation {
  static readonly type = '[Location] AddLocation';
  constructor(public location: Location) {}
}

export class GetLocations {
  static readonly type = '[Location] GetLocations';
  constructor() {}
}

export class GetRoads {
  static readonly type = '[Location] GetRoads';
  constructor() {}
}

export class RemoveLocation {
  static readonly type = '[Location] RemoveLocation';
  constructor(public id: number) {}
}

export class SetCurrentLocation {
  static readonly type = '[Location] SetCurrentLocation';
  constructor(public id: number) {}
}
