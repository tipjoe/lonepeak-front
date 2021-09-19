// FYI - tsconfig.json (one level above src) defines a baseUrl property.
// Import paths can be given relative to this to avoid confusing ../../...

import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})

export class NavComponent implements OnInit {

  public isPhone: boolean = true;
  public showFiller: boolean = true;


  constructor(bpo: BreakpointObserver) {

    // Responsively determine long or short group name.
    bpo
      .observe(['(min-width: 600px'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isPhone= false;
        } else {
          this.isPhone = true;
        }
      });
  }

  testConsole(val: any) {
    console.log(val);
  }

  ngOnInit(): void {
  }

}
