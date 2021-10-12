// import { Unit } from './unit';
// import { Parcel } from './parcel';

// Represents a parcel or a unit in a multi-tenant parcel (e.g. apartment).
export interface Location {
  // location: Parcel | Unit;
  address1: string;
  address2: string;
  city: string;
  created_at: string;
  geometry: any;
  id: number;
  latitude: string;
  longitude: string;
  parcel: string;
  state: string;
  updated_at: string;
  zip: string
}
