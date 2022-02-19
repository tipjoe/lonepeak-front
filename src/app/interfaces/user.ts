import { Location } from 'src/app/interfaces/map/location';
export interface User {
  id: number;
  first: string;
  middle: string;
  last: string;
  email?: string;
  phone?: string;
  referral_id?: string;
  location: Location;
  connections?: User[];
}
