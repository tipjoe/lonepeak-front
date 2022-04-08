import { Directive, Input, Host, Self, AfterViewInit, OnDestroy } from '@angular/core';
import {NgControl} from '@angular/forms';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

/**
 * This directive extends mat-autocomplete to force the user to use a provided
 * value (rather than free-typing anything) to be valid.
 *
 * Our first case was requiring a registering user to select their address
 * from our neighborhood list.
 */

@Directive({
  selector: '[appAutocompleteForceSelection]'
})

@UntilDestroy()
export class AutocompleteForceSelectionDirective implements AfterViewInit, OnDestroy {
  @Input() matAutocomplete: MatAutocomplete;

  constructor(
    @Host()
    @Self()
    private readonly autoCompleteTrigger: MatAutocompleteTrigger,
    private readonly ngControl: NgControl
  ) {}

  ngAfterViewInit() {
    this.autoCompleteTrigger.panelClosingActions.pipe(
      untilDestroyed(this)
    ).subscribe((e) => {
      if (!e || !e.source) {
        // Compares autocomplete selection (this.ngControl.value) with
        // available autocomplete option values.
        const selected = this.matAutocomplete.options
          .map(option => option.value)
          .find(option => option === this.ngControl.value);

        // If no match is found, reset the control (empties out value).
        if (selected == null) {
          this.ngControl.reset('');
        }
      }
    });
  }

  ngOnDestroy(): void {}
}
