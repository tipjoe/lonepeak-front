import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LocationStreet as Address } from 'src/app/interfaces/location-street';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {

  // State of registration page. Determines display.
  // 0 - entry
  // 1 - join stepper
  // 2 - learn more side nav
  currentState: number = 0

  // Name and address.
  step1FormGroup: FormGroup

  // address:FormControl = new FormControl();

  // These come from our location service.
  // For now, hard-coded.
  addressOptions: Address[] = [
    { id: 1, value: '123 address 1' },
    { id: 2, value: '242 address 2' },
    { id: 3, value: '999 address 3' },
    { id: 4, value: '799 address 4' },
    { id: 5, value: '663 address 5' },
  ]
  filteredAddressOptions$: Observable<Address[]>

  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.step1FormGroup = this._formBuilder.group({
      first: ['', Validators.required],
      last: ['', Validators.required],
      address: ['', Validators.required],
    })

    this.filteredAddressOptions$ = this.step1FormGroup.controls['address'].valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value: value.value)),
      map(name => (name ? this._filterAddress(name) : this.addressOptions.slice())),
    );
  }

  // Toggle the join registration form.
  join() {
    this.currentState = this.currentState !== 1 ? 1 : 0
  }

  // Toggle learn more side nav.
  learnMore() {
    this.currentState = this.currentState !== 2 ? 2 : 0
  }

  // Filter the address for autocomplete.
  private _filterAddress(address:string): Address[] {
    const filterValue = address.toLowerCase();
    return this.addressOptions.filter(option => option.value.toLowerCase().includes(filterValue));
  }
}
