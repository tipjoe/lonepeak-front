// Represents an address location in the neighborhood.
// Only id and address1 are required (for registration). Other properties
// are needed if we visualize the neighborhood with maps.
export interface Location {
  id: number;
  address1: string;
  address2?: string;
  city?: string;
  created_at?: string;
  days_since_gac?: number|null;
  fill?: string;
  geometry?: any;
  latitude?: string;
  longitude?: string;
  parcel?: string;
  properties?: any;
  note?: string;
  state?: string;
  updated_at?: string;
  zip?: string;
}
