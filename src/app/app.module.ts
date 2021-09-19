/**
 * TODO:
 *  ngx-quill - editor and photo uploads
 *  ngx-emoji-mart - react to content
 */


import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialImportModule } from './imports/material';

import { ServiceWorkerModule } from '@angular/service-worker';
import { NavComponent } from './components/layout/nav/nav.component';
import { HomeComponent } from './components/pages/home/home.component';
import { MapComponent } from './components/pages/map/map.component';
import { TaskComponent } from './components/pages/task/task.component';
import { EventComponent } from './components/pages/event/event.component';
import { GroupComponent } from './components/pages/group/group.component';
import { MeComponent } from './components/pages/me/me.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    MapComponent,
    TaskComponent,
    EventComponent,
    GroupComponent,
    MeComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,

    // Material Design Components
    MaterialImportModule,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })

  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
