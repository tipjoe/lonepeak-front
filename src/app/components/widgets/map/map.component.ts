import { Store } from '@ngxs/store';
import { MapService } from './../../../services/map/map.service';
import { Road } from './../../../interfaces/map/road';
import { Location } from './../../../interfaces/map/location';
import { Component, Input, OnInit } from '@angular/core';
import { GetLocations } from 'src/app/store/location/location.actions';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {

  // @Select

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
  private locations: Location[] = [];
  // private lastLocation: Location;
  // private myLocation: Location;
  private roads: Road[] = [];
  // private selectedLocation: Location;

  // Users
  // private members: User[] = [];

  constructor(
    private mapService: MapService,
    private store: Store
  ) { }

  ngOnInit(): void {
    // Load current map

    // Locations (parcel or unit)
    // this.mapService.getLocations();
    this.store.dispatch(new GetLocations())
    // Roads

    // Members (with parcel locations)

    // Notes

  }

}
