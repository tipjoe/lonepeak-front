import { Observable } from 'rxjs';
import { LocationState } from './../../../store/location/location.state';
import { Select } from '@ngxs/store';
import { Store } from '@ngxs/store';
import { Road } from './../../../interfaces/map/road';
import { Location } from './../../../interfaces/map/location';
import { Component, OnInit } from '@angular/core';
import { AddLocation, GetLocations, RemoveLocation, SetCurrentLocation }
  from 'src/app/store/location/location.actions';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {

  // Commented properties from legacy. Delete if not used.
  // private gacs: array = [];
  // private initializeMap;
  // private last_fill;
  // private my_geo;
  // private update;

  // Give-a-craps (may include in the Location)
  // private my_gacs;
  // private selected_gacs;
  // private selected_gacs = 'gacs'


  // Location info
  // include in locations: notes, user, friend/know, membership, gacs, myGacs

  // All locations (entities) in neighborhood's top-level group.
  @Select(LocationState.locations) locations$: Observable<Location[]>;

  // Locations for the currently selected group.
  // TODO see location state comment.
  // @Select(LocationState.groupLocations) groupLocations$: Observable<Location[]>;

  // Selected location.
  @Select(LocationState.current) current$: Observable<Location>;


  // private lastLocation: Location;
  // private myLocation: Location;
  private roads: Road[] = [];

  // Users
  // private members: User[] = [];

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    // Load current map

    // Locations (parcel or unit)
    this.store.dispatch(new GetLocations());
    // Roads
    // this.store.dispatch(new GetRoads());

    // Members (with parcel locations)

    // Notes

  }

  setCurrentLocation(id: number) {
    this.store.dispatch(new SetCurrentLocation(id));
    // console.log('current', this.store.selectSnapshot(LocationState.current));
    // console.log('next', this.store.selectSnapshot(LocationState.locationById(id + 1)));
    let l = <Location> {...this.store.selectSnapshot(LocationState.current)};
    l.id = 99999;
    l.address1 = 'JOE TEST';

    this.store.dispatch(new AddLocation(l));
    // this.store.dispatch(new RemoveLocation(id));
  }

}
