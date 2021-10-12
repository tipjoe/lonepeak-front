// Represents a location on a map (e.g. home, property, etc.).
export interface Parcel {
  address1: string;
  address2: string;
  city: string;
  created_at: number;
  geometry: object;
  id: number;
  latitude: string;
  longitude: string;
  parcel: string;
  state: string;
  updated_at: number;
  zip: string
}
