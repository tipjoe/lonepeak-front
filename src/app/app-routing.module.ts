import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MeComponent } from './components/pages/me/me.component';
import { GroupComponent } from './components/pages/group/group.component';
import { EventComponent } from './components/pages/event/event.component';
import { TaskComponent } from './components/pages/task/task.component';
import { MapComponent } from './components/pages/map/map.component';
import { HomeComponent } from './components/pages/home/home.component';

const routes: Routes = [
  // Example:
  // { path: 'first-component', component: FirstComponent },
  // { path: 'second-component', component: SecondComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'map', component: MapComponent },
  { path: 'tasks', component: TaskComponent },
  { path: 'events', component: EventComponent },
  { path: 'groups', component: GroupComponent },
  { path: 'me', component: MeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
