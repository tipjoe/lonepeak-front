import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  beforeEach(async () => {
    // See app.module.ts. The TestBed is just loading the subset of
    // dependencies (imports/modules, declarations/components,
    // providers/services) needed for the code to function in the test.
    // Tests don't always need to be this heavy (using TestBed). Since this is
    // the root component, we want it.
    await TestBed.configureTestingModule({
      // Modules are imported.
      imports: [
        RouterTestingModule
      ],
      // Components are declared.
      declarations: [
        AppComponent
      ],
      // Services are provided.
      // If we want to mock a service for purposes of the test, we can use the
      // alternate syntax of:
      // providers [ { provide: SomeServices, useClass: SomeFakeService }]
      // This overrids the real service. Otherwise we can just use:
      // providers [ SomeService, SomeOtherService ]
      // We can do both in tests.
      providers: [
      ]
    }).compileComponents();

  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
