// import { Directive, Input, Host, Self, AfterViewInit, OnDestroy } from '@angular/core';
// // import { untilDestroyed } from 'ngx-take-until-destroy';
// import {MatAutocompleteTrigger, MatAutocomplete} from '@angular/material/autocomplete';
// import {NgControl} from '@angular/forms';

// @Directive({
//   selector: '[appAutocompleteForceSelection]'
// })
// export class AutocompleteForceSelectionDirective implements AfterViewInit, OnDestroy {
//   @Input()
//   matAutocomplete: MatAutocomplete;

//   constructor(
//     @Host()
//     @Self()
//     private readonly autoCompleteTrigger: MatAutocompleteTrigger,
//     private readonly ngControl: NgControl
//   ) {}

//   ngAfterViewInit() {
//     this.autoCompleteTrigger.panelClosingActions.pipe(
//       untilDestroyed(this)
//     ).subscribe((e) => {
//       if (!e || !e.source) {
//         const selected = this.matAutocomplete.options
//             .map(option => option.value)
//             .find(option => option === this.ngControl.value);

//         if (selected == null) {
//           this.ngControl.reset();
//         }
//       }
//     });
//   }

//   ngOnDestroy() { }
// }
