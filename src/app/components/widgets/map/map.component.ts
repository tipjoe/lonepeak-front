import { LocationState } from './../../../store/map/location/location.state';
import { User } from './../../../interfaces/user';
import { Select, Store } from '@ngxs/store';
import { Road } from './../../../interfaces/map/road';
import { Location } from './../../../interfaces/map/location';
import { Component, ElementRef, OnInit } from '@angular/core';
import { LocationActions as LA } from 'src/app/store/map/location/location.action';
import { RoadActions as RA } from './../../../store/map/road/road.action';
import { merge, Observable, scheduled } from 'rxjs';
import * as d3 from 'd3';
import * as SvgPanZoom from 'svg-pan-zoom';
import { RoadState } from 'src/app/store/map/road/road.state';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {

  // Commented properties from legacy. Delete if not used.
  // private gacs: array = [];
  // private initializeMap;
  private myGeo: any;
  // private update;

  // Give-a-craps (may include in the Location)
  myGacs: any;
  selectedGacs: any = 'gacs'


  // Location info
  locations: Location[] = [];
  myLocation: Location;
  currentLocation: Location;
  lastLocation: Location;

  lastFill: string;

  // Road info
  roads: Road[] = [];


  // SVG groups on map. Arrays of geocoded data.
  gLocations: any;
  gRoads: any;

  // Users
  // private members: User[] = [];

  // Declare properties.
  count: number;
  exclusions: any;

  // Map settings.
  // TODO remove unneeded elements.

  // SVG canvas for d3 map.
  svg: any;
  // Div and dimensions for map.

  width: number;
  height: number;

  // Div and dimensions for map container.
  mapContainerHeight: number;

  // GeoObject with metadata about scale and display algorthm.
  projection: any;

  // Converts feature paths to screen coordinates based on projection.
  path: any;
  // Pan controller.
  pan: SvgPanZoom.Instance;
  // pan: any;


  // gFriends: any;
  // gGacs: any;
  // gBuildings: any;
  // gMembers: User[];
  // gMyGacs: any;



  constructor(
    public map: ElementRef,
    private store: Store,
  ) {}

  ngOnInit(): void {
    // Load a map
    // TODO - implement group id param on back end and pass it to these actions.
    // Will be the top level group for the neighborhood.

    // Get all needed map data.
    merge(this.store.dispatch([new LA.GetIndex(), new RA.GetIndex()]))
      .subscribe(() => {
        this.locations = this.store.selectSnapshot(LocationState.entities<Location>());
        this.roads = this.store.selectSnapshot(RoadState.entities<Road>());
        // console.log(this.locations, this.roads);

        // Initialize the map.
        this.initializeMap();
        this.renderMap();

        // On resize or phone orientation change.
        // TODO - angularize this with @HostListener - https://angular.io/api/core/HostListener
        // window.addEventListener("resize", setTimeout(() => {
        //   this.initializeMap();
        //   this.updateMap();
        // }, 1000);

    });


  }

  setCurrentLocation(id: number) {
    this.store.dispatch(new LA.Get(id));
  }


  initializeMap() {
    // this.width = window.innerWidth;

    // 1. Margins, width, and height of map.
    const margin = { top: 10, right: 10, bottom: 10, left: 10};
    // Dimensions of map, including what's not shown in the viewbox.
    this.width = 2000;
    this.height = 2000;

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
        // .rotate([111.875944, 0])
        .rotate([40.560151, 0])
        // This is the lat of the user to center the map on their home.
        // .center([0, this.myGeo[0]])
        .translate([this.width / 2, this.height / 2]);

    // Converts feature paths to screen coordinates based on the projection.
    this.path = d3.geoPath()
        .projection(this.projection);

    this.svg = d3.select("#map")
        .append("svg")
        // Limit viewBox to 800x800.
        // TODO - make this dynamic based on screen size and orientation.
        .attr('viewBox', '0 0 800 800')
        .attr('preserveAspectRatio', 'xMidYMid')
        .attr("width", this.width)
        .attr("height", this.height);

    this.gLocations = this.svg.append("g");
    this.gRoads = this.svg.append("g");

    this.exclusions = [99, 395];
    this.count = 0;

    // Enables interactive map navigation (pan, zoom).
    // this.pan = SvgPanZoom('#svg_map', {
    //     zoomEnabled: true,
    //     controlIconsEnabled: false,
    //     fit: false,
    //     center: false,
    //     minZoom: .2
    // });

  }

  renderMap() {
    this.gLocations.selectAll("path")
      .data(this.locations)
      .enter()
      .append('path')
      .attr('d', this.path)
      .style('fill', function(d: any) {
        if (d) {
          return 'green';
        } else {
          return 'red';
        }
          // return this.getFillColor(d, this.myLocation, this.exclusions);
      })
      // .attr("id", d => {
      //     return d.properties.id;
      // })
      // .on('click', d => {
      //     this.selectLocation(d);
      // })
      // .on('touchstart', d => {
      //     this.selectLocation(d);
      // })
      // .attr("stroke", "#333")
      // .attr("class", "parcels")
      // .attr("d", this.geopath
      // .append("title").text(d => {
      //     return d.properties.address1;
      // });

    // g_buildings.selectAll("path")
    //     .data(buildings.features)
    //     .enter()
    //     .append("path")
    //     .attr("fill", "rgba(231, 231, 231, .5)")
    //     // .attr("fill", "lightgray")
    //     .attr("class", "buildings hidden")
    //     .attr("d", geopath);

    // this.gRoads.selectAll("path")
    //     .data(that.roads)
    //     .enter()
    //     .append("path")
    //     .attr("id", (d, i) => {
    //         return "road" + i;
    //     })
    //     .attr("stroke", "rgba(0,0,0,0)")
    //     .attr("fill", "rgba(0,0,0,0)")
    //     .attr("d", that.geopath);

    // Different for park label.
    // d3.select("#road0").attr("stroke", "none");

    // this.gRoads.selectAll("text")
    //     .data(this.roads)
    //     .enter()
    //     .append("text")
    //     .attr("dx", "25")
    //     .attr("dy", "6")
    //     .append("textPath")
    //     .attr("font-size", "16px")
    //     .attr("stroke", "none")
    //     .attr("fill", "black")
    //     .attr("href", (d, i) => {
    //         return "#road" + i;
    //     })
    //     .text((d, i) => {
    //         return d.properties.name;
    //     });

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
  private getFillColor(feature: any, myLocation: Location, exclusions:any): string {
    // Make exclusions gray.
    if (exclusions.indexOf(parseInt(feature.properties.id)) > -1) {
        return "lightgray";
    }

    // Selected neighbor.
    if (this.currentLocation) {
        if (this.currentLocation.properties.id == feature.properties.id) {
            return "rgba(52, 144, 220, .5)";
        }
    }

    // Make my home yellow.
    if (myLocation == feature.properties.id) {
        return "rgba(255,237,74, .50)";
    }

    // All other homes are colored based on days since someone gad (gave a damn).
    const daysSinceGac = 500; // gacs.get(feature.properties.id) ? gacs.get(feature.properties.id).gac : 500;
    const theGacs = eval(this.selectedGacs);
    let fillOpacity = 0;
    if (daysSinceGac < 30) {
        // Opacity can drop down to 25% before turning white.
        fillOpacity = (30 - daysSinceGac) / 30;
        if (fillOpacity < .25) fillOpacity = .25;
        // Leave some transparency to show icon underlays.
        if (fillOpacity > .80) fillOpacity = .80;
    }

    if (!fillOpacity) {
        return "rgba(255,255,255, .1)";
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

}
