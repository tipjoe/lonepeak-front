import { User } from '../../../interfaces/user';
import { Select, Store } from '@ngxs/store';

import { Location } from '../../../interfaces/map/location';
import { LocationState } from '../../../store/location/location.state';
import { LocationActions as LA } from '../../../store/location/location.action';

import { Road } from '../../../interfaces/map/road';
import { RoadState } from '../../../store/road/road.state';
import { RoadActions as RA } from '../../../store/road/road.action';

import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, merge, Observable, scheduled, Subscription } from 'rxjs';
import * as d3 from 'd3';
import * as SvgPanZoom from 'svg-pan-zoom';
import { throttleTime } from 'rxjs/operators';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit, OnDestroy {

  // Commented properties from legacy. Delete if not used.
  // private gacs: array = [];
  // private initializeMap;
  private myGeo: any;
  // private update;

  // Give-a-craps (may include in the Location)
  myGacs: any;
  selectedGacs: any = 'gacs'


  // Locations in store are different than d3 format used here.
  locations: any = [];
  myLocation: Location;
  currentLocation: Location;
  lastLocation: Location;
  lastFill: string;

  // Roads in store are different than d3 format used here.
  roads: any = [];

  // SVG groups on map. Layers driven by geo locations and roads data.
  gLocations: any;
  gRoads: any;

  // Users
  // private members: User[] = [];

  // Declare properties.
  count: number;
  excludedLocations: number[];

  // SVG canvas for d3 map.
  svg: any;

  // Dimensions for map.
  width: number;
  height: number;
  top: number;
  left: number;
  margin: number;

  // GeoObject with metadata about scale and display algorthm.
  projection: any;

  // Converts feature paths to screen coordinates based on projection.
  path: any;

  // Pan controller.
  pan: SvgPanZoom.Instance;

  // gFriends: any;
  // gGacs: any;
  // gBuildings: any;
  // gMembers: User[];
  // gMyGacs: any;

  // This listens for the window.resize event to re-render map.
  resizeSubscription$: Subscription;

  constructor(
    public map: ElementRef,
    private store: Store,
  ) {}

  ngOnInit(): void {
    // Watch for window resize event (i.e. changing phone orienation).
    this.handleWindowResize();

    // Get all needed map data.
    merge(this.store.dispatch([new LA.GetIndex(), new RA.GetIndex()]))
      .subscribe(() => {
        // Tranform locations from store into format d3 maps can use.
        this.locations = this.store.selectSnapshot(LocationState.entities<Location>())
          .map(e => {
            return {
              "type": "Feature",
              "properties": { "id": e.id, "parcel": e.parcel,
                              "address1": e.address1, "days_since_gac": e.days_since_gac,
                              "note": e.note, "latitude": e.latitude, "longitude": e.longitude
                            },
              "geometry": JSON.parse(e.geometry)
            };
          });

        // Tranform roads from store into format d3 maps can use.
        this.roads = this.store.selectSnapshot(RoadState.entities<Road>())
          .map(e => {
            return {
              "type": "Feature",
              "properties": { "id": e.id, "group": e.group, "name": e.name },
              "geometry": JSON.parse(e.geometry)
            };
          });

        // Initialize the map on first load.
        this.initializeMap();
        this.renderMap();

    });
  }

  ngOnDestroy() {
    this.resizeSubscription$.unsubscribe();
  }

  setCurrentLocation(id: number) {
    this.store.dispatch(new LA.Get(id));
  }


  initializeMap() {
    // If svg_map already exists, remove pan reference and old svg.
    // delete this.pan ? this.pan : undefined;
    const mapCheck = document.querySelector("#svg_map");
    if (mapCheck) {
      mapCheck.remove();
    }

    this.setMapSizeAndPosition();

    // The projection translates geo coordinates (lat/lng) to pixel
    // locations on the map/screen.
    this.projection = d3.geoAlbers()
        .scale(15000000)
        // rotate() defines:
        //   yaw/lambda - counter-clockwise rotation around the z-axis.
        //   pitch/phi - counter-clockwise rotation around the y-axis.
        //   roll/gamma - counter-clockwise rotation around the x-axis. 0 default.
        // Visualize here: https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/6DOF.svg/1200px-6DOF.svg.png
        // .rotate([Math.abs(this.myGeo[1]), 0])
        // Centers horizontally with longitude.
        .rotate([111.875944, 0])
        // Center vertically with latitude.
        .center([0, 40.560151])
        .translate([this.width / 2, this.height / 2]);

    // Converts feature paths to screen coordinates based on the projection.
    this.path = d3.geoPath()
        .projection(this.projection);

    this.svg = d3.select("#map")
        .append("svg")
        .attr("id", "svg_map")
        .attr("width", this.width + "px")
        .attr("height", this.height + "px");
        // SVG requires translation to move -- doesn't respect css margin.
        // .append("g")
        // .attr("transform", "translate(" + this.margin + "," + this.margin + ")");

    this.gLocations = this.svg.append("g");
    this.gRoads = this.svg.append("g");

    this.excludedLocations = [99, 395];
    this.count = 0;

    // Enables interactive map navigation (pan, zoom).
    this.pan = SvgPanZoom('#svg_map', {
        zoomEnabled: true,
        controlIconsEnabled: true,
        fit: false,
        center: false,
        minZoom: .6
    });
  }

  renderMap() {
    // Put this into that so we don't lose it in d3 callback scopes.
    const that = this;

    this.gLocations.selectAll("path")
      .data(this.locations)
      .enter()
      .append('path')
      .attr('fill', function(d: any) {
        // if (d) {
        //   return 'green';
        // } else {
        //   return 'red';
        // }

        return that.getFillColor(d);
        // return this.getFillColor(d, this.myLocation, this.exclusions);
      })
      .attr("id", (d: any) => d.properties.id)
      .attr("d", this.path)
      .attr("stroke", "#333")
      // .on('click', d => {
      //     this.selectLocation(d);
      // })
      // .on('touchstart', d => {
      //     this.selectLocation(d);
      // })
      // .attr("class", "locations")
      .append("title").text((d: any) => d.properties.address1);

    // Roads
    this.gRoads.selectAll("path")
        .data(this.roads)
        .enter()
        .append("path")
        .attr("id", (d: any) => "road" + d.properties.id)
        .attr("stroke", "rgba(0,0,0,0)")
        .attr("fill", "rgba(0,0,0,0)")
        .attr("d", this.path);

    // Road labels (i.e. street names)
    this.gRoads.selectAll("text")
        .data(this.roads)
        .enter()
        .append("text")
        .attr("dx", "25")
        .attr("dy", "6")
        .append("textPath")
        .attr("font-size", "16px")
        .attr("stroke", "none")
        .attr("fill", "black")
        .attr("href", (d: any) => "#road" + d.properties.id)
        .text((d: any) => d.properties.name);

    // g_members.selectAll("circle")
    //     .data(parcels)
    //     .enter()
    //     .filter(function(d) {
    //         return !!members.get(d.properties.id);
    //     })
    //     .append("circle")
    //     .attr("cx", d => projection([d.properties.longitude, d.properties.latitude])[0])
    //     .attr("cy", d => projection([d.properties.longitude, d.properties.latitude])[1])
    //     .attr("r", 9)
    //     .attr("id", d => "f" + d.properties.id)
    //     .attr("fill", "skyblue");

    // g_friends.selectAll("circle")
    //     .data(parcels)
    //     .enter()
    //     .filter(function(d) {
    //         return !!friends.get(d.properties.id);
    //     })
    //     .append("circle")
    //     .attr("cx", d => projection([d.properties.longitude, d.properties.latitude])[0])
    //     .attr("cy", d => projection([d.properties.longitude, d.properties.latitude])[1])
    //     .attr("r", 7)
    //     .attr("id", d => "f" + d.properties.id)
    //     .attr("fill", "goldenrod");
  }

  /**
   * Return the color with the correct opacity (shade of green).
   * @param {object} feature
   * @param {int} myLocation
   * @param {array} exclusions
   *
   * @return {string} The color/rgba string.
   */
  private getFillColor(feature: any): string {
    // Make exclusions gray.
    if (this.excludedLocations.indexOf(parseInt(feature.properties.id)) > -1) {
        return "lightgray";
    }

    // Make my home yellow unless its selected below.
    if (this.myLocation == feature.properties.id) {
        return "rgba(255,237,74, .50)";
    }

    // Selected neighbor.
    // if (this.currentLocation) {
    //     if (this.currentLocation.properties.id == feature.properties.id) {
    //         return "rgba(52, 144, 220, .5)";
    //     }
    // }

    // All other homes are colored based on days since someone gave a crap.

    const daysSinceGac = feature.properties.days_since_gac;
    let fillOpacity = 0;
    if (daysSinceGac && daysSinceGac < 5000) {
        // Opacity can drop down to 25% before turning white.
        fillOpacity = (30 - daysSinceGac) / 30;
        if (fillOpacity < .25) fillOpacity = .25;
        // Leave some transparency to show icon underlays.
        // if (fillOpacity > .80) fillOpacity = .80;
    }

    if (!fillOpacity) {
        return "rgba(255,255,255, 1)";
    } else {
        return "rgba(126, 183, 129," + fillOpacity + ")";
    }
  }

  private selectLocation(d: Location) {
    // Disable greening for my own home.
    if (this.myLocation == d.properties.id) {
        // $("#selected #green").css("visibility", "hidden");
    } else {
        // $("#selected #green").css("visibility", "visible");
    }

    // Close in case it's open.
    // $("#invite").hide();

    // This is the data object. Don't confuse it with
    // this.lastLocation, which is the previously selected data object.
    this.currentLocation = d;

    if (this.lastLocation) {
        this.lastLocation.fill = this.lastFill;
    }

    // this.lastLocation = that;
    // this.lastFill = this.lastLocation.fill;
    // that.setAttribute("fill", "rgba(52, 144, 220, .80)");

    // Status.
    // let is_member = !!members.get(d.properties.id);
    // let is_friend = !!friends.get(d.properties.id);
    // let status = is_friend ? 'friend' : is_member ? 'member' : 'none';
    // $("#selected #icon").attr('data-status', status);

    // Last name.
    // let last = friends.get(d.properties.id)
        // ? friends.get(d.properties.id).last : (my_home == d.properties.id
            // ? members.get(my_home).last : '');
    // $("#selected #household_name").html(last);

    // Address
    // $("#selected #address").html(d.properties.address1);

    // Note.
    // let note = notes.get(d.properties.id) ? notes.get(d.properties.id).note: '';
    // $("#selected #note").val(note);

    // $("#selected").show();
    // $("#welcome").hide();
  }

  private handleWindowResize() {
    const windowResize$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = windowResize$.pipe(
      throttleTime(500)
    ).subscribe(() => {
      this.initializeMap();
      this.renderMap();
    });
  }

  /**
   * Return nav heigh based on screen size.
   *
   * @returns number - Nav height.
   */
  private navHeight(): number {
    return window.innerWidth > 600 ? 64 : 56;
  }

  private setMapSizeAndPosition(): void {
    // Margin is used for the #svg_map inside the #map div.
    // For now, just apply one to all sides.
    this.margin = 20;

    // Map dimensions and placement.
    this.width = window.innerWidth - (this.margin * 2);
    // Subtract top and bottom nav heights from map height.
    this.height = window.innerHeight - (this.navHeight() * 2);
    this.top = this.margin + this.navHeight();
    this.left = this.margin;

    d3.select("#map")
      .style("width", this.width + "px")
      .style("height", this.height + "px")
      .style("top", this.top + "px")
      .style("left", this.left + "px");
  }

}
