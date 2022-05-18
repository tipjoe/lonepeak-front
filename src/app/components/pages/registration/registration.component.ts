import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Location } from 'src/app/interfaces/map/location';
import { LocationState } from 'src/app/store/location/location.state';
import { LocationActions as LA } from 'src/app/store/location/location.action';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass'],
})
export class RegistrationComponent implements OnInit {
  // State of registration page. Determines display.
  // 0 - entry
  // 1 - join stepper
  // 2 - learn more side nav
  currentState: number = 0;
  mobileCompState: number;

  // Name and address.
  step1FormGroup: FormGroup;
  step2FormGroup: FormGroup;

  // Addresses in address field. User must live in neighborhood to join.
  addressOptions: Location[];
  filteredAddressOptions$: Observable<Location[]>;

  constructor(
    private _formBuilder: FormBuilder,
    private store: Store,
    ) {}

  ngOnInit(): void {
    this.step1FormGroup = this._formBuilder.group({
        first: ['', Validators.required],
        last: ['', Validators.required],
        address: ['', Validators.required],
      },
    );

    // Get addresses.
    this.store.dispatch(new LA.GetIndexAddresses())
      .subscribe(() => {
        // Options from api.
        this.addressOptions = this.store.selectSnapshot(LocationState.entities<Location>())
        // Add them to the address autocomplete/select input.
        this.filteredAddressOptions$ = this.step1FormGroup.controls['address']
          .valueChanges.pipe(
            startWith(''),
            map((address1) => (typeof address1 === 'string' ? address1: address1.value)),
            map((name) =>
              name ? this._filterAddress(name) : this.addressOptions.slice()
          )
        );
      });
  }

  // Toggle the join registration form.
  join() {
    this.currentState = this.currentState !== 1 ? 1 : 0;
  }

  // Toggle learn more side nav.
  learnMore() {
    this.currentState = this.currentState !== 2 ? 2 : 0;
  }

  // Handler for capturing and updating the Mobile Verification Component
  mobileCompStateHandler(value: number) {
    this.mobileCompState = value;
  }

  // Filter the address for autocomplete.
  private _filterAddress(address: string): Location[] {
    const filterValue = address.toLowerCase();
    return this.addressOptions.filter((option) =>
      option.address1.toLowerCase().includes(filterValue)
    );
  }
}
